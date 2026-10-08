import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useProduct } from "../hooks/useProduct"
import { useProducts } from "../hooks/useProducts"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { useCompareStore } from "@/features/compare/store/compare.store"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Heart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowLeftRight,
  Search,
  Headset,
} from "lucide-react"
import { slugify } from "@/lib/utils"
import type { Product } from "../types/product.types"
import { mockProducts } from "../services/product.service"
import {
  getProductPrimaryImage,
  getProductThumbnails,
  getCarouselProductImage,
} from "../utils/productImages"
import RequestProductModal from "../components/RequestProductModal"

// Brand badge theme registry (declarative lookup table, avoiding repetitive if/else statements)
const BRAND_BADGE_THEMES: Record<string, { label?: string; className: string }> = {
  "3m": { label: "3M", className: "font-black text-[#D32F2F] tracking-tighter bg-red-50 border-red-200" },
  "ieee": { label: "IEEE", className: "font-black italic text-[#00629B] bg-white border-[#38bdf8]" },
  "iee": { label: "IEEE", className: "font-black italic text-[#00629B] bg-white border-[#38bdf8]" },
  "impinj": { label: "IMPINJ", className: "font-bold text-[#E84E1B] bg-orange-50 border-orange-200" },
  "honeywell": { label: "Honeywell", className: "font-black text-[#DE1F27] tracking-tight bg-red-50 border-red-200" },
  "weller": { label: "Weller", className: "font-bold text-[#00897B] bg-teal-50 border-teal-200" },
  "quick": { label: "QUICK", className: "font-bold text-[#1565C0] bg-gray-50 border-gray-200" },
  "fluke": { label: "FLUKE", className: "font-black text-black bg-[#FFD100] border-[#FFD100]" },
}

function BrandBadge({ name }: { name: string }) {
  const brandKey = Object.keys(BRAND_BADGE_THEMES).find((key) =>
    (name || "").toLowerCase().includes(key)
  )
  const theme = brandKey ? BRAND_BADGE_THEMES[brandKey] : null
  const displayLabel = theme?.label || name || "Generic"
  const badgeStyle = theme?.className || "font-bold text-gray-700 bg-gray-100 border-gray-200"

  return (
    <span className={`text-[11px] px-2 py-0.5 rounded border inline-block ${badgeStyle}`}>
      {displayLabel}
    </span>
  )
}

