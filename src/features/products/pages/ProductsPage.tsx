import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import { useBrands } from "../hooks/useBrands"
import { useNavigationTree } from "@/hooks/use-categories"
import { ProductCard } from "../components/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, slugify } from "@/lib/utils"

const subcatBrandsMap: Record<string, string[]> = {
  "Fiber & Optical": ["DNC", "Generic"],
  "Industrial Networking": ["DNC", "Finisar", "Generic", "TP-Link"],
  "IT Cables & Accessories": ["DTECH", "Generic", "National Instruments", "Ugreen"],
  "RF & Microwave": ["Belden", "ECT", "Generic", "Pasternack"],
  "ESD Control": ["DESCO", "DESCO/Prostat", "Generic"],
  "ESD Test & Measurement": ["Generic", "Prostat", "Tescom", "Tojoin", "Trek"],
  "IT Hardware": ["ADATA", "Dell", "Generic", "Intel", "Lenovo", "Samsung"],
  "Workstation Storage & Tooling": ["Generic"],
  "Hardware": ["Honeywell", "Webscan", "Zebra"],
  "Labels & Tags": ["Generic"],
  "Printing & Barcode Systems": ["IEEE", "Impinj"],
  "Electrical & Power Components": ["Ametek", "Chroma", "eFocus", "EPCOS", "Generic", "LY1F", "Meanwell", "PULS", "Siemens"],
  "Pneumatics & Fluid Control": ["Airtac", "Fairchild", "Generic", "SMC"],
  "Embedded Hardware & Components": ["Arduino", "NVIDIA", "Raspberry Pi"],
  "Rework Systems": ["Denon", "Generic"],
  "Soldering Consumables": ["Edsyn", "Generic", "Hakko", "Quick", "Weller"],
  "Test & Measurement": ["Generic", "National Instruments", "Segger", "Spectrum Digital"],
  "Electrical Test Instruments": ["Fluke", "GW Instek", "Rigol"],
  "Environmental Measurement": ["FLIR", "Fluke", "Generic", "Particle Plus", "Thermo Scientific"],
  "Inspection, Accessories & General Tools": ["Generic", "Mechanic", "Ridgid"],
  "Mechanical & Force Measurement": ["Dwyer", "Generic", "Mitutoyo"],
  "Fixings & Consumables": ["3M"],
  "Hand & Power Tools": ["3M", "3M/Generic", "Atlas Copco", "Generic", "Knipex", "Knipex/Generic", "Wera", "Wera/Wiha"]
}

