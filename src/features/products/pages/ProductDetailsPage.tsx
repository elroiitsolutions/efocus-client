import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useProduct } from "../hooks/useProduct"
import { useProducts } from "../hooks/useProducts"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Heart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react"
import { slugify } from "@/lib/utils"
import type { Product } from "../types/product.types"
import { mockProducts } from "../services/product.service"
import {
  getProductPrimaryImage,
  getProductThumbnails,
  getCarouselProductImage,
} from "../utils/productImages"

// Styled brand badges to replicate real vendor logos
function BrandBadge({ name }: { name: string }) {
  const brandClean = (name || "").toLowerCase()

  if (brandClean.includes("3m")) {
    return (
      <span className="text-[11px] font-black text-[#D32F2F] tracking-tighter bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
        3M
      </span>
    )
  }
  if (brandClean.includes("ieee") || brandClean.includes("iee")) {
    return (
      <span className="text-[10px] font-black italic text-[#00629B] bg-white border border-[#38bdf8] px-1.5 py-0.5 rounded-[4px] tracking-tight leading-none inline-block">
        IEE
      </span>
    )
  }
  if (brandClean.includes("impinj")) {
    return (
      <span className="text-[11px] font-bold text-[#E84E1B] bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded">
        IMPINJ
      </span>
    )
  }
  if (brandClean.includes("honeywell")) {
    return (
      <span className="text-[11px] font-black text-[#DE1F27] tracking-tight bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
        Honeywell
      </span>
    )
  }
  if (brandClean.includes("weller")) {
    return (
      <span className="text-[11px] font-bold text-[#00897B] bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
        Weller
      </span>
    )
  }
  if (brandClean.includes("quick")) {
    return (
      <span className="text-[11px] font-bold text-[#1565C0] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">
        QUICK
      </span>
    )
  }
  if (brandClean.includes("fluke")) {
    return (
      <span className="text-[11px] font-black text-black bg-[#FFD100] px-1.5 py-0.5 rounded">
        FLUKE
      </span>
    )
  }
  return (
    <span className="text-[11px] font-bold text-gray-700 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
      {name}
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
            className={`max-h-[110px] sm:max-h-[125px] w-auto object-contain ${
              isOutOfStock ? "grayscale contrast-95 opacity-80" : ""
            }`}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                "/images/cat_cables_1785994179162.png"
            }}
          />
        </div>

        {/* Product Title */}
        <h4 className="font-heading font-bold text-[12.5px] sm:text-[13px] text-[#111111] leading-snug group-hover:text-[#b91c1c] transition-colors">
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

  // 1st Pill: Key Spec 1 (e.g. Block Size: 4096 addresses)
  parseAndAdd(product.key_spec_1, "Block Size")

  // 2nd Pill: Issued By / Brand
  if (product.brand) {
    const brandVal = product.brand.trim()
    const alreadyHasBrand = pills.some(
      (p) => p.value.toLowerCase() === brandVal.toLowerCase()
    )
    if (!alreadyHasBrand) {
      pills.push({ label: "Issued By", value: brandVal })
    }
  }

  // 3rd Pill: Key Spec 2 or 3 (e.g. Temp Range or Application)
  parseAndAdd(product.key_spec_2, "Application")

  if (pills.length < 3 && product.key_spec_3) {
    parseAndAdd(product.key_spec_3, "Standard")
  }

  return pills.slice(0, 3)
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
  const { data: product, isLoading, error } = useProduct(slug || "")
  const { data: productsData } = useProducts({ limit: 100 })

  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const isWishlisted = useWishlistStore((state) => state.hasItem(product?.sku || ""))

  const [qty, setQty] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [relatedPage, setRelatedPage] = useState(1)
  const [viewedPage, setViewedPage] = useState(1)
  const [reviewPage, setReviewPage] = useState(1)
  
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
    window.scrollTo({ top: 0, behavior: "smooth" })
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

  // Carousel Row 1 items (Related products) with pagination support
  const relatedPool = catalog
  const relatedPageSize = 5
  const totalRelatedPages = Math.max(1, Math.ceil(relatedPool.length / relatedPageSize))
  const safeRelatedPage = ((relatedPage - 1) % totalRelatedPages) + 1
  const relatedStartIndex = (safeRelatedPage - 1) * relatedPageSize
  const relatedItems = relatedPool.slice(relatedStartIndex, relatedStartIndex + relatedPageSize)

  // Carousel Row 2 items (Customers also viewed) offset by 5 to guarantee different products
  const viewedPool = [...catalog.slice(5), ...catalog.slice(0, 5)]
  const viewedPageSize = 5
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

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 pb-6 sm:pb-8">
          
          {/* Left Column: Showcase Card with Main Image + 4 Thumbnails Inside */}
          <div className="col-span-1 lg:col-span-6 w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg p-3.5 sm:p-4 lg:p-5 xl:p-6 flex flex-col justify-between items-center shadow-2xs">
            {/* Main Product Image with Interactive Opposite-Direction Zoom Lens (Robu.in style) */}
            <div
              ref={zoomContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full flex-1 flex items-center justify-center py-1 sm:py-2 min-h-[190px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[260px] xl:min-h-[340px] 2xl:min-h-[380px] overflow-hidden cursor-crosshair relative select-none rounded-md"
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
                className={`max-h-[180px] sm:max-h-[210px] md:max-h-[240px] lg:max-h-[250px] xl:max-h-[330px] 2xl:max-h-[370px] max-w-[300px] w-auto object-contain pointer-events-none will-change-transform ${
                  product.stock_status === "out_of_stock" ? "grayscale contrast-95 opacity-85" : ""
                }`}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    gallery.primary || "/images/cat_cables_1785994179162.png"
                }}
              />
            </div>

            {/* 4 Thumbnails positioned at bottom inside the same gray card */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 mt-2 sm:mt-3 w-full">
              {galleryThumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx)
                    resetZoom()
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 xl:w-[72px] xl:h-[72px] rounded-lg bg-white border p-1 sm:p-1.5 flex items-center justify-center cursor-pointer transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? "border-2 border-[#b91c1c] ring-2 ring-[#b91c1c]/25 shadow-xs"
                      : "border-[#d1d5db] hover:border-gray-400 opacity-85 hover:opacity-100 shadow-2xs"
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

          {/* Right Column: Product Info & Actions matching PDF UI */}
          <div className="col-span-1 lg:col-span-6 w-full flex flex-col justify-start pt-0.5">
            
            {/* Top Tag Row: Category Red Pill on Left, Availability on Right */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5 sm:mb-2">
              <span className="bg-[#b91c1c] text-white text-[11px] sm:text-[11.5px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider inline-block">
                {product.category_name || "Industrial Solutions"}
              </span>
              <div className="text-[12px] sm:text-[12.5px] font-medium text-gray-700">
                Availability:{" "}
                {product.stock_status === "out_of_stock" ? (
                  <span className="font-bold text-[#b91c1c]">Out of Stock</span>
                ) : (
                  <span className="font-bold text-[#16a34a]">In Stock</span>
                )}
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-heading text-[19px] sm:text-[22px] lg:text-[25px] xl:text-[30px] 2xl:text-[32px] font-black text-[#111111] leading-tight mb-2 sm:mb-2.5">
              {product.product_name}
            </h1>

            {/* Dynamic Specification Pills matching PDF badge styling */}
            <div className="flex items-center flex-wrap gap-1.5 mb-2 sm:mb-2.5">
              {specPills.map((pill, idx) => (
                <span
                  key={idx}
                  className="bg-[#f2f4f7] text-[#111111] text-[10.5px] sm:text-[11.5px] font-bold px-2.5 py-1 rounded-lg"
                >
                  {pill.label ? `${pill.label}: ` : ""}
                  <span className="font-medium text-gray-700">{pill.value}</span>
                </span>
              ))}
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <div className="flex text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" stroke="none" />
                ))}
              </div>
              <span className="text-[12px] sm:text-[12.5px] text-gray-500 font-medium">
                ( 1 customer review)
              </span>
            </div>

            <hr className="border-t border-[#e5e7eb] my-2 sm:my-2.5" />

            {/* Brand, SKU, and Product Family specs */}
            <div className="flex flex-col gap-1.5 sm:gap-2 text-[13px] sm:text-[13.5px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">Brand:</span>
                <BrandBadge name={product.brand || "Generic"} />
              </div>
              <div>
                <span className="font-bold text-gray-900">SKU / Part Number:</span>{" "}
                <span className="font-semibold text-gray-800 font-mono">{product.catalog_number || product.sku}</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Product Family:</span>{" "}
                <span className="font-semibold text-gray-800">{product.family_name || product.category_name || "Industrial Components"}</span>
              </div>
              <p className="text-gray-600 text-[12px] sm:text-[12.5px] leading-relaxed mt-0.5 line-clamp-2">
                {product.short_description || "High-precision industrial product engineered for dependable reliability, standard compliance, and continuous manufacturing."}
              </p>
            </div>

            <hr className="border-t border-[#e5e7eb] my-2.5 sm:my-3" />

            {/* Action Row: Quantity + Add to Quote Basket + Wishlist + Accessibility */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap mb-3 sm:mb-4">
              {/* Quantity Box matching PDF: - 1 + */}
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

              {/* Wishlist Button: Rounded square */}
              <button
                onClick={handleToggleWishlist}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                  isWishlisted
                    ? "bg-[#FFF1F2] border-[#b91c1c] text-[#b91c1c]"
                    : "bg-white border-[#d1d5db] text-gray-700 hover:border-[#b91c1c] hover:text-[#b91c1c]"
                }`}
                title={isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                aria-label="Wishlist"
              >
                <Heart size={16} fill={isWishlisted ? "#b91c1c" : "none"} />
              </button>

              {/* Share / Accessibility Icon Button matching PDF */}
              <button
                className="w-10 h-10 rounded-lg border border-[#d1d5db] flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors shrink-0"
                title="Accessibility & Share"
                aria-label="Share product"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="4" r="2" />
                  <path d="m4 8 8 2 8-2" />
                  <path d="M12 10v6" />
                  <path d="m8 20 4-4 4 4" />
                </svg>
              </button>
            </div>

            {/* Value Propositions with Green Icons */}
            <div className="flex flex-col gap-2 text-[12px] sm:text-[12.5px] text-gray-700">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#16a34a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Single-Vendor Consolidated Quotes (zero split shipments)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#16a34a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Traceability batch labels supplied on delivery</span>
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
              className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Floating Red Button */}
            <button
              onClick={() => setRelatedPage((p) => (p < totalRelatedPages ? p + 1 : 1))}
              className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {relatedItems.map((item, idx) => (
                <CarouselProductCard
                  key={item.sku}
                  sku={item.sku}
                  title={item.product_name}
                  brand={item.brand || "Generic"}
                  image={getCarouselProductImage(item, (safeRelatedPage - 1) * 5 + idx)}
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
              className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Floating Red Button */}
            <button
              onClick={() => setViewedPage((p) => (p < totalViewedPages ? p + 1 : 1))}
              className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {viewedItems.map((item, idx) => (
                <CarouselProductCard
                  key={item.sku}
                  sku={item.sku}
                  title={item.product_name}
                  brand={item.brand || "Generic"}
                  image={getCarouselProductImage(item, 5 + (safeViewedPage - 1) * 5 + idx)}
                  stockStatus={item.stock_status || "in_stock"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Support / Help Section matching PDF clean icons */}
        <section className="py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="/images/support_headset.png"
                alt="Need Support"
                className="w-12 h-12 object-contain"
              />
              <h4 className="font-heading font-extrabold text-[17px] sm:text-[18px] text-[#111111]">
                Need Support ?
              </h4>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="/images/support_search.png"
                alt="Didn't find what you are looking for"
                className="w-12 h-12 object-contain"
              />
              <h4 className="font-heading font-extrabold text-[17px] sm:text-[18px] text-[#111111]">
                Didn’t find what you are looking for?
              </h4>
            </div>
          </div>
        </section>

        {/* Section 4: Exactly 5 Customer Product reviews matching user request & PDF */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-[19px] sm:text-[21px] font-bold text-[#111111]">
              Customer Product reviews
            </h3>
            <span className="text-[12.5px] font-medium text-gray-500">Page {reviewPage} of 1</span>
          </div>

          <div className="relative">
            {/* Left Floating Red Button */}
            <button
              onClick={() => setReviewPage((p) => (p > 1 ? p - 1 : 1))}
              className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Floating Red Button */}
            <button
              onClick={() => setReviewPage((p) => (p < 1 ? p + 1 : 1))}
              className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            {/* 5 Review Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {customerReviews.map((rev, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e5e7eb] rounded-lg p-5 sm:p-6 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow justify-center gap-1"
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

      </div>
    </div>
  )
}

