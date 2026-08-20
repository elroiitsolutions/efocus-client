import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"
import { slugify } from "@/lib/utils"

export default function HeaderSearch() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState("All Categories")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const catParam = category !== "All Categories" ? `&category=${slugify(category)}` : ""
      navigate(`/products?search=${encodeURIComponent(query.trim())}${catParam}`)
    } else {
      navigate(`/products`)
    }
  }

  const categories = [
    "All Categories",
    "SMT, Rework & Assembly",
    "Cables & Connectivity",
    "Tools & MRO",
    "Power & Electrical",
    "ESD & RF Control",
    "Testing & Measurement",
  ]

  return (
    <form
      onSubmit={handleSearch}
      className="flex-1 max-w-[580px] hidden md:flex items-center border border-[#d1d5db] rounded-[6px] overflow-hidden focus-within:border-[#B20602] transition-all bg-white"
    >
      {/* Category Dropdown */}
      <div className="relative">
        <div
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-[6.4px] px-4 text-[13.6px] font-semibold text-[#555555] bg-[#f4f5f8] border-r border-[#d1d5db] h-11 cursor-pointer select-none whitespace-nowrap"
        >
          <span>{category}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {isDropdownOpen && (
          <ul className="absolute top-12 left-0 w-64 bg-white border border-[#d1d5db] rounded-[6px] shadow-lg z-50 py-1 text-[13.6px] font-medium text-[#222222]">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setCategory(cat)
                  setIsDropdownOpen(false)
                }}
                className="px-4 py-2 hover:bg-[#B20602] hover:text-white cursor-pointer transition-colors"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search 47 Stocked Lines (e.g. TST-001, Coaxial, SMT, M12)..."
        className="flex-1 border-none outline-none px-4 text-[14.4px] h-11 min-w-0"
        aria-label="Search components"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-[#B20602] hover:bg-[#900502] text-white w-12 h-11 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
        aria-label="Submit search"
      >
        <Search size={18} strokeWidth={2.5} />
      </button>
    </form>
  )
}
