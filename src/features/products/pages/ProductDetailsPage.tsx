import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useProduct } from "../hooks/useProduct"
import { useProducts } from "../hooks/useProducts"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "../components/ProductCard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Heart, ShoppingBag, Plus, Minus, CheckCircle, FileText } from "lucide-react"
import { slugify } from "@/lib/utils"

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, error } = useProduct(slug || "")
  const { data: relatedData } = useProducts({ limit: 4 })

  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)
  const toggleWishlist = useWishlistStore((state) => state.toggleItem)
  const isWishlisted = useWishlistStore((state) => state.hasItem(product?.sku || ""))

  const [qty, setQty] = useState(1)

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

  // Fallback category images
  const getCategoryPlaceholderImage = (cat: string) => {
    const cleanCat = cat.toLowerCase()
    if (cleanCat.includes("cable") || cleanCat.includes("connect")) {
      return "/images/cat_cables_1785994179162.png"
    }
    if (cleanCat.includes("test") || cleanCat.includes("measur")) {
      return "/images/cat_test_1785994197761.png"
    }
    if (cleanCat.includes("rf") || cleanCat.includes("wave")) {
      return "/images/cat_rf_1785994214462.png"
    }
    if (cleanCat.includes("tool") || cleanCat.includes("mro")) {
      return "/images/cat_tools_1785994233090.png"
    }
    if (cleanCat.includes("smt") || cleanCat.includes("rework")) {
      return "/images/bento_smt_1785994353600.png"
    }
    return "/images/cat_cables_1785994179162.png"
  }

  if (isLoading) {
    return (
      <div className="max-w-[1380px] mx-auto px-6 py-12 flex flex-col gap-8 text-left">
        <Skeleton className="h-6 w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-[10px] w-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-red-500">Failed to load product.</h2>
        <p className="text-[#777777] mt-2">The product SKU might be invalid or the database is offline.</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-[#B20602] text-white px-6 py-2.5 rounded-[6px] text-[13.6px] font-bold"
        >
          Return to Catalog
        </Link>
      </div>
    )
  }

  const imageSrc = getCategoryPlaceholderImage(product.category_name || "")

  // Filter key specs
  const keySpecs = [product.key_spec_1, product.key_spec_2, product.key_spec_3].filter(Boolean)

  return (
    <div className="bg-[#f9f9fb] min-h-screen py-8 text-left">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {product.category_name && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/products?category=${slugify(product.category_name)}`}>
                      {product.category_name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-gray-900 truncate max-w-[200px]">
                {product.product_name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[16px] border border-[#eaeaea] p-4 sm:p-6 lg:p-10 shadow-sm mb-12">
          
          {/* Left Column: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="border border-[#eaeaea] rounded-[10px] aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-6 relative">
              {product.catalog_number && (
                <Badge className="absolute top-4 left-4 bg-gray-900 text-white rounded-[4px] px-2 py-0.5">
                  {product.catalog_number}
                </Badge>
              )}
              <img
                src={imageSrc}
                alt={product.product_name}
                className="max-h-[350px] w-auto object-contain"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "https://placehold.co/400x400/ffffff/ee2761?text=Product"
                }}
              />
            </div>
          </div>

          {/* Right Column: Info & Buy Section */}
          <div className="flex flex-col justify-start">
            <div>
              <span className="text-[12px] font-bold text-[#B20602] uppercase tracking-wider bg-[#FFF0F0] px-3 py-1 rounded-full border border-[#FEE8E8] inline-block">
                {product.category_name || "Industrial solution"}
              </span>
              <h1 className="font-heading text-[28px] sm:text-[34px] font-extrabold text-[#222222] tracking-tight leading-tight mt-4">
                {product.product_name}
              </h1>

              {/* Technical Specifications Highlights */}
              <div className="flex flex-wrap gap-2 mt-4">
                {keySpecs.map((spec, i) => (
                  <span
                    key={i}
                    className="bg-[#f4f5f8] border border-[#d1d5db] text-[#555555] text-[12px] font-bold px-3 py-1.5 rounded-[4px]"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Details specs */}
              <div className="mt-6 border-t border-[#eaeaea] pt-6 flex flex-col gap-3 text-[14px]">
                <div>
                  <strong className="text-[#222222]">Brand:</strong>{" "}
                  <span className="text-[#555555] font-semibold">{product.brand || "Generic"}</span>
                </div>
                <div>
                  <strong className="text-[#222222]">SKU / Part Number:</strong>{" "}
                  <span className="text-[#555555] font-semibold font-mono">{product.sku}</span>
                </div>
                {product.catalog_number && (
                  <div>
                    <strong className="text-[#222222]">Catalog Number:</strong>{" "}
                    <span className="text-[#555555] font-semibold font-mono">{product.catalog_number}</span>
                  </div>
                )}
                {product.family_name && (
                  <div>
                    <strong className="text-[#222222]">Product Family:</strong>{" "}
                    <span className="text-[#555555] font-semibold">{product.family_name}</span>
                  </div>
                )}
              </div>

              {product.short_description && (
                <p className="text-[#555555] text-[14.4px] mt-6 leading-relaxed">
                  {product.short_description}
                </p>
              )}
            </div>

            {/* Qty & Cart buttons */}
            <div className="mt-8 pt-6 border-t border-[#eaeaea]">
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <div className="flex items-center border border-[#d1d5db] rounded-[6px] overflow-hidden bg-white shrink-0">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-2 bg-[#f4f5f8] hover:bg-gray-200 text-[#555555] font-bold cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="text"
                    value={qty}
                    readOnly
                    className="w-12 text-center text-[14.4px] font-bold text-[#222222]"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-2 bg-[#f4f5f8] hover:bg-gray-200 text-[#555555] font-bold cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToQuote}
                  className="bg-[#B20602] hover:bg-[#900502] text-white px-6 py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Request Quote Basket</span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 rounded-[6px] border flex items-center justify-center cursor-pointer transition-colors ${
                    isWishlisted
                      ? "bg-[#FFF0F0] border-[#B20602] text-[#B20602]"
                      : "bg-white border-[#d1d5db] text-gray-400 hover:text-[#B20602] hover:border-gray-400"
                  }`}
                  title={isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                >
                  <Heart size={20} fill={isWishlisted ? "#B20602" : "none"} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[12.8px] text-[#555555]">
                  <CheckCircle size={15} className="text-emerald-500" />
                  <span>Single-Vendor Consolidated Quotes (zero split shipments)</span>
                </div>
                <div className="flex items-center gap-2 text-[12.8px] text-[#555555]">
                  <FileText size={15} className="text-emerald-500" />
                  <span>Traceability batch labels supplied on delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Specifications Tabs */}
        {product.specs && product.specs.length > 0 && (
          <div className="bg-white rounded-[16px] border border-[#eaeaea] p-4 sm:p-6 lg:p-10 shadow-sm mb-12 text-left">
            <h3 className="font-heading text-[22px] font-bold text-[#222222] mb-6">
              Technical Specifications
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border-collapse">
                <thead>
                  <tr className="border-b border-[#eaeaea] bg-[#f9f9fb] text-[#222222] font-semibold">
                    <th className="py-3 px-4">Parameter</th>
                    <th className="py-3 px-4">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.value_id} className="border-b border-[#eaeaea] hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-[#555555]">{spec.filter_name}</td>
                      <td className="py-3 px-4 text-[#222222] font-medium">
                        {spec.option_value || spec.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related Products Grid */}
        <section className="mb-12">
          <h3 className="font-heading text-[24px] font-bold text-[#222222] mb-6">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedData?.data.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
