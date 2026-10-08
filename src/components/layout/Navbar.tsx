import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NexChipIcon } from "@/components/ui/NexIcons";
import { useQuoteStore } from "@/features/quote/store/quote.store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { useCompareStore } from "@/features/compare/store/compare.store";
import {
  Search,
  ChevronDown,
  UploadCloud,
  Heart,
  ArrowLeftRight,
  Cpu,
  Cable,
  Zap,
  Gauge,
  Radio,
  Wrench,
  Monitor,
  Tag,
  Boxes,
  Layers,
  FileCheck,
  FolderGit2,
  Hammer,
  Repeat,
  Sliders,
  Settings,
  ShieldCheck,
  PlayCircle,
  GraduationCap,
  Car,
  Plane,
  Microchip,
  TowerControl,
  Flame,
  Factory,
  Stethoscope,
  BookOpen,
  Newspaper,
  Award,
  Info,
  Phone,
  X,
  Sparkles,
  FileText,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isProductPage = location.pathname.startsWith("/products") || location.pathname.startsWith("/compare");
  const quoteItems = useQuoteStore((state) => state.items);
  const openQuoteDrawer = useQuoteStore((state) => state.openDrawer);
  const totalQuoteCount = quoteItems.reduce((sum, item) => sum + item.qty, 0);
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;
  const compareItems = useCompareStore((state) => state.items);
  const compareCount = compareItems.length;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger procurement modal from nav
  const handleOpenProcurement = (mode: "quote" | "bom" = "quote") => {
    window.dispatchEvent(
      new CustomEvent("open-procurement-modal", { detail: { mode } })
    );
    setMobileMenuOpen(false);
  };

  // Keyboard shortcut (⌘K or Ctrl+K) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll and coordinate with Lenis when search or mobile sidebar is open
  useEffect(() => {
    if (isSearchOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isSearchOpen, mobileMenuOpen]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Navigation Data Structure with exact application routes and pre-filtering
  const navData = {
    products: [
      { name: "SMT, Rework & Assembly", icon: Cpu, desc: "Pick & place, reflow, stencil printers & rework stations", href: "/products?category=smt-rework-assembly" },
      { name: "Cables & Connectivity", icon: Cable, desc: "Industrial wire harnesses, RF jumpers & high-speed connectors", href: "/products?category=cables-connectivity" },
      { name: "Power & Electrical", icon: Zap, desc: "Programmable DC sources, electronic loads & power supplies", href: "/products?category=power-electrical" },
      { name: "Testing & Measurement", icon: Gauge, desc: "Digital oscilloscopes, spectrum analyzers & multimeters", href: "/products?category=testing-measurement" },
      { name: "ESD & RF", icon: Radio, desc: "Cleanroom static protection, shielding & RF enclosures", href: "/products?category=esd-rf" },
      { name: "Tools & MRO", icon: Wrench, desc: "Precision torque drivers, crimpers & maintenance consumables", href: "/products?category=tools-mro" },
      { name: "IT Hardware & Workstations", icon: Monitor, desc: "Ergonomic ESD workbenches, servers & rugged edge computing", href: "/products?category=it-hardware-workstation" },
      { name: "Labelling & Identification", icon: Tag, desc: "High-temp polyimide PCB labels & industrial barcode printers", href: "/products?category=labelling-identification" },
    ],
    solutions: [
      { name: "BOM Procurement", icon: Boxes, desc: "Full bill-of-materials line matching with guaranteed pricing", action: () => handleOpenProcurement("bom") },
      { name: "Vendor Consolidation", icon: Layers, desc: "Single PO invoicing for 100+ hardware and tooling brands", href: "/custom-assembly" },
      { name: "Annual Rate Contracts", icon: FileCheck, desc: "Fixed volume pricing with buffer stock indexing for 12 months", href: "/quote" },
      { name: "Project Procurement", icon: FolderGit2, desc: "End-to-end procurement management for NPI & mass production", href: "/custom-assembly" },
      { name: "Turnkey Workstations", icon: Hammer, desc: "Complete production line setup including ESD & assembly tools", href: "/products?category=it-hardware-workstation" },
      { name: "Recurring Procurement", icon: Repeat, desc: "Automated replenishment workflows for high-wear consumables", href: "/quote" },
    ],
    services: [
      { name: "Application Engineering", icon: Sliders, desc: "Component cross-referencing and technical consultation", href: "/contact" },
      { name: "Calibration", icon: Settings, desc: "NABL/ISO traceable calibration with digital test certificates", href: "/products?category=testing-measurement" },
      { name: "AMC & Repair", icon: Wrench, desc: "Annual maintenance contracts & authorized repair center", href: "/contact" },
      { name: "Installation & Setup", icon: ShieldCheck, desc: "On-site commissioning, machine alignment & line testing", href: "/contact" },
      { name: "Product Demo", icon: PlayCircle, desc: "Hands-on evaluation and trial units at your facility", href: "/contact" },
      { name: "Technical Training", icon: GraduationCap, desc: "IPC standard training for operators & assembly engineers", href: "/contact" },
    ],
    industries: [
      { name: "Electronics & EMS", icon: Cpu, desc: "High-yield SMT assembly, box-build & testing", href: "/products?search=Electronics" },
      { name: "Automotive & EV", icon: Car, desc: "AEC-Q components, battery testing & wire harnesses", href: "/products?search=Automotive" },
      { name: "Aerospace & Defense", icon: Plane, desc: "MIL-spec reliability, radar testing & ruggedized systems", href: "/products?search=Aerospace" },
      { name: "Semiconductor", icon: Microchip, desc: "Cleanroom ESD, wafer handling & precision metrology", href: "/products?search=Semiconductor" },
      { name: "Telecom & RF", icon: TowerControl, desc: "5G base station testing, antennas & microwave cables", href: "/products?search=Telecom" },
      { name: "Power & Energy", icon: Flame, desc: "Grid monitoring, solar inverters & switchgear tools", href: "/products?search=Power" },
      { name: "Industrial Automation", icon: Factory, desc: "PLC cabling, industrial robotics & sensors", href: "/products?search=Automation" },
      { name: "Pharma & Medical", icon: Stethoscope, desc: "Medical device assembly, cleanroom equipment & ISO standard tools", href: "/products?search=Medical" },
    ],
    resources: [
      { name: "Engineering Insights", icon: BookOpen, desc: "Deep technical papers on SMT yield, ESD control & RF design", href: "/blog" },
      { name: "Blogs", icon: Newspaper, desc: "Latest trends in electronics manufacturing & supply chain agility", href: "/blog" },
      { name: "News", icon: Sparkles, desc: "eFocus company updates, new brand partnerships & event showcases", href: "/blog" },
      { name: "Case Studies", icon: Award, desc: "Real-world procurement & workstation optimization stories", href: "/blog" },
    ],
    company: [
      { name: "About us", icon: Info, href: "/about" },
      { name: "Contact us", icon: Phone, href: "/contact" },
    ],
  };

  // Search filter logic
  const allSearchableItems: Array<{
    name: string;
    icon: typeof Cpu;
    // desc: string;
    category: string;
    href?: string;
    action?: () => void;
  }> = [
    ...navData.products.map(i => ({ ...i, category: "Products", href: i.href })),
    ...navData.solutions.map(i => ({ ...i, category: "Procurement Solutions", href: i.href || "/quote", action: i.action })),
    ...navData.services.map(i => ({ ...i, category: "Services", href: i.href })),
    ...navData.industries.map(i => ({ ...i, category: "Industries", href: i.href })),
    ...navData.resources.map(i => ({ ...i, category: "Resources", href: i.href })),
    ...navData.company.map(i => ({ ...i, category: "Company", href: i.href })),
  ];

  const searchResults = searchQuery.trim() === "" 
    ? allSearchableItems.slice(0, 6)
    : allSearchableItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
        <div className="w-full max-w-[102rem] mx-auto pointer-events-auto">
          <nav className="w-full bg-white/95 backdrop-blur-md rounded-full px-3.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 border-[5px] border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-1.5 lg:gap-2">
            
            {/* 1. Official Logo (eFocus) */}
            <Link to="/" className="flex items-center gap-2 group shrink-0 pl-1">
              <img
                src="/logo.png"
                alt="eFocus Logo"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            {/* 2. Desktop Main Navigation Links */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4.5 2xl:gap-6 text-[13px] xl:text-[13.5px] font-medium text-gray-700">
              
              {/* Products Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => handleMouseEnter("products")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/products"
                  className={`flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 ${activeDropdown === "products" ? "text-red-600 font-semibold" : ""}`}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-red-600" : "text-gray-400 group-hover:text-gray-700"}`} />
                </Link>

                <div 
                  className={`absolute top-full -left-12 xl:-left-20 w-[580px] xl:w-[620px] pt-3 z-50 transition-all duration-200 ${
                    activeDropdown === "products" 
                      ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 px-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Electronic & Industrial Product Lines</span>
                      <Link 
                        to="/products"
                        className="text-xs font-medium text-red-600 hover:underline cursor-pointer" 
                        onClick={() => {
                          setActiveDropdown(null);
                        }}
                      >
                        All Products →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {navData.products.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => handleMouseEnter("solutions")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 ${activeDropdown === "solutions" ? "text-red-600 font-semibold" : ""}`}
                >
                  <span>Procurement Solutions</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180 text-red-600" : "text-gray-400 group-hover:text-gray-700"}`} />
                </button>

                <div 
                  className={`absolute top-full -left-20 xl:-left-32 w-[540px] xl:w-[580px] pt-3 z-50 transition-all duration-200 ${
                    activeDropdown === "solutions" 
                      ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 px-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">B2B Procurement Models</span>
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">SLA Guaranteed</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {navData.solutions.map((item, idx) => {
                        const Icon = item.icon;
                        if (item.action) {
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setActiveDropdown(null);
                                item.action?.();
                              }}
                              className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item text-left w-full cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                                  {item.name}
                                </h4>
                                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={idx}
                            to={item.href || "/quote"}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 ${activeDropdown === "services" ? "text-red-600 font-semibold" : ""}`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180 text-red-600" : "text-gray-400 group-hover:text-gray-700"}`} />
                </button>

                <div 
                  className={`absolute top-full -left-20 xl:-left-28 w-[520px] xl:w-[560px] pt-3 z-50 transition-all duration-200 ${
                    activeDropdown === "services" 
                      ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 px-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Engineering & Support Hub</span>
                      <span className="text-xs text-gray-500 font-medium">NABL Accredited Partners</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {navData.services.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Industries Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => handleMouseEnter("industries")}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className={`flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 ${activeDropdown === "industries" ? "text-red-600 font-semibold" : ""}`}
                >
                  <span>Industries</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "industries" ? "rotate-180 text-red-600" : "text-gray-400 group-hover:text-gray-700"}`} />
                </button>

                <div 
                  className={`absolute top-full -left-28 xl:-left-40 w-[580px] xl:w-[620px] pt-3 z-50 transition-all duration-200 ${
                    activeDropdown === "industries" 
                      ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 px-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Sector Specializations</span>
                      <span className="text-xs text-blue-600 font-medium">Domain-Specific Standards</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {navData.industries.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => handleMouseEnter("resources")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/blog"
                  className={`flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 ${activeDropdown === "resources" ? "text-red-600 font-semibold" : ""}`}
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180 text-red-600" : "text-gray-400 group-hover:text-gray-700"}`} />
                </Link>

                <div 
                  className={`absolute top-full -left-20 xl:-left-24 w-[420px] pt-3 z-50 transition-all duration-200 ${
                    activeDropdown === "resources" 
                      ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                    <div className="space-y-1">
                      {navData.resources.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => handleMouseEnter("company")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/about"
                  className={`flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 ${activeDropdown === "company" ? "text-red-600 font-semibold" : ""}`}
                >
                  <span>Company</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180 text-red-600" : "text-gray-400 group-hover:text-gray-700"}`} />
                </Link>

                <div 
                  className={`absolute top-full -left-12 w-[340px] pt-3 z-50 transition-all duration-200 ${
                    activeDropdown === "company" 
                      ? "opacity-100 visible translate-y-0 pointer-events-auto" 
                      : "opacity-0 invisible -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)] space-y-1">
                    {navData.company.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50/90 transition-colors group/item"
                        >
                          <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 group-hover/item:bg-red-50 group-hover/item:text-red-600 flex items-center justify-center shrink-0 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 group-hover/item:text-red-600 transition-colors leading-tight">
                              {item.name}
                            </h4>
                            {/* <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                              {item.desc}
                            </p> */}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* 3. Right Action Area: Search Trigger + Upload BOM + Quote Basket + Get a Quote */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Search Modal Trigger (⌘K) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center sm:justify-start gap-1.5 h-9 w-9 sm:w-auto px-2 sm:px-3 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-500 hover:text-gray-900 text-xs transition-colors cursor-pointer shrink-0"
                title="Search (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5 text-gray-600" />
                <span className="hidden 2xl:inline text-[12px] font-medium text-gray-500">Search products, MPNs...</span>
                <span className="hidden xl:inline 2xl:hidden text-[12px] font-medium text-gray-500">Search...</span>
                <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-gray-500 border border-gray-200 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Upload BOM Pill Button */}
              <button
                type="button"
                onClick={() => handleOpenProcurement("bom")}
                className="hidden xl:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-red-50 hover:bg-red-100/80 text-red-600 hover:text-red-700 text-xs xl:text-[13px] font-semibold transition-all border border-red-200/80 shadow-2xs cursor-pointer shrink-0"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload BOM</span>
              </button>

              {/* Wishlist Icon Button */}
              <Link
                to="/wishlist"
                className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer shrink-0"
                title="View Wishlist"
                aria-label="View Wishlist"
              >
                <Heart className="w-4 h-4 text-gray-700 hover:text-red-600 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#AF0202] text-white text-[10px] font-bold shadow-xs animate-in zoom-in-50 duration-200">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Compare Icon Button (Only shown on product & compare pages) */}
              {isProductPage && (
                <Link
                  to="/compare"
                  className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer shrink-0 animate-in fade-in zoom-in-90 duration-150"
                  title="Compare Products"
                  aria-label="Compare Products"
                >
                  <ArrowLeftRight className="w-4 h-4 text-gray-700 hover:text-red-600 transition-colors" />
                  {compareCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#AF0202] text-white text-[10px] font-bold shadow-xs animate-in zoom-in-50 duration-200">
                      {compareCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Quote Basket Drawer Trigger */}
              <button
                type="button"
                onClick={openQuoteDrawer}
                className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer shrink-0"
                title="View Quote Basket"
                aria-label="View Quote Basket"
              >
                <FileText className="w-4 h-4 text-gray-700" />
                {totalQuoteCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#AF0202] text-white text-[10px] font-bold shadow-xs animate-in zoom-in-50 duration-200">
                    {totalQuoteCount}
                  </span>
                )}
              </button>

              {/* Get a Quote Action Button (Only on Home Page, with signature icon swap animation & safe fit inside header) */}
              {isHomePage && (
                <button
                  type="button"
                  onClick={() => handleOpenProcurement("quote")}
                  className="hidden sm:inline-flex group nex-button-swap-nav items-center justify-center rounded-full bg-[#111315] hover:bg-black text-white text-xs xl:text-[13px] font-semibold transition-all shadow-sm cursor-pointer shrink-0 mr-1"
                >
                  <NexChipIcon className="w-[30px] h-[30px]" />
                  <span className="whitespace-nowrap leading-none">Get a Quote</span>
                </button>
              )}

              {/* Mobile Menu Hamburger Button (Always visible on mobile & tablet) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>

            </div>

          </nav>
        </div>
      </header>

      {/* Mobile Navigation Sidebar Drawer (Radix Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          data-lenis-prevent="true"
          className="w-[320px] sm:w-[380px] max-w-[88vw] p-0 flex flex-col bg-white z-[100] border-l border-gray-100 shadow-2xl"
        >
          <SheetHeader className="p-5 border-b border-gray-100 flex flex-row items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src="/logo.png" alt="eFocus Logo" className="h-7 w-auto object-contain" />
            </Link>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" data-lenis-prevent="true">
            {/* Quick Action Procurement CTAs */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => handleOpenProcurement("quote")}
                className="w-full py-2.5 px-4 rounded-full bg-[#111315] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <NexChipIcon />
                <span>Get Instant Quote</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenProcurement("bom")}
                className="w-full py-2.5 px-4 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs flex items-center justify-center gap-2 border border-red-200 transition-colors cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload BOM Spreadsheet</span>
              </button>
            </div>



            {/* Search Trigger inside drawer */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-medium transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-500" />
                Search parts, MPNs, solutions...
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-gray-400 border border-gray-200">
                ⌘K
              </kbd>
            </button>

            {/* Accordion Navigation Groups */}
            <div className="space-y-1 divide-y divide-gray-100 text-sm font-medium text-gray-800 border-t border-gray-100 pt-2">
              
              {/* Products Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveMobileAccordion(activeMobileAccordion === "products" ? null : "products")}
                  className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                >
                  <span className="font-semibold text-gray-900">Products</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileAccordion === "products" ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {activeMobileAccordion === "products" && (
                  <div className="pl-2 pt-1 pb-2 space-y-2 text-xs">
                    {navData.products.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      to="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-red-600 font-bold hover:underline"
                    >
                      View All Products →
                    </Link>
                  </div>
                )}
              </div>

              {/* Solutions Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveMobileAccordion(activeMobileAccordion === "solutions" ? null : "solutions")}
                  className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                >
                  <span className="font-semibold text-gray-900">Procurement Solutions</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileAccordion === "solutions" ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {activeMobileAccordion === "solutions" && (
                  <div className="pl-2 pt-1 pb-2 space-y-2 text-xs">
                    {navData.solutions.map((item, i) => {
                      if (item.action) {
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              item.action?.();
                            }}
                            className="block w-full text-left py-1.5 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            {item.name}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={i}
                          to={item.href || "/quote"}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Services Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveMobileAccordion(activeMobileAccordion === "services" ? null : "services")}
                  className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                >
                  <span className="font-semibold text-gray-900">Services</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileAccordion === "services" ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {activeMobileAccordion === "services" && (
                  <div className="pl-2 pt-1 pb-2 space-y-2 text-xs">
                    {navData.services.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveMobileAccordion(activeMobileAccordion === "industries" ? null : "industries")}
                  className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                >
                  <span className="font-semibold text-gray-900">Industries</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileAccordion === "industries" ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {activeMobileAccordion === "industries" && (
                  <div className="pl-2 pt-1 pb-2 space-y-2 text-xs">
                    {navData.industries.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveMobileAccordion(activeMobileAccordion === "resources" ? null : "resources")}
                  className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                >
                  <span className="font-semibold text-gray-900">Resources</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileAccordion === "resources" ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {activeMobileAccordion === "resources" && (
                  <div className="pl-2 pt-1 pb-2 space-y-2 text-xs">
                    {navData.resources.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Company Mobile */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveMobileAccordion(activeMobileAccordion === "company" ? null : "company")}
                  className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                >
                  <span className="font-semibold text-gray-900">Company</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileAccordion === "company" ? "rotate-180 text-red-600" : ""}`} />
                </button>
                {activeMobileAccordion === "company" && (
                  <div className="pl-2 pt-1 pb-2 space-y-2 text-xs">
                    {navData.company.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Direct Contact Footer */}
            <div className="pt-4 pb-2 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-500">
              <div className="font-semibold text-gray-900">Direct Support & Sourcing</div>
              <a href="mailto:sales@efocus.in" className="text-red-600 font-semibold hover:underline">
                sales@efocus.in
              </a>
              <span>Direct Sales: +91 7397 242 650</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Global Interactive Search Modal / Palette */}
      {isSearchOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-[90] flex items-start justify-center pt-24 sm:pt-28 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSearchOpen(false);
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div 
            data-lenis-prevent="true"
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, MPNs, solutions, services, or industries... (Press Enter to search)"
                className="w-full text-base text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded bg-gray-100 text-xs font-mono text-gray-500 border border-gray-200">
                ESC
              </kbd>
            </form>

            {/* Quick Filter Categories */}
            <div className="px-5 py-2.5 bg-gray-50/80 border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs text-gray-600">
              <span className="text-gray-400 font-medium">Quick filter:</span>
              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate("/products?category=smt-assembly-rework");
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-red-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                SMT Assembly
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  handleOpenProcurement("bom");
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-red-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                BOM Procurement
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate("/products?category=test-measurement");
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-red-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                Calibration
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate("/products?category=test-measurement");
                }}
                className="px-2.5 py-1 rounded-full bg-white border border-gray-200 hover:border-red-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                Test & Measurement
              </button>
            </div>

            {/* Results List */}
            <div className="p-3 max-h-96 overflow-y-auto space-y-1">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        if (item.action) {
                          item.action();
                        } else if (item.href) {
                          navigate(item.href);
                        }
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-red-50 text-gray-700 group-hover:text-red-600 flex items-center justify-center transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {item.category}
                            </span>
                          </div>
                          {/* <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.desc}</p> */}
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-300 -rotate-90 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center space-y-2">
                  <p className="text-sm font-medium text-gray-700">No exact matches for &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-gray-500">
                    Can&apos;t find your part? Upload your BOM to our Quick Procurement Desk for human sourcing.
                  </p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      handleOpenProcurement("bom");
                    }}
                    className="mt-3 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Upload BOM to Quick Desk
                  </button>
                </div>
              )}
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                Over 50,000+ electronic & industrial lines supported
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  handleOpenProcurement("quote");
                }}
                className="font-semibold text-red-600 hover:underline cursor-pointer"
              >
                Instant RFQ Desk →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
