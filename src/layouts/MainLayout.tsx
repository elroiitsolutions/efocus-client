import { Outlet, ScrollRestoration } from "react-router-dom"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import QuoteDrawer from "@/features/quote/components/QuoteDrawer"
import ScrollToTop from "@/components/layout/ScrollToTop"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header />

      {/* Active Page View */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Quote Basket Drawer */}
      <QuoteDrawer />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />

      {/* React Router Scroll Restoration */}
      <ScrollRestoration />
    </div>
  )
}
