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
import CustomAssemblyPage from "@/features/custom-assembly/pages/CustomAssemblyPage"
import BlogPage from "@/features/blog/pages/BlogPage"
import BlogDetailsPage from "@/features/blog/pages/BlogDetailsPage"
import ContactPage from "@/features/contact/pages/ContactPage"
import AboutPage from "@/features/about/pages/AboutPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:slug", element: <ProductDetailsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "categories/:slug", element: <CategoryDetailsPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "quote", element: <QuotePage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "custom-assembly", element: <CustomAssemblyPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogDetailsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
])