const getBrandsForSubcategory = (subName: string, _globalBrands: string[]) => {
  if (subcatBrandsMap[subName]) {
    return subcatBrandsMap[subName]
  }
  // Fallback to searching case-insensitively
  const matchedKey = Object.keys(subcatBrandsMap).find(
    k => k.toLowerCase() === subName.toLowerCase()
  )
  if (matchedKey) {
    return subcatBrandsMap[matchedKey]
  }
  // Ultimate fallback
  return ["Generic"]
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const activeCategory = searchParams.get("category") || ""
  const activeSubcategory = searchParams.get("subcategory") || ""
  const activeBrand = searchParams.get("brand") || ""
  const searchQuery = searchParams.get("search") || ""

  const activeCats = activeCategory ? activeCategory.split(",") : []
  const activeSubs = activeSubcategory ? activeSubcategory.split(",") : []
  const activeBrands = activeBrand ? activeBrand.split(",") : []
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = 12

  // Queries
  const { data: navigationTree } = useNavigationTree()
  const { data, isLoading } = useProducts({
    category: activeCategory || undefined,
    subcategory: activeSubcategory || undefined,
    brand: activeBrand || undefined,
    search: searchQuery || undefined,
    page,
    limit,
  })

  // URL Sync Mutators
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    // Automatically clear the search parameter when user updates filters
    if (updates.category !== undefined || updates.subcategory !== undefined || updates.brand !== undefined) {
      params.delete("search")
    }
    
    params.set("page", "1") // reset page on filter change
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const updateParam = (key: string, value: string) => {
    updateParams({ [key]: value })
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams())
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const { data: brands = [] } = useBrands()

  return (
    <div className="bg-[#f9f9fb] min-h-screen py-4 sm:py-6 lg:py-10">
      <div className="max-w-[1380px] mx-auto px-3 sm:px-6 flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        
        {/* Mobile Filters Toggle Button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white hover:bg-gray-50 text-[#222222] border border-[#eaeaea] py-3 rounded-[10px] text-[14px] font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{showMobileFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        {/* Filters Sidebar */}
        <aside className={cn(
          "lg:col-span-1 bg-white p-6 rounded-[10px] border border-[#eaeaea] shadow-sm h-fit text-left",
          showMobileFilters ? "block" : "hidden lg:block"
        )}>
          <div className="flex justify-between items-center pb-4 border-b border-[#eaeaea] mb-6">
            <h3 className="font-heading text-[18px] font-bold text-[#222222]">
              Filter Catalog
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-[12px] text-[#B20602] hover:underline font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="font-heading text-[14.4px] font-bold text-[#222222] hover:no-underline">
                Categories
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 mt-3">
                {navigationTree?.map((cat) => {
                  const catSlug = slugify(cat.name)
                  const isCatChecked = activeCats.includes(catSlug)

                  return (
                    <div key={cat.id} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`cat-${cat.id}`}
                          checked={isCatChecked}
                          onCheckedChange={(checked) => {
                            const updates: Record<string, string> = {}
                            let newCats = [...activeCats]
                            if (checked) {
                              newCats.push(catSlug)
                              updates["category"] = newCats.join(",")
                            } else {
                              newCats = newCats.filter((c) => c !== catSlug)
                              updates["category"] = newCats.join(",")
                              
                              // Clear subcategories belonging to this category from activeSubs
                              const subSlugs = cat.subcategories.map(s => slugify(s.name))
                              const newSubs = activeSubs.filter(s => !subSlugs.includes(s))
                              updates["subcategory"] = newSubs.join(",")
                              
                              // Clear brands belonging to these subcategories from activeBrands
                              const subSlugsToRemove = cat.subcategories.map(s => slugify(s.name))
                              const newBrands = activeBrands.filter(b => {
                                // Composite brand format: "subSlug:brandName"
                                if (b.includes(':')) {
                                  const scopeSlug = b.split(':')[0]
                                  return !subSlugsToRemove.includes(scopeSlug)
                                }
                                // Legacy plain brand name — clear it too
                                return false
                              })
                              updates["brand"] = newBrands.join(",")
                            }
                            updateParams(updates)
                          }}
                        />
                        <label
                          htmlFor={`cat-${cat.id}`}
                          className="text-[13.6px] text-[#555555] font-semibold cursor-pointer select-none"
                        >
                          {cat.name}
                        </label>
                      </div>

                      {/* Subcategories (Indented) */}
                      {isCatChecked && cat.subcategories.length > 0 && (
                        <div className="pl-6 flex flex-col gap-2 mt-1 border-l border-gray-100 ml-2">
                          {cat.subcategories.map((sub) => {
                            const subSlug = slugify(sub.name)
                            const isSubChecked = activeSubs.includes(subSlug)

                            return (
                              <div key={sub.id} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    id={`sub-${sub.id}`}
                                    checked={isSubChecked}
                                    onCheckedChange={(checked) => {
                                      const updates: Record<string, string> = {}
                                      let newSubs = [...activeSubs]
                                      if (checked) {
                                        newSubs.push(subSlug)
                                        updates["subcategory"] = newSubs.join(",")
                                      } else {
                                        newSubs = newSubs.filter(s => s !== subSlug)
                                        updates["subcategory"] = newSubs.join(",")
                                        
                                        // Clear brands corresponding to this subcategory from activeBrands
                                        const newBrands = activeBrands.filter(b => !b.startsWith(`${subSlug}:`))
                                        updates["brand"] = newBrands.join(",")
                                      }
                                      updateParams(updates)
                                    }}
                                  />
                                  <label
                                    htmlFor={`sub-${sub.id}`}
                                    className="text-[13px] text-[#555555] font-medium cursor-pointer select-none"
                                  >
                                    {sub.name}
                                  </label>
                                </div>

                                {/* Brands (Indented further) */}
                                {isSubChecked && (
                                  <div className="pl-6 flex flex-col gap-2 mt-1 border-l border-gray-100 ml-2">
                                    {getBrandsForSubcategory(sub.name, brands).map((brandName) => {
                                      const compositeBrand = `${subSlug}:${brandName}`
                                      const isBrandChecked = activeBrands.includes(compositeBrand)

                                      return (
                                        <div key={brandName} className="flex items-center gap-2">
                                          <Checkbox
                                            id={`brand-${subSlug}-${brandName}`}
                                            checked={isBrandChecked}
                                            onCheckedChange={(checked) => {
                                              let newBrands = [...activeBrands]
                                              if (checked) {
                                                newBrands.push(compositeBrand)
                                              } else {
                                                newBrands = newBrands.filter((b) => b !== compositeBrand)
                                              }
                                              updateParam("brand", newBrands.join(","))
                                            }}
                                          />
                                          <label
                                            htmlFor={`brand-${subSlug}-${brandName}`}
                                            className="text-[12.8px] text-[#777777] font-medium cursor-pointer select-none"
                                          >
                                            {brandName}
                                          </label>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Catalog Main Content */}
        <main className="lg:col-span-3">
          {/* List Toolbar details */}
          <div className="bg-white p-4 rounded-[10px] border border-[#eaeaea] shadow-sm mb-6 flex flex-wrap justify-between items-center gap-4 text-left">
            <div>
              <span className="text-[12.8px] text-[#777777] font-semibold">
                Showing {data?.data.length || 0} of {data?.pagination.total || 0} products
              </span>
              {searchQuery && (
                <span className="text-[12.8px] text-[#777777] ml-2">
                  for "<strong>{searchQuery}</strong>"
                </span>
              )}
            </div>
            
            {/* Active search filter clear */}
            {searchQuery && (
              <button
                onClick={() => updateParam("search", "")}
                className="text-[12.8px] text-[#B20602] hover:underline font-bold"
              >
                Clear Search &times;
              </button>
            )}
          </div>

          {/* Cards listing */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#eaeaea] rounded-[10px] p-5 h-[380px] flex flex-col justify-between"
                >
                  <Skeleton className="w-full aspect-square rounded-[6px]" />
                  <div className="flex flex-col gap-2 mt-4">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                  <Skeleton className="h-8 w-full mt-4" />
                </div>
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="bg-white rounded-[10px] border border-[#eaeaea] py-24 text-center">
              <p className="text-[16px] text-[#777777] font-medium">
                No products match the selected criteria.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-[#B20602] text-white px-5 py-2.5 rounded-[6px] text-[13.6px] font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {data?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination controls */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-8 sm:mt-12">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 border border-[#d1d5db] rounded-[6px] text-[12px] sm:text-[13px] font-bold bg-white text-[#555555] hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                &larr; Prev
              </button>
              
              {Array.from({ length: data.pagination.totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-[6px] text-[11px] sm:text-[13px] font-bold cursor-pointer ${
                    page === idx + 1
                      ? "bg-[#B20602] text-white"
                      : "bg-white border border-[#d1d5db] text-[#555555] hover:border-gray-400"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={page === data.pagination.totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 border border-[#d1d5db] rounded-[6px] text-[12px] sm:text-[13px] font-bold bg-white text-[#555555] hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
