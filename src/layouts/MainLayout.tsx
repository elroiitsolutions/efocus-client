import { Outlet, useLocation } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SmoothScroll from "@/components/common/SmoothScroll"
import ScrollProgress from "@/components/common/ScrollProgress"
import ScrollAnimations from "@/components/common/ScrollAnimations"
import QuickProcurementStickyButton from "@/components/procurement/QuickProcurementStickyButton"
import ScrollToTop from "@/components/layout/ScrollToTop"
import QuoteDrawer from "@/features/quote/components/QuoteDrawer"

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#fbfcfd] text-[#0d0f11] selection:bg-red-500 selection:text-white flex flex-col">
      {/* Lenis Smooth Momentum Scroll Engine */}
      <SmoothScroll />

      {/* GSAP Scroll Animations */}
      <ScrollAnimations />

      {/* Reading Top Progress Indicator */}
      <ScrollProgress />

      {/* Global Interactive Mega Navbar with Ctrl+K Quick Search */}
      <Navbar />

      {/* Floating Bottom-Right Action Suite: Scroll To Top (Above) + Quick Procurement Desk */}
      <aside 
        aria-label="Floating action controls"
        className="fixed bottom-20 right-3 sm:bottom-16 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none"
      >
        <ScrollToTop />
        <QuickProcurementStickyButton className="pointer-events-auto" />
      </aside>

      {/* Active Page View (with top padding on subpages to clear the floating navbar) */}
      <main className={`flex-grow w-full flex flex-col items-center ${!isHomePage ? "pt-24 sm:pt-28" : ""}`}>
        <Outlet />
      </main>

      {/* 5-Column Industrial Footer */}
      <Footer />

      {/* Slide-over Quote Basket Drawer */}
      <QuoteDrawer />
    </div>
  )
}
