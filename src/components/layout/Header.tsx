import { useState, useRef, useEffect } from "react"
import { Menu, ChevronRight, Loader2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import HeaderSearch from "./HeaderSearch"
import HeaderActions from "./HeaderActions"
import { useNavigationTree } from "@/hooks/use-categories"
import { cn, slugify } from "@/lib/utils"

export default function Header() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false)
  const catDropdownRef = useRef<HTMLDivElement>(null)
  const { data: categories, isLoading } = useNavigationTree()

  // Close All Categories dropdown when clicking outside or changing route
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (catDropdownRef.current && !catDropdownRef.current.contains(event.target as Node)) {
        setIsCatDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setIsCatDropdownOpen(false)
  }, [location.pathname, location.search])

  // Navigation Links specified by user: "home , about us blog and contact us"
  const navLinks = [
    { label: "Home", href: "/" },
    {label: "Products", href:"/products"},
    { label: "About us", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ]

  return (
    <header className="border-b border-[#eaeaea] bg-white sticky top-0 z-40 shadow-2xs">
      {/* ── Row 2: Logo | Search (Searching for...) | Actions (Cart & Wishlist) ── */}
      <div className="site-container h-[66px] sm:h-[72px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-start shrink-0">
          <img
            src="/images/logo.png"
            alt="eFocus Industrial Solutions"
            className="h-7 sm:h-8 w-auto"
          />
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#777777] mt-0.5 pl-0.5 uppercase font-heading">
            INDUSTRIAL SOLUTIONS
          </span>
        </Link>

        {/* Center: Wide Search Bar */}
        <HeaderSearch />

        {/* Right Actions: Cart & Wishlist with red badges + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <HeaderActions />

          {/* Mobile Sheet Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center p-2 text-[#222222] hover:text-[#c8102e] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] overflow-y-auto bg-white p-5">
              <SheetHeader>
                <SheetTitle className="text-left flex flex-col items-start">
                  <img
                    src="/images/logo.png"
                    alt="eFocus Industrial Solutions"
                    className="h-7 w-auto"
                  />
                  <span className="text-[8.5px] font-bold tracking-[0.2em] text-[#777777] mt-1 pl-0.5 uppercase">
                    INDUSTRIAL SOLUTIONS
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Search */}
              <div className="mt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const input = form.querySelector("input") as HTMLInputElement
                    if (input?.value.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(input.value.trim())}`
                    } else {
                      window.location.href = `/products`
                    }
                  }}
                  className="flex items-center h-[38px] bg-[#f4f5f7] border border-[#e5e7eb] rounded-md px-3"
                >
                  <input
                    type="text"
                    placeholder="Searching for..."
                    className="flex-1 bg-transparent border-none outline-none text-[13px] text-[#222222]"
                  />
                </form>
              </div>

              <nav className="mt-5 space-y-1">
                {/* 4 Primary Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-2 text-[14px] font-semibold text-[#333333] hover:text-[#c8102e] transition-colors border-b border-gray-100"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Categories Header */}
                <div className="pt-4 pb-2 px-2 text-[11px] font-bold text-[#c8102e] uppercase tracking-wider">
                  Product Categories
                </div>

                {isLoading && (
                  <div className="flex items-center gap-2 py-3 px-2 text-[13px] text-gray-400">
                    <Loader2 size={14} className="animate-spin" />
                    Loading categories...
                  </div>
                )}

                {categories && categories.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    {categories.map((category) => (
                      <AccordionItem key={category.id} value={String(category.id)} className="border-b border-gray-100">
                        <AccordionTrigger className="py-2.5 px-2 text-[13.5px] font-medium text-[#333333] hover:text-[#c8102e] hover:no-underline">
                          {category.name}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-4">
                          {category.subcategories.length === 0 ? (
                            <p className="text-[12px] text-gray-400 italic px-2 py-1">
                              No subcategories yet
                            </p>
                          ) : (
                            <ul className="flex flex-col gap-1">
                              {category.subcategories.map((sub) => (
                                <li key={sub.id}>
                                  <Link
                                    to={`/products?subcategory=${slugify(sub.name)}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 py-1 px-2 rounded-sm text-[13px] text-[#555555] hover:bg-[#FFF1F2] hover:text-[#c8102e] transition-colors"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                          <Separator className="my-2" />
                          <Link
                            to={`/products?category=${slugify(category.name)}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[12.5px] font-bold text-[#c8102e] hover:underline px-2 inline-block"
                          >
                            View all {category.name} →
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                <div className="pt-6 border-t border-gray-100 px-2 flex flex-col gap-1.5 text-[12.5px] text-gray-500">
                  <a href="mailto:chandruravichandran1536@gmail.com" className="text-[#c8102e] font-semibold hover:underline">
                    chandruravichandran1536@gmail.com
                  </a>
                  <span>Direct Sales: +91 7397 242 650</span>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ── Row 3: Bottom Navigation Bar: [ ☰ All Categories > ]  Home  About us  Blog  Contact us ── */}
      <div className="border-t border-[#eaeaea] bg-white">
        <div className="site-container h-[50px] flex items-center gap-6 sm:gap-8">
          {/* All Categories Dropdown Button */}
          <div className="relative shrink-0" ref={catDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-md text-[13.5px] font-semibold text-[#222222] bg-[#f2f3f5] hover:bg-[#e7e9ec] transition-colors cursor-pointer select-none"
            >
              <Menu size={16} className="text-[#222222] stroke-[2.2]" />
              <span>All Categories</span>
              <ChevronRight
                size={15}
                className={cn(
                  "text-gray-500 transition-transform duration-200 stroke-[2]",
                  isCatDropdownOpen ? "rotate-90 text-[#c8102e]" : ""
                )}
              />
            </button>

            {/* All Categories Dropdown Menu */}
            {isCatDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#eaeaea] rounded-md shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3.5 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                  Product Categories
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {categories?.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${slugify(cat.name)}`}
                      onClick={() => setIsCatDropdownOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2 text-[13px] font-semibold text-[#333333] hover:bg-[#FFF1F2] hover:text-[#c8102e] transition-colors group"
                    >
                      <span>{cat.name}</span>
                      {cat.subcategories.length > 0 && (
                        <span className="text-[10px] font-bold bg-gray-100 group-hover:bg-[#FFE4E6] text-gray-500 group-hover:text-[#c8102e] px-1.5 py-0.5 rounded">
                          {cat.subcategories.length}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-1 pt-1.5 px-3.5">
                  <Link
                    to="/products"
                    onClick={() => setIsCatDropdownOpen(false)}
                    className="block py-1 text-[12.5px] font-bold text-[#c8102e] hover:underline"
                  >
                    Browse All Products &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links: Home, About us, Blog, Contact us */}
          <nav className="hidden md:flex items-center gap-6 sm:gap-8">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.href)

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "text-[14px] font-semibold transition-colors hover:text-[#c8102e] py-1",
                    isActive ? "text-[#c8102e] font-bold" : "text-[#333333]"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
