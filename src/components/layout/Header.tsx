import { useState } from "react"
import { Menu, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import HeaderSearch from "./HeaderSearch"
import HeaderActions from "./HeaderActions"
import { useNavigationTree } from "@/hooks/use-categories"
import { slugify } from "@/lib/utils"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: categories, isLoading } = useNavigationTree()

  return (
    <header className="border-b border-[#eaeaea] bg-white sticky top-0 z-40">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-start shrink-0">
          <img
            src="/images/logo.png"
            alt="eFocus Industrial Solutions"
            className="h-9 sm:h-10 w-auto"
          />
          <span className="text-[10.4px] font-bold tracking-[0.2em] text-[#777777] mt-1.5 pl-0.5">
            INDUSTRIAL SOLUTIONS
          </span>
        </Link>

        {/* Search Input - Desktop */}
        <HeaderSearch />

        {/* Action Items & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <HeaderActions />

          {/* Mobile Sheet Menu with Accordion subcategories */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="flex flex-col gap-1.5 p-2 bg-none border-none cursor-pointer text-[#222222] hover:text-[#B20602] transition-colors"
                aria-label="Toggle navigation menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px] overflow-y-auto bg-white">
              <SheetHeader>
                <SheetTitle className="text-left flex flex-col items-start">
                  <img
                    src="/images/logo.png"
                    alt="eFocus Industrial Solutions"
                    className="h-7 w-auto"
                  />
                  <span className="text-[8.5px] font-bold tracking-[0.2em] text-[#777777] mt-1 pl-0.5">
                    INDUSTRIAL SOLUTIONS
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6">
                {/* Home Link */}
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-2 text-[16px] font-semibold text-[#222222] hover:text-[#B20602] transition-colors border-b border-[#eaeaea]"
                >
                  Home
                </Link>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center gap-2 py-4 px-2 text-[13px] text-[#999999]">
                    <Loader2 size={14} className="animate-spin" />
                    Loading categories...
                  </div>
                )}

                {/* Category Accordions with subcategories — from backend */}
                {categories && categories.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    {categories.map((category) => (
                      <AccordionItem key={category.id} value={String(category.id)} className="border-b border-[#eaeaea]">
                        <AccordionTrigger className="py-3 px-2 text-[15px] font-semibold text-[#222222] hover:text-[#B20602] hover:no-underline">
                          {category.name}
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-4">
                          {category.subcategories.length === 0 ? (
                            <p className="text-[13px] text-[#999999] italic px-2 py-2">
                              No subcategories yet
                            </p>
                          ) : (
                            <ul className="flex flex-col gap-1">
                              {category.subcategories.map((sub) => (
                                <li key={sub.id}>
                                  <Link
                                    to={`/products?subcategory=${slugify(sub.name)}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 py-2 px-2 rounded-[4px] text-[13.6px] font-medium text-[#555555] hover:bg-[#FFF0F0] hover:text-[#B20602] transition-colors"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#d1d5db] shrink-0" />
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
                            className="text-[13px] font-bold text-[#B20602] hover:text-[#900502] px-2 transition-colors"
                          >
                            View all {category.name} →
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {/* Custom & Assembly */}
                <Link
                  to="/custom-assembly"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-2 text-[15px] font-medium text-[#222222] hover:text-[#B20602] transition-colors border-b border-[#eaeaea]"
                >
                  Custom & Assembly
                </Link>

                {/* My Wishlist */}
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-2 text-[15px] font-medium text-[#222222] hover:text-[#B20602] transition-colors border-b border-[#eaeaea]"
                >
                  My Wishlist
                </Link>

                {/* Contact Info */}
                <div className="mt-6 pt-4 border-t border-[#eaeaea] px-2 flex flex-col gap-2">
                  <a
                    href="mailto:chandruravichandran1536@gmail.com"
                    className="text-[14px] text-[#555555] hover:text-[#B20602] transition-colors"
                  >
                    chandruravichandran1536@gmail.com
                  </a>
                  <a
                    href="tel:+917397242650"
                    className="text-[14px] text-[#555555] hover:text-[#B20602] transition-colors"
                  >
                    +91 7397 242 650
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar — visible only on small screens */}
      <div className="md:hidden px-3 pb-3 bg-white border-t border-[#f0f0f0]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.currentTarget.querySelector("input") as HTMLInputElement
            if (input?.value.trim()) {
              window.location.href = `/products?search=${encodeURIComponent(input.value.trim())}`
            }
          }}
          className="flex items-center border border-[#d1d5db] rounded-[6px] overflow-hidden focus-within:border-[#B20602] transition-all bg-white"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 border-none outline-none px-3 text-[13px] h-9 min-w-0"
            aria-label="Mobile search"
          />
          <button
            type="submit"
            className="bg-[#B20602] hover:bg-[#900502] text-white w-10 h-9 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </form>
      </div>
    </header>
  )
}
