import { useState, useRef, useEffect, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search, X, ChevronRight } from "lucide-react"
import { mockProducts } from "@/features/products/services/product.service"
import { getProductPrimaryImage } from "@/features/products/utils/productImages"

export default function HeaderSearch() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter matching products for live suggestions
  const matchingProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return []
    return mockProducts
      .filter((p) => {
        const name = (p.product_name || "").toLowerCase()
        const sku = (p.sku || "").toLowerCase()
        const cat = (p.category_name || "").toLowerCase()
        const brand = (p.brand || "").toLowerCase()
        const catalogNum = (p.catalog_number || "").toLowerCase()
        return (
          name.includes(trimmed) ||
          sku.includes(trimmed) ||
          cat.includes(trimmed) ||
          brand.includes(trimmed) ||
          catalogNum.includes(trimmed)
        )
      })
      .slice(0, 5)
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsOpen(false)
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`)
    } else {
      navigate(`/products`)
    }
  }

  const handleSelectProduct = (sku: string) => {
    setIsOpen(false)
    navigate(`/products/${sku}`)
  }

  const handleClear = () => {
    setQuery("")
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative flex-1 max-w-[680px] hidden md:flex">
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center h-[42px] bg-white border border-[#d1d5db] rounded-lg px-3 focus-within:border-[#b91c1c] focus-within:ring-2 focus-within:ring-[#b91c1c]/15 transition-all shadow-2xs"
      >
        {/* Search Icon */}
        <Search size={17} className="text-gray-400 shrink-0 mr-2.5 pointer-events-none" />

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products, SKUs, or brands..."
          className="flex-1 border-none outline-none text-[13.5px] text-[#111111] placeholder:text-gray-400 bg-transparent h-full min-w-0"
          aria-label="Search components"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-700 p-1 mr-1 transition-colors cursor-pointer rounded-full"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}

        {/* Red Submit Search Button */}
        <button
          type="submit"
          className="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-3.5 h-[30px] rounded-md text-[12.5px] font-bold transition-all shrink-0 flex items-center justify-center gap-1 cursor-pointer shadow-2xs active:scale-98"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>

      {/* Live Suggestions Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-[#e5e7eb] rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {matchingProducts.length > 0 ? (
            <div>
              <div className="px-3.5 py-2 bg-[#f8f9fa] border-b border-[#eef0f4] text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Matching Products ({matchingProducts.length})
              </div>
              <ul className="divide-y divide-[#f1f3f5] max-h-[340px] overflow-y-auto">
                {matchingProducts.map((product) => {
                  const imageSrc = getProductPrimaryImage(product)
                  const isOutOfStock = product.stock_status === "out_of_stock"

                  return (
                    <li key={product.sku}>
                      <button
                        type="button"
                        onClick={() => handleSelectProduct(product.sku)}
                        className="w-full px-3.5 py-2.5 flex items-center gap-3 hover:bg-red-50/40 text-left transition-colors cursor-pointer group"
                      >
                        {/* Thumbnail */}
                        <div className="w-10 h-10 rounded-lg bg-[#f4f5f7] border border-[#e5e7eb] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={product.product_name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src =
                                "/images/cat_cables_1785994179162.png"
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-gray-900 truncate group-hover:text-[#b91c1c] transition-colors">
                            {product.product_name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
                            <span className="font-mono font-semibold text-gray-700">
                              {product.catalog_number || product.sku}
                            </span>
                            <span>•</span>
                            <span className="truncate">{product.category_name}</span>
                          </div>
                        </div>

                        {/* Availability Tag */}
                        <div className="shrink-0 text-right">
                          {isOutOfStock ? (
                            <span className="text-[10.5px] font-bold text-[#b91c1c]">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="text-[10.5px] font-bold text-[#16a34a]">
                              In Stock
                            </span>
                          )}
                        </div>

                        <ChevronRight size={14} className="text-gray-400 group-hover:text-[#b91c1c] shrink-0" />
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* View all results button */}
              <div className="p-2 bg-[#f8f9fa] border-t border-[#eef0f4] text-center">
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="text-[12px] font-bold text-[#b91c1c] hover:underline cursor-pointer inline-flex items-center gap-1 py-1"
                >
                  View all results for &quot;{query}&quot;
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-[13px] font-semibold text-gray-700">
                No products found for &quot;{query}&quot;
              </p>
              <p className="text-[11.5px] text-gray-400 mt-1">
                Try searching by SKU, family, brand, or generic category name.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  navigate("/products")
                }}
                className="mt-3 text-[12px] font-bold text-[#b91c1c] hover:underline cursor-pointer"
              >
                Browse complete catalog →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