// Carousel product card matching PDF styling
function CarouselProductCard({
  image,
  title,
  sku,
  brand,
  stockStatus = "in_stock"
}: {
  image: string
  title: string
  sku: string
  brand: string
  stockStatus?: "in_stock" | "out_of_stock" | "on_backorder" | string | null
}) {
  const isOutOfStock = stockStatus === "out_of_stock"

  return (
    <Link
      to={`/products/${sku}`}
      className="group bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg p-3.5 sm:p-4 flex flex-col justify-between hover:shadow-md hover:border-[#b91c1c]/30 transition-all duration-200 text-left"
    >
      <div>
        {/* Soft rounded image backdrop matching PDF */}
        <div className="aspect-square w-full rounded-md bg-transparent flex items-center justify-center p-2 mb-2 group-hover:scale-102 transition-transform duration-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className={`max-h-[110px] sm:max-h-[125px] w-auto object-contain ${isOutOfStock ? "grayscale contrast-95 opacity-80" : ""
              }`}
            onError={(e) => {
              ; (e.target as HTMLImageElement).src =
                "/images/cat_cables_1785994179162.png"
            }}
          />
        </div>

        {/* Product Title */}
        <h4 className="font-heading font-bold text-[12.5px] sm:text-[13px] text-[#111111] leading-snug group-hover:text-[#b91c1c] transition-colors line-clamp-2 min-h-[32px] sm:min-h-[36px]">
          {title}
        </h4>

        {/* 5 Stars Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-[#f59e0b]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="#f59e0b" stroke="none" />
            ))}
          </div>
          <span className="text-[11px] font-bold text-gray-500">(5)</span>
        </div>
      </div>

      {/* Brand & Stock Status Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#eef0f4] text-[11px]">
        <div className="flex items-center gap-1">
          <span className="text-gray-500 font-semibold">Brand:</span>
          <BrandBadge name={brand} />
        </div>
        {isOutOfStock ? (
          <span className="font-bold text-[#b91c1c]">Out of Stock</span>
        ) : (
          <span className="font-bold text-[#16a34a]">In Stock</span>
        )}
      </div>
    </Link>
  )
}

// Dynamic gallery tailored for each product using unified productImages utility
function getProductGallery(product?: Product | null) {
  const primary = getProductPrimaryImage(product)
  const thumbnails = getProductThumbnails(product)
  return {
    primary,
    thumbnails,
  }
}

// Generate structured 3 specification pills for any product
function getProductSpecPills(product: Product) {
  const pills: { label: string; value: string }[] = []

  const parseAndAdd = (spec?: string | null, fallbackLabel = "") => {
    if (!spec) return
    const colonIdx = spec.indexOf(":")
    let label = ""
    let value = ""
    if (colonIdx > 0) {
      label = spec.slice(0, colonIdx).trim()
      value = spec.slice(colonIdx + 1).trim()
    } else if (fallbackLabel) {
      label = fallbackLabel
      value = spec.trim()
    } else {
      value = spec.trim()
    }

    if (!value) return

    // Never display "Issued By" or duplicate brand values since Brand is already prominently shown
    if (label.toLowerCase().includes("issued by") || label.toLowerCase() === "brand") return
    if (product.brand && value.toLowerCase() === product.brand.toLowerCase()) return

    // Prevent duplicate values or duplicate labels
    const alreadyExists = pills.some(
      (p) =>
        p.value.toLowerCase() === value.toLowerCase() ||
        (p.label && label && p.label.toLowerCase() === label.toLowerCase())
    )
    if (!alreadyExists) {
      pills.push({ label, value })
    }
  }

  // 1st Pill: Key Spec 1 (e.g. Block Size: 4096 addresses, or Frequency: UHF 865-867MHz)
  parseAndAdd(product.key_spec_1, "Specification")

  // 2nd Pill: Key Spec 2 (e.g. Application: Network device ID, or Interface: PoE Ethernet)
  parseAndAdd(product.key_spec_2, "Application")

  // 3rd Pill: Key Spec 3
  if (product.key_spec_3) {
    parseAndAdd(product.key_spec_3, "Standard")
  }

  return pills
}

// 5 Customer reviews exactly matching user request and PDF
const customerReviews = [
  {
    name: "Jackson",
    rating: 5,
    comment: "The product for very good,and I recieved it on time",
    avatar: "/images/avatar_jackson.png"
  },
  {
    name: "Angelina",
    rating: 5,
    comment: "The product for very good,and I recieved it on time",
    avatar: "/images/avatar_angelina.png"
  },
  {
    name: "Charlotte",
    rating: 2,
    comment: "The product was broken",
    avatar: "/images/avatar_charlotte.png"
  },
  {
    name: "Henry",
    rating: 4,
    comment: "The product for very good,and I recieved it on time",
    avatar: "/images/avatar_henry.png"
  },
  {
    name: "Sophia",
    rating: 5,
    comment: "The product for very good,and I recieved it on time",
    avatar: "/images/avatar_sophia.png"
  }
]

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useProduct(slug || "")
  const { data: productsData } = useProducts({ limit: 100 })

  // Synchronize Lenis dimensions immediately whenever product data finishes loading
  useEffect(() => {
    if (window.__lenis?.dimensions) {
      window.__lenis.dimensions.resize();
    }
  }, [isLoading, product]);

  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const isWishlisted = useWishlistStore((state) => state.hasItem(product?.sku || ""))
  const toggleCompare = useCompareStore((state) => state.toggleItem)
  const isCompared = useCompareStore((state) => state.hasItem(product?.sku || ""))
  const compareCount = useCompareStore((state) => state.items.length)
  const [showCompareToast, setShowCompareToast] = useState(false)
  const [isRequestProductOpen, setIsRequestProductOpen] = useState(false)

  const [qty, setQty] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [relatedPage, setRelatedPage] = useState(1)
  const [viewedPage, setViewedPage] = useState(1)
  const [reviewPage, setReviewPage] = useState(1)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Robu.in high-performance zoom lens refs (no re-render lag)
  const zoomContainerRef = useRef<HTMLDivElement>(null)
  const zoomImageRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = zoomContainerRef.current
    const image = zoomImageRef.current
    if (!container || !image) return
    const { left, top, width, height } = container.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((e.clientX - left) / width) * 100))
    const y = Math.min(100, Math.max(0, ((e.clientY - top) / height) * 100))
    image.style.transformOrigin = `${x}% ${y}%`
    image.style.transform = "scale(2.2)"
  }

  const handleMouseLeave = () => {
    const image = zoomImageRef.current
    if (!image) return
    image.style.transformOrigin = "center center"
    image.style.transform = "scale(1)"
  }

  const resetZoom = () => {
    const image = zoomImageRef.current
    if (!image) return
    image.style.transformOrigin = "center center"
    image.style.transform = "scale(1)"
  }

  // Reset selected thumbnail and scroll to top whenever product slug changes
  useEffect(() => {
    setSelectedImageIndex(0)
    setQty(1)
    resetZoom()
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
  }, [slug])

  const handleAddToQuote = () => {
    if (!product) return
    addItem({
      id: product.sku,
      name: product.product_name,
      category: product.category_name || "Industrial Solutions",
      qty: qty,
      code: product.catalog_number || product.sku,
    })
    openDrawer()
  }

  const handleToggleWishlist = () => {
    if (!product) return
    toggleWishlist({
      id: product.sku,
      name: product.product_name,
      category: product.category_name || "Industrial Solutions",
      code: product.catalog_number || product.sku,
    })
  }

  const handleToggleCompare = () => {
    if (!product) return
    const willBeAdded = !isCompared
    toggleCompare({
      id: product.sku,
      sku: product.sku,
      name: product.product_name,
      category: product.category_name || "Industrial Solutions",
      code: product.catalog_number || product.sku,
      brand: product.brand || "Generic",
      image: getProductPrimaryImage(product),
      key_spec_1: product.key_spec_1,
      key_spec_2: product.key_spec_2,
      key_spec_3: product.key_spec_3,
      stock_status: product.stock_status,
      short_description: product.short_description,
    })
    if (willBeAdded) {
      setShowCompareToast(true)
      setTimeout(() => setShowCompareToast(false), 4000)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8 text-left bg-white min-h-screen">
        <Skeleton className="h-5 w-1/3" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-3xl w-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center bg-white min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">Failed to load product.</h2>
        <p className="text-[#777777] mt-2">The product SKU might be invalid or the database is offline.</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-[#b91c1c] text-white px-6 py-2.5 rounded-sm text-[13.6px] font-bold"
        >
          Return to Catalog
        </Link>
      </div>
    )
  }

  // Dynamic gallery tailored for this product
  const gallery = getProductGallery(product)
  const galleryThumbnails = gallery.thumbnails
  const activeImage =
    selectedImageIndex === 0
      ? gallery.primary
      : galleryThumbnails[selectedImageIndex] || gallery.primary

  // Dynamic specification pills for this product
  const specPills = getProductSpecPills(product)

  // Full product catalog for carousels
  const rawCatalog = [
    ...(productsData?.data || []),
    ...mockProducts,
  ]

  // Filter out currently viewed product and deduplicate by SKU
  const seenSkus = new Set<string>()
  if (product?.sku) seenSkus.add(product.sku)

  const distinctCatalog: Product[] = []
  for (const p of rawCatalog) {
    if (p.sku && !seenSkus.has(p.sku)) {
      seenSkus.add(p.sku)
      distinctCatalog.push(p)
    }
  }

  // Interleave products by category so adjacent cards are always from different categories
  const byCategory: Record<string, Product[]> = {}
  for (const p of distinctCatalog) {
    const cat = p.category_name || "General"
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(p)
  }

  const categoryKeys = Object.keys(byCategory)
  const diverseCatalog: Product[] = []
  let maxProds = 0
  for (const k of categoryKeys) {
    if (byCategory[k].length > maxProds) maxProds = byCategory[k].length
  }

  for (let i = 0; i < maxProds; i++) {
    for (const k of categoryKeys) {
      if (byCategory[k][i]) {
        diverseCatalog.push(byCategory[k][i])
      }
    }
  }

  const catalog = diverseCatalog.length > 0 ? diverseCatalog : distinctCatalog

  // Responsive carousel: 2 items on mobile (< 640px), 5 on desktop
  const carouselPageSize = isMobile ? 2 : 5

  // Carousel Row 1 items (Related products) with pagination support
  const relatedPool = catalog
  const relatedPageSize = carouselPageSize
  const totalRelatedPages = Math.max(1, Math.ceil(relatedPool.length / relatedPageSize))
  const safeRelatedPage = ((relatedPage - 1) % totalRelatedPages) + 1
  const relatedStartIndex = (safeRelatedPage - 1) * relatedPageSize
  const relatedItems = relatedPool.slice(relatedStartIndex, relatedStartIndex + relatedPageSize)

  // Carousel Row 2 items (Customers also viewed) offset by 5 to guarantee different products
  const viewedPool = [...catalog.slice(5), ...catalog.slice(0, 5)]
  const viewedPageSize = carouselPageSize
  const totalViewedPages = Math.max(1, Math.ceil(viewedPool.length / viewedPageSize))
  const safeViewedPage = ((viewedPage - 1) % totalViewedPages) + 1
  const viewedStartIndex = (safeViewedPage - 1) * viewedPageSize
  const viewedItems = viewedPool.slice(viewedStartIndex, viewedStartIndex + viewedPageSize)

  return (
    <div className="bg-white min-h-screen py-2.5 sm:py-3.5 text-left overflow-x-clip">
      {/* Container constrained to exact width matching PDF without empty gaps */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs: Home > Products > Category > Product */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12.5px] text-gray-700 mb-2.5 sm:mb-3.5 font-medium flex-wrap">
          <Link to="/" className="hover:text-[#b91c1c] transition-colors shrink-0">Home</Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <Link to="/products" className="hover:text-[#b91c1c] transition-colors shrink-0">Products</Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <Link
            to={`/products?category=${slugify(product.category_name || "Industrial Solutions")}`}
            className="hover:text-[#b91c1c] transition-colors truncate max-w-[160px] sm:max-w-[220px]"
          >
            {product.category_name || "Industrial Solutions"}
          </Link>
          <span className="text-gray-400 font-normal">&gt;</span>
          <span className="font-extrabold text-gray-900 truncate max-w-[180px] sm:max-w-[280px]">
            {product.product_name}
          </span>
        </nav>

        {/* Main Product Showcase Section matching Robu.in Model */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pb-8 sm:pb-10">

          {/* Left Column: Clean White Showcase Card with Main Image + Centered Thumbnails */}
          <div className="col-span-1 lg:col-span-6 w-full bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between items-center shadow-xs">
            {/* Main Product Image with Interactive Opposite-Direction Zoom Lens */}
            <div
              ref={zoomContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full flex-1 flex items-center justify-center py-4 min-h-[240px] sm:min-h-[290px] md:min-h-[320px] lg:min-h-[350px] xl:min-h-[390px] overflow-hidden cursor-crosshair relative select-none rounded-md"
            >
              <img
                ref={zoomImageRef}
                src={activeImage}
                alt={product.product_name}
                style={{
                  transformOrigin: "center center",
                  transform: "scale(1)",
                  transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className={`max-h-[220px] sm:max-h-[270px] md:max-h-[300px] lg:max-h-[330px] xl:max-h-[370px] max-w-[340px] w-auto object-contain pointer-events-none will-change-transform ${product.stock_status === "out_of_stock" ? "grayscale contrast-95 opacity-85" : ""
                  }`}
                onError={(e) => {
                  ; (e.target as HTMLImageElement).src =
                    gallery.primary || "/images/cat_cables_1785994179162.png"
                }}
              />
            </div>

            {/* Thumbnails centered below the main image matching Image 2 */}
            <div className="flex items-center justify-center gap-3 mt-4 w-full">
              {galleryThumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx)
                    resetZoom()
                  }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white border p-1.5 flex items-center justify-center cursor-pointer transition-all shrink-0 ${selectedImageIndex === idx
                      ? "border-2 border-gray-900 shadow-sm"
                      : "border-gray-200 hover:border-gray-400 opacity-90 hover:opacity-100 shadow-2xs"
                    }`}
                  aria-label={`Select product image ${idx + 1}`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Actions matching Image 2 (Robu.in Model) */}
          <div className="col-span-1 lg:col-span-6 w-full flex flex-col justify-start text-left">

            {/* 1. Category Link at top */}
            <Link
              to={`/products?category=${slugify(product.category_name || "Industrial Solutions")}`}
              className="text-xs sm:text-[13px] text-gray-500 hover:text-gray-900 transition-colors mb-1 inline-block font-normal"
            >
              {product.category_name || "Industrial Solutions"}
            </Link>

            {/* 2. Product Title */}
            <h1 className="font-heading text-xl sm:text-2xl lg:text-[27px] font-bold text-[#111315] leading-snug mb-2 tracking-tight">
              {product.product_name}
            </h1>

            {/* 3. Rating Stars + Review count */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" stroke="none" />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-normal">
                (5 customer review)
              </span>
            </div>

            {/* 4. SKU Line in Blue Accent */}
            <div className="text-xs sm:text-[13px] font-bold text-gray-900 mb-2">
              SKU: <span className="text-[#0284c7] font-bold font-mono">{product.catalog_number || product.sku}</span>
            </div>

            {/* 5. Pricing / Commercial Quote Line matching Image 2 */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl sm:text-[26px] font-extrabold text-[#111315]">
                Custom B2B Quotation
              </span>
              <span className="text-xs font-semibold text-gray-500">
                (Incl. GST)
              </span>
            </div>

            {/* 6. Rewards / Procurement Loyalty Line */}
            <p className="text-xs text-gray-600 mb-2 font-normal">
              Purchase this product now and earn <span className="font-bold text-gray-800">64 eFocus Points</span>!
            </p>

            {/* 7. Availability */}
            <div className="text-xs sm:text-[13px] font-medium text-gray-900 mb-2.5">
              Availability:{" "}
              {product.stock_status === "out_of_stock" ? (
                <span className="font-bold text-[#b91c1c]">Out of Stock</span>
              ) : (
                <span className="font-bold text-[#16a34a]">In Stock</span>
              )}
            </div>

            {/* 8. B2B / Bulk Inquiries Note matching Image 2 */}
            <div className="text-xs text-gray-700 space-y-1 mb-3 leading-relaxed">
              <p>
                For bulk orders or B2B inquiries, email us:{" "}
                <a href="mailto:sales@efocus.in" className="text-[#0284c7] font-semibold hover:underline">
                  sales@efocus.in
                </a>
              </p>
              {product.family_name && (
                <p className="text-amber-800 text-[11.5px] font-medium">
                  <span className="font-bold text-amber-900">Note: </span>
                  Looking for the latest model? Check out the all new{" "}
                  <span className="font-semibold text-amber-900 underline">{product.family_name}</span>.
                </p>
              )}
            </div>

            {/* 9. Key Specs Table with Clean Aligned Colons (Robu.in hallmark) */}
            <div className="border-t border-b border-gray-200/90 py-3 my-2 space-y-1.5 text-xs sm:text-[12.5px]">
              <div className="grid grid-cols-[85px_14px_1fr] sm:grid-cols-[100px_14px_1fr] items-center">
                <span className="font-bold text-gray-800">MPN</span>
                <span className="text-gray-500 font-bold">:</span>
                <span className="text-gray-900 font-mono font-medium">{product.catalog_number || "N/A"}</span>
              </div>
              <div className="grid grid-cols-[85px_14px_1fr] sm:grid-cols-[100px_14px_1fr] items-center">
                <span className="font-bold text-gray-800">Brand</span>
                <span className="text-gray-500 font-bold">:</span>
                <div>
                  <BrandBadge name={product.brand || "Generic"} />
                </div>
              </div>
              <div className="grid grid-cols-[85px_14px_1fr] sm:grid-cols-[100px_14px_1fr] items-center">
                <span className="font-bold text-gray-800">Category</span>
                <span className="text-gray-500 font-bold">:</span>
                <span className="text-gray-900 font-medium">{product.category_name || "Industrial Solutions"}</span>
              </div>
              {specPills.map((sp, idx) => (
                <div key={idx} className="grid grid-cols-[85px_14px_1fr] sm:grid-cols-[100px_14px_1fr] items-center">
                  <span className="font-bold text-gray-800">{sp.label || `Spec ${idx + 1}`}</span>
                  <span className="text-gray-500 font-bold">:</span>
                  <span className="text-gray-900 font-medium">{sp.value}</span>
                </div>
              ))}
              {/* <div className="grid grid-cols-[85px_14px_1fr] sm:grid-cols-[100px_14px_1fr] items-center">
                <span className="font-bold text-gray-800">Data Sheet</span>
                <span className="text-gray-500 font-bold">:</span>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-procurement-modal", {
                        detail: { mode: "quote", title: `Request Datasheet: ${product.product_name}` },
                      })
                    )
                  }}
                  className="text-[#0284c7] hover:underline font-semibold flex items-center gap-1.5 cursor-pointer w-fit text-left"
                >
                  <span>Click to Download</span>
                  <svg className="w-3.5 h-3.5 text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div> */}
            </div>

            {/* 10. Action Row: Quantity + Add to Quote + Wishlist + Compare */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap my-3">
              {/* Quantity Box: - 1 + */}
              <div className="flex items-center border border-[#d1d5db] rounded-lg overflow-hidden bg-white shrink-0 h-10">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-full bg-[#f8f9fa] hover:bg-gray-200 text-[#555555] font-bold flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-[13.5px] font-bold text-gray-900 select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-full bg-[#f8f9fa] hover:bg-gray-200 text-[#555555] font-bold flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Primary CTA button */}
              {product.stock_status === "out_of_stock" ? (
                <button
                  disabled
                  className="flex-1 sm:flex-none bg-[#808489] text-white px-5 sm:px-6 h-10 rounded-lg font-bold text-[13px] cursor-not-allowed text-center justify-center whitespace-nowrap"
                >
                  Currently Out of Stock
                </button>
              ) : (
                <button
                  onClick={handleAddToQuote}
                  className="flex-1 sm:flex-none bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 sm:px-6 h-10 rounded-lg font-bold text-[13px] transition-colors cursor-pointer shadow-sm active:scale-98 text-center justify-center whitespace-nowrap"
                >
                  Add to Request Quote Basket
                </button>
              )}

              {/* Wishlist Button: Rounded square matching Image 2 */}
              <button
                onClick={handleToggleWishlist}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${isWishlisted
                    ? "bg-[#FFF1F2] border-[#b91c1c] text-[#b91c1c]"
                    : "bg-white border-[#d1d5db] text-gray-700 hover:border-gray-900 hover:text-black"
                  }`}
                title={isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                aria-label="Wishlist"
              >
                <Heart size={16} fill={isWishlisted ? "#b91c1c" : "none"} />
              </button>

              {/* Compare Button with Opposing Arrows Icon matching Image 2 */}
              <button
                type="button"
                onClick={handleToggleCompare}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                  isCompared
                    ? "bg-[#FFF1F2] border-[#b91c1c] text-[#b91c1c]"
                    : "bg-white border-[#d1d5db] text-gray-700 hover:border-gray-900 hover:text-black"
                }`}
                title={isCompared ? "Remove from Comparison" : "Add to Comparison"}
                aria-label="Compare product"
              >
                <ArrowLeftRight size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Compare Notification Banner */}
            {showCompareToast && (
              <div className="flex items-center justify-between bg-[#111315] text-white text-xs px-3.5 py-2.5 rounded-lg shadow-md animate-in fade-in slide-in-from-top-1 duration-200 mt-2 mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Added to comparison ({compareCount} {compareCount === 1 ? "product" : "products"})
                </span>
                <Link
                  to="/compare"
                  className="font-bold text-red-400 hover:text-red-300 underline ml-3 cursor-pointer shrink-0"
                >
                  View Compare Page →
                </Link>
              </div>
            )}

            {/* 11. 5-Column Horizontal Trust & Support Strip matching Image 2 */}
            <div className="pt-4 mt-2 border-t border-gray-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2 text-center text-xs">
                {/* 1. Have a Bulk Order? */}
                <Link
                  to="/contact"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                    if (window.__lenis) {
                      window.__lenis.scrollTo(0, { immediate: true })
                    }
                    navigate("/contact")
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50/60 hover:bg-red-50/50 hover:border-red-200 border border-transparent transition-all group cursor-pointer text-center select-none"
                  title="Have a Bulk Order? Contact our sales team"
                >
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-[#b91c1c] transition-colors mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span className="font-bold text-gray-900 group-hover:text-[#b91c1c] text-[11px] leading-tight transition-colors">
                    Have a Bulk Order?
                  </span>
                  <span className="text-[#0284c7] group-hover:text-[#b91c1c] font-semibold text-[11px] group-hover:underline mt-0.5 transition-colors">
                    Click Here
                  </span>
                </Link>

                {/* 2. Need Support? */}
                <Link
                  to="/contact"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                    if (window.__lenis) {
                      window.__lenis.scrollTo(0, { immediate: true })
                    }
                    navigate("/contact")
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50/60 hover:bg-red-50/50 hover:border-red-200 border border-transparent transition-all group cursor-pointer text-center select-none"
                  title="Need Support? Contact our technical support team"
                >
                  <Headset className="w-5 h-5 text-gray-700 group-hover:text-[#b91c1c] transition-colors mb-1" strokeWidth={1.9} />
                  <span className="font-bold text-gray-900 group-hover:text-[#b91c1c] text-[11px] leading-tight transition-colors">
                    Need Support ?
                  </span>
                  <span className="text-[#0284c7] group-hover:text-[#b91c1c] font-semibold text-[11px] group-hover:underline mt-0.5 transition-colors">
                    Click Here
                  </span>
                </Link>

                {/* 3. 1 Year Warranty */}
                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50/60 hover:bg-gray-100/80 transition-colors">
                  <svg className="w-5 h-5 text-gray-700 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span className="font-bold text-gray-900 text-[11px] leading-tight">1 Year Warranty</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">OEM Direct</span>
                </div>

                {/* 4. Free Delivery Above ₹999 */}
                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50/60 hover:bg-gray-100/80 transition-colors">
                  <svg className="w-5 h-5 text-gray-700 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span className="font-bold text-gray-900 text-[11px] leading-tight">Free Delivery</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Above ₹999</span>
                </div>

                {/* 5. Cash on Delivery* */}
                <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50/60 hover:bg-gray-100/80 transition-colors">
                  <svg className="w-5 h-5 text-gray-700 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                  <span className="font-bold text-gray-900 text-[11px] leading-tight">Cash on Delivery*</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Or GST Credit</span>
                </div>
              </div>

              {/* 12. Bottom Link: Didn't find what you are looking for? */}
              <div className="mt-3.5 pt-2 text-center sm:text-left">
                <button
                  type="button"
                  onClick={() => setIsRequestProductOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#0284c7] hover:underline underline cursor-pointer"
                >
                  <Search size={14} className="text-[#0284c7] shrink-0" />
                  <span>Didn't find what you are looking for?</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section 1: Related Products Carousel (Displaying Our Real Catalog Products) */}
        <section className="py-8 sm:py-10">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="font-heading text-[18px] sm:text-[21px] font-bold text-[#111111]">
              Related products
            </h3>
            <span className="text-[12px] sm:text-[12.5px] font-medium text-gray-500">
              Page {safeRelatedPage} of {totalRelatedPages}
            </span>
          </div>

          <div className="relative">
            {/* Left Floating Red Button */}
            <button
              onClick={() => setRelatedPage((p) => (p > 1 ? p - 1 : totalRelatedPages))}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Floating Red Button */}
            <button
              onClick={() => setRelatedPage((p) => (p < totalRelatedPages ? p + 1 : 1))}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              {relatedItems.map((item, idx) => (
                <CarouselProductCard
                  key={item.sku}
                  sku={item.sku}
                  title={item.product_name}
                  brand={item.brand || "Generic"}
                  image={getCarouselProductImage(item, (safeRelatedPage - 1) * relatedPageSize + idx)}
                  stockStatus={item.stock_status || "in_stock"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Customers who viewed this item also (Displaying Our Real Catalog Products) */}
        <section className="py-8 sm:py-10">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="font-heading text-[18px] sm:text-[21px] font-bold text-[#111111]">
              Customers who viewed this item also
            </h3>
            <span className="text-[12px] sm:text-[12.5px] font-medium text-gray-500">
              Page {safeViewedPage} of {totalViewedPages}
            </span>
          </div>

          <div className="relative">
            {/* Left Floating Red Button */}
            <button
              onClick={() => setViewedPage((p) => (p > 1 ? p - 1 : totalViewedPages))}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Floating Red Button */}
            <button
              onClick={() => setViewedPage((p) => (p < totalViewedPages ? p + 1 : 1))}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              {viewedItems.map((item, idx) => (
                <CarouselProductCard
                  key={item.sku}
                  sku={item.sku}
                  title={item.product_name}
                  brand={item.brand || "Generic"}
                  image={getCarouselProductImage(item, 5 + (safeViewedPage - 1) * viewedPageSize + idx)}
                  stockStatus={item.stock_status || "in_stock"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Support / Help Section matching PDF clean icons */}
        <section className="py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* 1. Need Support ? -> Navigates to Contact Us page */}
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                if (window.__lenis) {
                  window.__lenis.scrollTo(0, { immediate: true })
                }
                navigate("/contact")
              }}
              className="flex flex-col items-center justify-center gap-3 text-center cursor-pointer group hover:scale-[1.03] transition-all duration-200 p-5 rounded-2xl hover:bg-gray-50/80 active:scale-95"
              title="Need Support? Contact our technical team"
            >
              <img
                src="/images/support_headset.png"
                alt="Need Support"
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
              />
              <h4 className="font-heading font-extrabold text-[17px] sm:text-[18px] text-[#111111] group-hover:text-[#b91c1c] transition-colors">
                Need Support ?
              </h4>
            </Link>

            {/* 2. Didn't find what you are looking for? -> Opens popup form modal */}
            <button
              type="button"
              onClick={() => setIsRequestProductOpen(true)}
              className="flex flex-col items-center justify-center gap-3 text-center cursor-pointer group hover:scale-[1.03] transition-all duration-200 p-5 rounded-2xl hover:bg-gray-50/80 active:scale-95"
              title="Didn't find what you are looking for? Submit a request"
            >
              <img
                src="/images/support_search.png"
                alt="Didn't find what you are looking for"
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
              />
              <h4 className="font-heading font-extrabold text-[17px] sm:text-[18px] text-[#111111] group-hover:text-[#b91c1c] transition-colors">
                Didn’t find what you are looking for?
              </h4>
            </button>
          </div>
        </section>

        {/* Section 4: Exactly 5 Customer Product reviews with 1-review mobile carousel */}
        {(() => {
          const totalReviewPages = isMobile ? customerReviews.length : 1
          const safeReviewPage = ((reviewPage - 1) % totalReviewPages) + 1
          const displayedReviews = isMobile
            ? [customerReviews[safeReviewPage - 1]]
            : customerReviews

          return (
            <section className="py-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-[19px] sm:text-[21px] font-bold text-[#111111]">
                  Customer Product reviews
                </h3>
                <span className="text-[12.5px] font-medium text-gray-500">
                  Page {safeReviewPage} of {totalReviewPages}
                </span>
              </div>

              <div className="relative px-6 sm:px-0">
                {/* Left Floating Red Button */}
                <button
                  onClick={() => setReviewPage((p) => (p > 1 ? p - 1 : totalReviewPages))}
                  className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>

                {/* Right Floating Red Button */}
                <button
                  onClick={() => setReviewPage((p) => (p < totalReviewPages ? p + 1 : 1))}
                  className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>

                {/* Review Cards Grid: 1 on mobile, 5 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {displayedReviews.map((rev, i) => (
                    <div
                      key={i}
                      className="bg-white border border-[#e5e7eb] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow justify-center gap-1"
                    >
                      {/* Circular Avatar */}
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border border-gray-100 shadow-2xs bg-[#f2f4f7] flex items-center justify-center shrink-0">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              "/images/avatar_jackson.png"
                          }}
                        />
                      </div>

                      {/* Reviewer Name */}
                      <h4 className="font-heading font-bold text-[14px] text-gray-900 mb-0.5">
                        {rev.name}
                      </h4>

                      {/* Star Rating with 15px gold stars */}
                      <div className="flex text-[#f59e0b] mb-2 gap-0.5">
                        {[...Array(5)].map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            size={15}
                            fill={starIdx < rev.rating ? "#f59e0b" : "#e5e7eb"}
                            stroke="none"
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-gray-600 text-[12px] sm:text-[12.5px] leading-relaxed line-clamp-3">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })()}

        {/* "Didn't find what you are looking for?" Request Modal */}
        <RequestProductModal
          isOpen={isRequestProductOpen}
          onClose={() => setIsRequestProductOpen(false)}
        />
      </div>
    </div>
  )
}

