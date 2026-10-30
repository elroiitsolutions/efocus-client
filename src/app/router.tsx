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
import ProcurementSolutionsPage from "@/features/procurement/ProcurementSolutionsPage"
import BomProcurementPage from "@/features/procurement/BomProcurementPage"
import VendorConsolidationPage from "@/features/procurement/VendorConsolidationPage"
import AnnualRateContractPage from "@/features/procurement/AnnualRateContractPage"
import ProjectProcurementPage from "@/features/procurement/ProjectProcurementPage"
import TurnkeyWorkstationsPage from "@/features/procurement/TurnkeyWorkstationsPage"
import ElectronicsEmsPage from "@/features/industries/ElectronicsEmsPage"
import AutomotiveEvPage from "@/features/industries/AutomotiveEvPage"
import AerospaceDefencePage from "@/features/industries/AerospaceDefencePage"
import SemiconductorPage from "@/features/industries/SemiconductorPage"
import TelecomRfPage from "@/features/industries/TelecomRfPage"
import PowerEnergyPage from "@/features/industries/PowerEnergyPage"
import ServicesPage from "@/features/services/ServicesPage"

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
      { path: "industries/electronics-and-ems-solutions", element: <ElectronicsEmsPage /> },
      { path: "industries/electronics-ems", element: <ElectronicsEmsPage /> },
      { path: "electronics-and-ems-solutions", element: <ElectronicsEmsPage /> },
      { path: "electronics-ems", element: <ElectronicsEmsPage /> },
      { path: "industries/automotive-ev-solutions", element: <AutomotiveEvPage /> },
      { path: "industries/automotive-ev", element: <AutomotiveEvPage /> },
      { path: "automotive-ev", element: <AutomotiveEvPage /> },
      { path: "industries/aerospace-defence-solutions", element: <AerospaceDefencePage /> },
      { path: "industries/aerospace-defence", element: <AerospaceDefencePage /> },
      { path: "industries/aerospace-defense", element: <AerospaceDefencePage /> },
      { path: "aerospace-defence-solutions", element: <AerospaceDefencePage /> },
      { path: "aerospace-defence", element: <AerospaceDefencePage /> },
      { path: "industries/semiconductor-test-and-measurement-solutions", element: <SemiconductorPage /> },
      { path: "industries/semiconductor", element: <SemiconductorPage /> },
      { path: "semiconductor-test-and-measurement-solutions", element: <SemiconductorPage /> },
      { path: "semiconductor", element: <SemiconductorPage /> },
      { path: "industries/telecom-rf-test-solutions", element: <TelecomRfPage /> },
      { path: "industries/telecom-rf", element: <TelecomRfPage /> },
      { path: "telecom-rf-test-solutions", element: <TelecomRfPage /> },
      { path: "telecom-rf", element: <TelecomRfPage /> },
      { path: "industries/power-energy-test-solutions", element: <PowerEnergyPage /> },
      { path: "industries/power-energy", element: <PowerEnergyPage /> },
      { path: "power-energy-test-solutions", element: <PowerEnergyPage /> },
      { path: "power-energy", element: <PowerEnergyPage /> },
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
