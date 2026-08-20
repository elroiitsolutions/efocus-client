/**
 * Shared TypeScript interfaces for backend API responses.
 */

// ─── Category Navigation Tree (GET /api/categories/navigation) ───

export interface NavSubcategory {
  id: number
  name: string
  description: string | null
  featured_products: NavFeaturedProduct[]
}

export interface NavFeaturedProduct {
  id: number
  sku: string
  product_name: string
  brand: string
}

export interface NavCategory {
  id: number
  category_no: string
  name: string
  description: string | null
  priority: number
  subcategories: NavSubcategory[]
  featured_products: NavFeaturedProduct[]
}

// ─── Generic paginated response wrapper ───

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ─── API success wrapper ───

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

// ─── Product (GET /api/products) ───

export interface Product {
  id: number
  category_id: number
  subcategory_id: number
  family_id: number
  sku: string
  catalog_number: string | null
  product_name: string
  brand: string
  short_description: string | null
  key_spec_1: string | null
  key_spec_2: string | null
  key_spec_3: string | null
  image_status: string | null
  rfq_eligible: boolean
  created_at: string
  updated_at: string
  // Joined fields
  category_name?: string
  category_no?: string
  subcategory_name?: string
  family_name?: string
}

// ─── Category (GET /api/categories) ───

export interface Category {
  id: number
  category_no: string
  name: string
  priority: number
  description: string | null
  created_at: string
  updated_at: string
  product_count?: number
}

// ─── Subcategory (GET /api/subcategories) ───

export interface Subcategory {
  id: number
  category_id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
  category_name?: string
  category_no?: string
}

// ─── Product Family (GET /api/families) ───

export interface ProductFamily {
  id: number
  subcategory_id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
  subcategory_name?: string
  category_name?: string
  category_id?: number
}
