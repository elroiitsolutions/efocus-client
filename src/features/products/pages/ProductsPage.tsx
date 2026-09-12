import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import { useBrands } from "../hooks/useBrands"
import { useFamilies } from "../hooks/useFamilies"
import { useContextualFilters } from "../hooks/useContextualFilters"
import { useNavigationTree } from "@/hooks/use-categories"
import { ProductCard } from "../components/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, slugify } from "@/lib/utils"
import { Layers, SlidersHorizontal, Search, ChevronDown } from "lucide-react"

// Styled brand badges to replicate real vendor logos
function BrandBadge({ name }: { name: string }) {
  const brandClean = name.toLowerCase()

  if (brandClean.includes("3m")) {
    return (
      <span className="text-[11px] font-black text-[#D32F2F] tracking-tighter bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
        3M
      </span>
    )
  }
  if (brandClean.includes("ieee")) {
    return (
      <span className="text-[11px] font-serif font-black italic text-[#00629B] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">
        IEEE
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
    <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
      {name}
    </span>
  )
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [brandSearchTerm, setBrandSearchTerm] = useState("")
  const [familySearchTerm, setFamilySearchTerm] = useState("")
  const [openAccordionValues, setOpenAccordionValues] = useState<string[]>([])

  // URL Parameters
  const activeCategory = searchParams.get("category") || ""
  const activeSubcategory = searchParams.get("subcategory") || ""
  const activeFamily = searchParams.get("family") || ""
  const activeBrand = searchParams.get("brand") || ""
  const activeStockStatus = searchParams.get("stock_status") || ""
  const activeFilterOptions = searchParams.get("filter_options") || ""
  const searchQuery = searchParams.get("search") || ""

  const activeCats = activeCategory ? activeCategory.split(",").map(c => c.trim()).filter(Boolean) : []
  const activeSubs = activeSubcategory ? activeSubcategory.split(",").map(s => s.trim()).filter(Boolean) : []
  const activeFamilies = activeFamily ? activeFamily.split(",").map(f => f.trim()).filter(Boolean) : []
  const activeBrands = activeBrand ? activeBrand.split(",").map(b => b.trim()).filter(Boolean) : []
  const activeStocks = activeStockStatus ? activeStockStatus.split(",").map(s => s.trim()).filter(Boolean) : []
  const activeOptIds = activeFilterOptions ? activeFilterOptions.split(",").map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id)) : []



  // Advanced Filter section visibility (defaults to open showing closed sub-filter categories)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(true)

  // Pending filter selections (only applied to product list when "Apply Filters" button is clicked)
  const [pendingCats, setPendingCats] = useState<string[]>(activeCats)
  const [pendingSubs, setPendingSubs] = useState<string[]>(activeSubs)
  const [pendingFamilies, setPendingFamilies] = useState<string[]>(activeFamilies)
  const [pendingBrands, setPendingBrands] = useState<string[]>(activeBrands)
  const [pendingStocks, setPendingStocks] = useState<string[]>(activeStocks)
  const [pendingOptIds, setPendingOptIds] = useState<number[]>(activeOptIds)

  // Open Category dropdown ID (only one open at a time: opening next closes existing)
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)

  // Keep pending state synchronized whenever URL searchParams change
  useEffect(() => {
    setPendingCats(activeCats)
    setPendingSubs(activeSubs)
    setPendingFamilies(activeFamilies)
    setPendingBrands(activeBrands)
    setPendingStocks(activeStocks)
    setPendingOptIds(activeOptIds)
  }, [searchParams])

  const page = parseInt(searchParams.get("page") || "1", 10)

  // Responsive limit: 15 on XL/big screens (3 rows of 5 cards), 12 on smaller screens
  const [isBigScreen, setIsBigScreen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1280 : false
  )

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth >= 1280)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const limit = isBigScreen ? 15 : 12

  // Contextual parameter for dynamic specs & brand filtering
  const pendingFamilyParam = pendingFamilies.join(",")

  // API Queries
  const { data: navigationTree } = useNavigationTree()
  const { data: brands = [] } = useBrands({
    category: pendingCats.join(",") || undefined,
    subcategory: pendingSubs.join(",") || undefined,
    family: pendingFamilyParam || undefined,
  })
  const { data: allFamilies = [] } = useFamilies()

  // Prune any pendingBrands that do not exist in the selected family (supports slugs and raw names)
  useEffect(() => {
    if (pendingFamilies.length > 0 && brands.length > 0) {
      setPendingBrands((prev) => {
        const valid = prev.filter((b) =>
          brands.some((brand) => slugify(brand) === slugify(b) || brand.toLowerCase() === b.toLowerCase())
        )
        return valid.length === prev.length ? prev : valid
      })
    }
  }, [pendingFamilyParam, brands])

  // Automatically open the first matching active category in URL on load
  useEffect(() => {
    if (navigationTree && navigationTree.length > 0 && !openCategoryId) {
      const activeCat = navigationTree.find((cat) => {
        const catSlug = slugify(cat.name)
        const isCatActive = activeCats.includes(catSlug) || activeCats.includes(cat.name)
        const isSubActive = cat.subcategories.some((sub) =>
          activeSubs.includes(slugify(sub.name)) || activeSubs.includes(sub.name)
        )
        return isCatActive || isSubActive
      })

      if (activeCat) {
        setOpenCategoryId(`cat-${activeCat.id}`)
      }
    }
  }, [navigationTree, activeCategory, activeSubcategory])

  // Dynamic Product Family Config Filters (Contextual - fetched for pending family so user can configure specs)
  const { data: contextualFilters = [] } = useContextualFilters({
    category: pendingCats.join(",") || undefined,
    subcategory: pendingSubs.join(",") || undefined,
    family: pendingFamilyParam || undefined,
  })

  // Auto-expand family specs in accordion when pending family has specs
  useEffect(() => {
    if (pendingFamilies.length > 0 && contextualFilters.length > 0) {
      setOpenAccordionValues((prev) => {
        const specKeys = contextualFilters.map((f) => `spec-${f.filter_name}`)
        return Array.from(new Set([...prev, ...specKeys]))
      })
    }
  }, [pendingFamilyParam, contextualFilters])

  // Filtered Products Query (Executes ONLY with applied filters from URL)
  const { data, isLoading } = useProducts({
    category: activeCategory || undefined,
    subcategory: activeSubcategory || undefined,
    family: activeFamily || undefined,
    brand: activeBrand || undefined,
    stock_status: activeStockStatus || undefined,
    filter_options: activeFilterOptions || undefined,
    search: searchQuery || undefined,
    page,
    limit,
  })

  // URL State Mutator
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    // Omit page=1 from URL for cleaner URLs
    if (params.get("page") === "1") {
      params.delete("page")
    }
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Apply all pending filters to URL with clean slugs
  const handleApplyFilters = () => {
    updateParams({
      category: pendingCats.map(slugify).join(",") || null,
      subcategory: pendingSubs.map(slugify).join(",") || null,
      family: pendingFamilies.map(slugify).join(",") || null,
      brand: pendingBrands.map(slugify).join(",") || null,
      stock_status: pendingStocks.join(",") || null,
      filter_options: pendingOptIds.join(",") || null,
      page: null, // Reset to first page
    })
  }

  // Reset pending changes to match currently active URL filters
  const handleResetPendingFilters = () => {
    setPendingCats(activeCats)
    setPendingSubs(activeSubs)
    setPendingFamilies(activeFamilies)
    setPendingBrands(activeBrands)
    setPendingStocks(activeStocks)
    setPendingOptIds(activeOptIds)
  }

  // Clear Everything (both active & pending)
  const clearAllFilters = () => {
    setPendingCats([])
    setPendingSubs([])
    setPendingFamilies([])
    setPendingBrands([])
    setPendingStocks([])
    setPendingOptIds([])
    setOpenCategoryId(null)
    setSearchParams(new URLSearchParams())
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Clear upside Filter Catalog (Categories & Subcategories)
  const clearCatalogFilters = () => {
    setPendingCats([])
    setPendingSubs([])
    setOpenCategoryId(null)
    updateParams({
      category: null,
      subcategory: null,
      family: null,
      filter_options: null,
    })
  }

  // Clear downside Advanced Filter (Common attributes, Brands, Families, Specs)
  const clearAdvancedFilters = () => {
    setPendingStocks([])
    setPendingFamilies([])
    setPendingOptIds([])
    setPendingBrands([])
    updateParams({
      stock_status: null,
      brand: null,
      family: null,
      filter_options: null,
    })
  }

  const totalPendingCount =
    pendingCats.length +
    pendingSubs.length +
    pendingFamilies.length +
    pendingBrands.length +
    pendingStocks.length +
    pendingOptIds.length

  const hasPendingChanges =
    pendingCats.slice().sort().join(",") !== activeCats.slice().sort().join(",") ||
    pendingSubs.slice().sort().join(",") !== activeSubs.slice().sort().join(",") ||
    pendingFamilies.slice().sort().join(",") !== activeFamilies.slice().sort().join(",") ||
    pendingBrands.slice().sort().join(",") !== activeBrands.slice().sort().join(",") ||
    pendingStocks.slice().sort().join(",") !== activeStocks.slice().sort().join(",") ||
    pendingOptIds.slice().sort().join(",") !== activeOptIds.slice().sort().join(",")

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    if (newPage > 1) {
      params.set("page", newPage.toString())
    } else {
      params.delete("page")
    }
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Stock status options definition
  const stockStatusOptions = [
    { value: "in_stock", label: "In stock" },
    { value: "out_of_stock", label: "Out of stock" },
    { value: "on_backorder", label: "On backorder" },
  ]

  // Filter brands by inline search
  const filteredBrands = brands.filter(b =>
    b.toLowerCase().includes(brandSearchTerm.toLowerCase())
  )

  // Context-aware scoping for Product Families
  const availableFamilies = allFamilies.filter((fam) => {
    if (pendingCats.length > 0) {
      const catMatches = pendingCats.some(
        (c) =>
          (fam.category_name && slugify(fam.category_name) === c) ||
          (fam.category_name && fam.category_name.toLowerCase() === c.toLowerCase())
      )
      if (!catMatches) return false
    }
    if (pendingSubs.length > 0) {
      const subMatches = pendingSubs.some(
        (s) =>
          (fam.subcategory_name && slugify(fam.subcategory_name) === s) ||
          (fam.subcategory_name && fam.subcategory_name.toLowerCase() === s.toLowerCase())
      )
      if (!subMatches) return false
    }
    return true
  })

  // Filter product families by inline search
  const filteredFamilies = availableFamilies.filter(f =>
    f.name.toLowerCase().includes(familySearchTerm.toLowerCase())
  )

  return (
    <div className="bg-white min-h-screen">
      <div className="py-4 sm:py-6 lg:py-8">
        <div className="site-container flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
        
        {/* Mobile Filters Toggle Button */}
        <div className="lg:hidden w-full">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white hover:bg-gray-50 text-[#222222] border border-[#eaeaea] py-3 rounded-sm text-[14px] font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#c8102e]" />
            <span>{showMobileFilters ? "Hide Filters" : "Show Filters & Configurations"}</span>
          </button>
        </div>

        {/* Filters Sidebar */}
        <aside className={cn(
          "w-full lg:w-[280px] xl:w-[310px] shrink-0 flex flex-col gap-5 text-left",
          showMobileFilters ? "block" : "hidden lg:flex"
        )}>

          {/* ======================================================== */}
          {/* 1. UPSIDE FILTER: "Filter Catalog" (Categories & Subs)    */}
          {/* ======================================================== */}
          <div className="bg-[#f5f6f8] p-4 sm:p-5 rounded-lg border border-[#e5e7eb] shadow-2xs">
            <div className="flex justify-between items-center pb-3 border-b border-[#e5e7eb] mb-3">
              <h3 className="font-heading text-[16px] font-bold text-[#1e293b] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c8102e]" />
                Filter Catalog
              </h3>
              {(activeCats.length > 0 || activeSubs.length > 0) && (
                <button
                  onClick={clearCatalogFilters}
                  className="text-[12px] text-[#c8102e] hover:underline font-semibold cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mt-2">
              <h4 className="font-heading text-[13px] font-bold text-[#334155] mb-2.5 uppercase tracking-wider text-xs">
                Categories
              </h4>

              <div className="space-y-1">
                {navigationTree?.map((cat) => {
                  const catSlug = slugify(cat.name)
                  const isCatChecked = pendingCats.includes(catSlug) || pendingCats.includes(cat.name)
                  const isCatOpen = openCategoryId === `cat-${cat.id}`

                  return (
                    <div key={cat.id} className="border-b border-gray-200/60 last:border-b-0 pb-1">
                      {/* Category Row: Clicking anywhere on row/name/chevron opens dropdown (closing any other open category) */}
                      <div
                        onClick={() => {
                          setOpenCategoryId((prev) => (prev === `cat-${cat.id}` ? null : `cat-${cat.id}`))
                        }}
                        className={cn(
                          "flex items-center justify-between py-1.5 px-2 rounded-sm cursor-pointer transition-colors group select-none",
                          isCatOpen ? "bg-white shadow-2xs" : "hover:bg-white/80"
                        )}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <Checkbox
                            id={`cat-${cat.id}`}
                            checked={isCatChecked}
                            className="data-[state=checked]:bg-[#c8102e] data-[state=checked]:border-[#c8102e] rounded-sm"
                            onClick={(e) => e.stopPropagation()}
                            onCheckedChange={(checked) => {
                              let newCats = [...pendingCats]
                              if (checked) {
                                newCats.push(catSlug)
                                setOpenCategoryId(`cat-${cat.id}`)
                              } else {
                                newCats = newCats.filter((c) => c !== catSlug && c !== cat.name)
                              }
                              const subSlugs = cat.subcategories.map((s) => slugify(s.name))
                              const newSubs = checked
                                ? pendingSubs
                                : pendingSubs.filter((s) => !subSlugs.includes(s))
                              setPendingCats(newCats)
                              setPendingSubs(newSubs)
                            }}
                          />
                          <span
                            className={cn(
                              "text-[13px] truncate transition-colors",
                              isCatChecked
                                ? "font-bold text-[#c8102e]"
                                : "text-[#334155] font-medium group-hover:text-black"
                            )}
                          >
                            {cat.name}
                          </span>
                        </div>

                        {cat.subcategories.length > 0 && (
                          <div className="flex items-center gap-1.5 pl-2 flex-shrink-0 text-gray-400 group-hover:text-gray-600">
                            <span className="text-[11px] font-semibold bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded-sm">
                              {cat.subcategories.length}
                            </span>
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                isCatOpen ? "rotate-180 text-[#c8102e]" : "text-gray-400"
                              )}
                            />
                          </div>
                        )}
                      </div>

                      {/* Subcategories Dropdown: Displayed on click */}
                      {isCatOpen && cat.subcategories.length > 0 && (
                        <div className="pt-1 pb-2 pl-6 ml-3 border-l-2 border-red-200 flex flex-col gap-1.5 animate-in fade-in-50 duration-200">
                          {cat.subcategories.map((sub) => {
                            const subSlug = slugify(sub.name)
                            const isSubChecked =
                              pendingSubs.includes(subSlug) || pendingSubs.includes(sub.name)

                            return (
                              <div
                                key={sub.id}
                                className="flex items-center justify-between py-1 px-1.5 rounded-sm hover:bg-white cursor-pointer group"
                                onClick={() => {
                                  let newSubs = [...pendingSubs]
                                  if (isSubChecked) {
                                    newSubs = newSubs.filter(
                                      (s) => s !== subSlug && s !== sub.name
                                    )
                                  } else {
                                    newSubs.push(subSlug)
                                    if (!pendingCats.includes(catSlug)) {
                                      setPendingCats([...pendingCats, catSlug])
                                    }
                                  }
                                  setPendingSubs(newSubs)
                                }}
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <Checkbox
                                    id={`sub-${sub.id}`}
                                    checked={isSubChecked}
                                    className="data-[state=checked]:bg-[#c8102e] data-[state=checked]:border-[#c8102e] rounded-sm"
                                    onClick={(e) => e.stopPropagation()}
                                    onCheckedChange={(checked) => {
                                      let newSubs = [...pendingSubs]
                                      if (checked) {
                                        newSubs.push(subSlug)
                                        if (!pendingCats.includes(catSlug)) {
                                          setPendingCats([...pendingCats, catSlug])
                                        }
                                      } else {
                                        newSubs = newSubs.filter(
                                          (s) => s !== subSlug && s !== sub.name
                                        )
                                      }
                                      setPendingSubs(newSubs)
                                    }}
                                  />
                                  <span
                                    className={cn(
                                      "text-[12.5px] truncate transition-colors",
                                      isSubChecked
                                        ? "font-bold text-[#c8102e]"
                                        : "text-[#64748b] group-hover:text-black"
                                    )}
                                  >
                                    {sub.name}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Apply Filter Button for Filter Catalog */}
              {(pendingCats.length > 0 || pendingSubs.length > 0 || hasPendingChanges) && (
                <div className="pt-3 border-t border-gray-200 mt-3">
                  <button
                    type="button"
                    onClick={handleApplyFilters}
                    className="w-full bg-[#c8102e] hover:bg-[#a80c25] text-white py-2 px-3 rounded-sm font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer hover:shadow"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Apply Filter</span>
                    {totalPendingCount > 0 && (
                      <span className="bg-white text-[#c8102e] text-[10.5px] font-extrabold px-1.5 py-0.2 rounded-full">
                        {totalPendingCount}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. DOWNSIDE FILTER: "Advanced Filter"                    */}
          {/*    (Stock Status, Brands, Product Family, and Specs)     */}
          {/* ======================================================== */}
          <div className="bg-[#f5f6f8] rounded-lg border border-[#e5e7eb] shadow-2xs overflow-hidden transition-all">
            {/* Header: Click to expand / collapse */}
            <div
              onClick={() => setIsAdvancedOpen((prev) => !prev)}
              className={cn(
                "flex justify-between items-center p-4 cursor-pointer select-none transition-colors group",
                isAdvancedOpen ? "border-b border-[#e5e7eb] bg-gray-100/50" : "hover:bg-gray-100/60"
              )}
            >
              <h3 className="font-heading text-[15px] font-bold text-[#1e293b] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#c8102e]" />
                <span>Advanced Filter</span>
                {(activeStocks.length + activeBrands.length + activeFamilies.length + activeOptIds.length) > 0 ? (
                  <span className="bg-[#c8102e] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                    {activeStocks.length + activeBrands.length + activeFamilies.length + activeOptIds.length} active
                  </span>
                ) : (pendingStocks.length + pendingBrands.length + pendingFamilies.length + pendingOptIds.length) > 0 ? (
                  <span className="bg-red-100 text-[#c8102e] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                    {pendingStocks.length + pendingBrands.length + pendingFamilies.length + pendingOptIds.length} selected
                  </span>
                ) : null}
              </h3>

              <div className="flex items-center gap-2">
                {(activeStocks.length > 0 || activeBrands.length > 0 || activeFamilies.length > 0 || activeOptIds.length > 0) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearAdvancedFilters()
                    }}
                    className="text-[12px] text-[#c8102e] hover:underline font-semibold cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-transform duration-200",
                    isAdvancedOpen ? "rotate-180 text-[#c8102e]" : ""
                  )}
                />
              </div>
            </div>

            {isAdvancedOpen && (
              <div className="p-4 pt-3">
                <Accordion
                  type="multiple"
                  value={openAccordionValues}
                  onValueChange={setOpenAccordionValues}
                  className="space-y-3"
                >
                  {/* 1. Common Attributes (Stock Status & Brands) */}
                  <AccordionItem value="common-attributes" className="border-b border-gray-200/70 pb-3">
                    <AccordionTrigger className="font-heading text-[13.5px] font-bold text-[#334155] py-2 hover:no-underline">
                      Common Attributes
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 flex flex-col gap-4">
                      {/* Stock Availability */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          Stock Availability
                        </span>
                        <div className="flex flex-col gap-2 pl-0.5">
                          {stockStatusOptions.map((opt) => {
                            const isChecked = pendingStocks.includes(opt.value)
                            return (
                              <div key={opt.value} className="flex items-center gap-2.5">
                                <Checkbox
                                  id={`stock-${opt.value}`}
                                  checked={isChecked}
                                  className="data-[state=checked]:bg-[#c8102e] data-[state=checked]:border-[#c8102e] rounded-sm"
                                  onCheckedChange={(checked) => {
                                    let newStocks = [...pendingStocks]
                                    if (checked) {
                                      newStocks.push(opt.value)
                                    } else {
                                      newStocks = newStocks.filter(s => s !== opt.value)
                                    }
                                    setPendingStocks(newStocks)
                                  }}
                                />
                                <label
                                  htmlFor={`stock-${opt.value}`}
                                  className={cn(
                                    "text-[13px] cursor-pointer select-none",
                                    isChecked ? "font-bold text-[#c8102e]" : "text-[#475569] font-medium"
                                  )}
                                >
                                  {opt.label}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 2. Product Family Filter (Directly following Common Attributes) */}
                  <AccordionItem value="product-families" className="border-b border-gray-200/70 pb-2">
                    <AccordionTrigger className="font-heading text-[13.5px] font-bold text-[#334155] py-2 hover:no-underline">
                      Product Family {availableFamilies.length > 0 && `(${availableFamilies.length})`}
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 flex flex-col gap-2">
                      {availableFamilies.length > 6 && (
                        <div className="relative mb-1">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search product families..."
                            value={familySearchTerm}
                            onChange={(e) => setFamilySearchTerm(e.target.value)}
                            className="w-full text-[12px] pl-8 pr-2.5 py-1.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#c8102e] bg-white"
                          />
                        </div>
                      )}

                      <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-2">
                        {filteredFamilies.map((fam) => {
                          const famSlug = slugify(fam.name)
                          const isChecked = pendingFamilies.some(f =>
                            slugify(f) === famSlug || f === fam.name || f === fam.id.toString()
                          )
                          return (
                            <div key={fam.id} className="flex items-center justify-between py-0.5">
                              <div className="flex items-center gap-2 flex-1">
                                <Checkbox
                                  id={`adv-fam-${fam.id}`}
                                  checked={isChecked}
                                  className="data-[state=checked]:bg-[#c8102e] data-[state=checked]:border-[#c8102e] rounded-sm"
                                  onCheckedChange={(checked) => {
                                    let newFams = [...pendingFamilies]
                                    if (checked) {
                                      newFams.push(famSlug)
                                    } else {
                                      newFams = newFams.filter(f =>
                                        slugify(f) !== famSlug && f !== fam.name && f !== fam.id.toString()
                                      )
                                    }
                                    setPendingFamilies(newFams)
                                    setPendingOptIds([])
                                  }}
                                />
                                <label
                                  htmlFor={`adv-fam-${fam.id}`}
                                  className={cn(
                                    "text-[12.8px] cursor-pointer select-none",
                                    isChecked ? "font-bold text-[#c8102e]" : "text-[#475569] font-medium"
                                  )}
                                >
                                  {fam.name}
                                </label>
                              </div>
                              {fam.product_count !== undefined && fam.product_count > 0 && (
                                <span className="text-[10.5px] font-semibold text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded-sm">
                                  {fam.product_count}
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 3. Dynamic Product Family Config Filters (Shown ONLY when a product family is selected) */}
                  {pendingFamilies.length > 0 && contextualFilters.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-[#c8102e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                        Product Family Specs ({contextualFilters.length})
                      </div>

                      {contextualFilters.map((filter) => (
                        <AccordionItem
                          key={filter.filter_name}
                          value={`spec-${filter.filter_name}`}
                          className="border-b border-gray-200/70 pb-2"
                        >
                          <AccordionTrigger className="font-heading text-[13.5px] font-bold text-[#334155] py-2 hover:no-underline">
                            {filter.filter_name}
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 flex flex-col gap-2">
                            {filter.options.map((opt) => {
                              const isChecked = pendingOptIds.includes(opt.id)
                              return (
                                <div key={opt.id} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1">
                                    <Checkbox
                                      id={`opt-${opt.id}`}
                                      checked={isChecked}
                                      className="data-[state=checked]:bg-[#c8102e] data-[state=checked]:border-[#c8102e] rounded-sm"
                                      onCheckedChange={(checked) => {
                                        let newIds = [...pendingOptIds]
                                        if (checked) {
                                          newIds.push(opt.id)
                                        } else {
                                          newIds = newIds.filter(id => id !== opt.id)
                                        }
                                        setPendingOptIds(newIds)
                                      }}
                                    />
                                    <label
                                      htmlFor={`opt-${opt.id}`}
                                      className={cn(
                                        "text-[12.5px] cursor-pointer select-none",
                                        isChecked ? "font-bold text-[#c8102e]" : "text-[#475569]"
                                      )}
                                    >
                                      {opt.option_value}
                                    </label>
                                  </div>
                                  {opt.count !== undefined && (
                                    <span className="text-[11px] text-gray-400">
                                      ({opt.count})
                                    </span>
                                  )}
                                </div>
                              )
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </div>
                  )}

                  {/* 4. Searchable Brands Filter (Under Product Family Specs) */}
                  <AccordionItem value="brands" className="border-b border-gray-200/70 pb-2">
                    <AccordionTrigger className="font-heading text-[13.5px] font-bold text-[#334155] py-2 hover:no-underline">
                      Brands {brands.length > 0 && `(${brands.length})`}
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 flex flex-col gap-2">
                      {brands.length > 6 && (
                        <div className="relative mb-1">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search brands..."
                            value={brandSearchTerm}
                            onChange={(e) => setBrandSearchTerm(e.target.value)}
                            className="w-full text-[12px] pl-8 pr-2.5 py-1.5 border border-gray-200 rounded-sm focus:outline-none focus:border-[#c8102e] bg-white"
                          />
                        </div>
                      )}

                      <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-2 pl-0.5">
                        {filteredBrands.map((brandName) => {
                          const brandSlug = slugify(brandName)
                          const isChecked = pendingBrands.some(b =>
                            slugify(b) === brandSlug || b.toLowerCase() === brandName.toLowerCase()
                          )
                          return (
                            <div key={brandName} className="flex items-center justify-between py-0.5">
                              <div className="flex items-center gap-2 flex-1">
                                <Checkbox
                                  id={`brand-${brandName}`}
                                  checked={isChecked}
                                  className="data-[state=checked]:bg-[#c8102e] data-[state=checked]:border-[#c8102e] rounded-sm"
                                  onCheckedChange={(checked) => {
                                    let newBrands = [...pendingBrands]
                                    if (checked) {
                                      newBrands.push(brandSlug)
                                    } else {
                                      newBrands = newBrands.filter(b =>
                                        slugify(b) !== brandSlug && b.toLowerCase() !== brandName.toLowerCase()
                                      )
                                    }
                                    setPendingBrands(newBrands)
                                  }}
                                />
                                <label
                                  htmlFor={`brand-${brandName}`}
                                  className={cn(
                                    "text-[12.8px] cursor-pointer select-none",
                                    isChecked ? "font-bold text-[#c8102e]" : "text-[#475569] font-medium"
                                  )}
                                >
                                  {brandName}
                                </label>
                              </div>
                              <BrandBadge name={brandName} />
                            </div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Apply Filters & Discard Changes Button */}
                <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleApplyFilters}
                    className="w-full bg-[#c8102e] hover:bg-[#a80c25] text-white py-2.5 px-4 rounded-sm font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer hover:shadow-md active:scale-[0.99]"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Apply Filters</span>
                    {totalPendingCount > 0 && (
                      <span className="bg-white text-[#c8102e] text-[11px] font-extrabold px-2 py-0.5 rounded-full ml-1">
                        {totalPendingCount}
                      </span>
                    )}
                  </button>

                  {hasPendingChanges && (
                    <button
                      type="button"
                      onClick={handleResetPendingFilters}
                      className="w-full text-center text-[12px] text-gray-500 hover:text-gray-800 py-1 font-medium transition-colors cursor-pointer"
                    >
                      Discard Changes
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Catalog Main Content */}
        <main className="flex-1 min-w-0">

          {/* Single clean bar: Active filters on the left with red bullets, and bold red "Showing X of Y products" on the right */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 mb-4 text-[13px] text-[#222222] font-medium text-left">
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 flex-1 min-w-0">
              {/* 1. Stock */}
              {activeStocks.length > 0 && (
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e] shrink-0" />
                  <span className="text-[#222222]">
                    {activeStocks
                      .map((st) => (st === "in_stock" ? "In stock" : st.replace("_", " ")))
                      .join(", ")}
                  </span>
                </div>
              )}

              {/* 2. Brand */}
              {activeBrands.length > 0 && (
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e] shrink-0" />
                  <span className="text-[#222222]">Brand -</span>
                  <div className="inline-flex items-center gap-1.5 flex-wrap">
                    {activeBrands.map((b) => {
                      const brandMatch = brands.find(
                        (brand) => slugify(brand) === b || brand.toLowerCase() === b.toLowerCase()
                      )
                      const displayName = brandMatch || b
                      return <BrandBadge key={b} name={displayName} />
                    })}
                  </div>
                </div>
              )}

              {/* 3. Categories & Subcategories */}
              {(activeCats.length > 0 || activeSubs.length > 0) && (
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e] shrink-0" />
                  <span className="text-[#222222]">Categories -</span>
                  <span className="text-[#222222] font-medium">
                    {(() => {
                      const catNames = activeCats.map((c) => {
                        const found = navigationTree?.find(
                          (cat) => slugify(cat.name) === c || cat.name === c
                        )
                        return found?.name || c
                      })

                      const subNames = activeSubs.map((s) => {
                        for (const cat of navigationTree || []) {
                          const foundSub = cat.subcategories.find(
                            (sub) => slugify(sub.name) === s || sub.name === s
                          )
                          if (foundSub) return foundSub.name
                        }
                        return s
                      })

                      if (catNames.length > 0 && subNames.length > 0) {
                        return `${catNames.join(", ")} | ${subNames.join(", ")}`
                      }
                      if (catNames.length > 0) {
                        return catNames.join(", ")
                      }
                      return subNames.join(", ")
                    })()}
                  </span>
                </div>
              )}

              {/* 4. Product Family */}
              {activeFamilies.length > 0 && (
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e] shrink-0" />
                  <span className="text-[#222222]">Family -</span>
                  <span className="text-[#222222] font-medium">
                    {activeFamilies
                      .map((fam) => {
                        const famObj = allFamilies.find(
                          (f) => slugify(f.name) === fam || f.name.toLowerCase() === fam.toLowerCase()
                        )
                        return famObj ? famObj.name : fam
                      })
                      .join(", ")}
                  </span>
                </div>
              )}

              {/* 5. Dynamic Technical Specs */}
              {activeOptIds.length > 0 && (
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c8102e] shrink-0" />
                  <span className="text-[#222222]">Specs -</span>
                  <span className="text-[#222222] font-medium">
                    {activeOptIds
                      .map((optId) => {
                        for (const f of contextualFilters) {
                          const match = f.options.find((o) => o.id === optId)
                          if (match) {
                            return `${f.filter_name}: ${match.option_value}`
                          }
                        }
                        return `Option #${optId}`
                      })
                      .join(", ")}
                  </span>
                </div>
              )}

              {/* Clear All Link when filters active */}
              {/* {hasAnyFilterActive && (
                <button
                  onClick={clearAllFilters}
                  className="text-[12px] text-[#c8102e] hover:underline font-bold cursor-pointer shrink-0 ml-1"
                  title="Clear all active filters"
                >
                  Clear all &times;
                </button>
              )} */}
            </div>

            {/* Right: Bold Red "Showing X of Y products" exactly matching screenshot */}
            <div className="ml-auto shrink-0 text-right">
              <span className="text-[#c8102e] font-bold text-[13px] sm:text-[14px]">
                Showing {data?.data.length || 0} of {data?.pagination.total || 0} products
              </span>
            </div>
          </div>

          {/* Cards listing - 5 columns on big screen as requested */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
              {Array.from({ length: limit }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e5e7eb] rounded-sm h-[270px] flex flex-col justify-between overflow-hidden shadow-2xs"
                >
                  <Skeleton className="w-full aspect-[4/3] bg-[#f4f5f7] border-b border-[#e5e7eb]" />
                  <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-grow bg-white">
                    <div className="flex flex-col gap-1.5">
                      <Skeleton className="h-3 w-1/3 bg-gray-200" />
                      <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    </div>
                    <Skeleton className="h-7 w-full mt-2 bg-gray-200 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="bg-[#f5f6f8] rounded-sm border border-[#e5e7eb] py-20 px-6 text-center shadow-2xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-[#c8102e]">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-[18px] font-bold text-[#1e293b] mb-1">
                No products match the selected criteria
              </h4>
              <p className="text-[14px] text-[#64748b] max-w-md mx-auto mb-5">
                Try adjusting your category, product family, brand, stock status, or technical specifications.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#c8102e] hover:bg-[#a80c25] text-white px-6 py-2.5 rounded-lg text-[13.6px] font-bold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
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
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 border border-[#d1d5db] rounded-lg text-[12px] sm:text-[13px] font-bold bg-white text-[#555555] hover:border-[#c8102e] hover:text-[#c8102e] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                &larr; Prev
              </button>
              
              {Array.from({ length: data.pagination.totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-[11px] sm:text-[13px] font-bold cursor-pointer transition-colors ${
                    page === idx + 1
                      ? "bg-[#c8102e] text-white border border-[#c8102e]"
                      : "bg-white border border-[#d1d5db] text-[#555555] hover:border-[#c8102e] hover:text-[#c8102e]"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={page === data.pagination.totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 border border-[#d1d5db] rounded-lg text-[12px] sm:text-[13px] font-bold bg-white text-[#555555] hover:border-[#c8102e] hover:text-[#c8102e] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </main>
      </div>
      </div>
    </div>
  )
}
