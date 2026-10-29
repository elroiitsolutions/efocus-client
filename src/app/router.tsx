import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import HomePage from "@/features/home/pages/HomePage"
import ProductsPage from "@/features/products/pages/ProductsPage"
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage"
import CategoriesPage from "@/features/categories/pages/CategoriesPage"
import CategoryDetailsPage from "@/features/categories/pages/CategoryDetailsPage"
import SearchPage from "@/features/search/pages/SearchPage"
import QuotePage from "@/features/quote/pages/QuotePage"
import WishlistPage from "@/features/wishlist/pages/WishlistPage"
import ComparePage from "@/features/compare/pages/ComparePage"
import CustomAssemblyPage from "@/features/custom-assembly/pages/CustomAssemblyPage"
import BlogPage from "@/features/blog/pages/BlogPage"
import BlogDetailsPage from "@/features/blog/pages/BlogDetailsPage"
import ContactPage from "@/features/contact/pages/ContactPage"
import AboutPage from "@/features/about/pages/AboutPage"
import ProcurementSolutionsPage from "@/features/procurement/pages/ProcurementSolutionsPage"
import BomProcurementPage from "@/features/procurement/pages/BomProcurementPage"
import VendorConsolidationPage from "@/features/procurement/pages/VendorConsolidationPage"
import AnnualRateContractPage from "@/features/procurement/pages/AnnualRateContractPage"
import ProjectProcurementPage from "@/features/procurement/pages/ProjectProcurementPage"
import TurnkeyWorkstationsPage from "@/features/procurement/pages/TurnkeyWorkstationsPage"
import ElectronicsEmsPage from "@/features/industries/pages/ElectronicsEmsPage"
import AutomotiveEvPage from "@/features/industries/pages/AutomotiveEvPage"
import AerospaceDefencePage from "@/features/industries/pages/AerospaceDefencePage"
import ServicesPage from "@/features/services/pages/ServicesPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "procurement-solutions", element: <ProcurementSolutionsPage /> },
      { path: "solutions", element: <ProcurementSolutionsPage /> },
      { path: "procurement-solutions/bom-procurement", element: <BomProcurementPage /> },
      { path: "bom-procurement", element: <BomProcurementPage /> },
      { path: "procurement-solutions/vendor-consolidation", element: <VendorConsolidationPage /> },
      { path: "vendor-consolidation", element: <VendorConsolidationPage /> },
      { path: "procurement-solutions/annual-rate-contracts", element: <AnnualRateContractPage /> },
      { path: "annual-rate-contracts", element: <AnnualRateContractPage /> },
      { path: "procurement-solutions/project-procurement", element: <ProjectProcurementPage /> },
      { path: "project-procurement", element: <ProjectProcurementPage /> },
      { path: "procurement-solutions/turnkey-workstations", element: <TurnkeyWorkstationsPage /> },
      { path: "turnkey-workstations", element: <TurnkeyWorkstationsPage /> },
      { path: "industries/electronics-ems", element: <ElectronicsEmsPage /> },
      { path: "electronics-ems", element: <ElectronicsEmsPage /> },
      { path: "industries/automotive-ev-solutions", element: <AutomotiveEvPage /> },
      { path: "industries/automotive-ev", element: <AutomotiveEvPage /> },
      { path: "automotive-ev", element: <AutomotiveEvPage /> },
      { path: "industries/aerospace-defence", element: <AerospaceDefencePage /> },
      { path: "industries/aerospace-defense", element: <AerospaceDefencePage /> },
      { path: "aerospace-defence", element: <AerospaceDefencePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:slug", element: <ProductDetailsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "categories/:slug", element: <CategoryDetailsPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "quote", element: <QuotePage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "compare", element: <ComparePage /> },
      { path: "custom-assembly", element: <CustomAssemblyPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogDetailsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
])
