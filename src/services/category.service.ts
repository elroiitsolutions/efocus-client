import { apiClient } from "@/services/api-client"
import { API_ENDPOINTS } from "@/services/api-endpoints"
import type { NavCategory, Category, ApiSuccessResponse } from "@/types/api.types"

/**
 * Fetch the full navigation tree for the mega-menu.
 * GET /api/categories/navigation
 */
export async function fetchNavigationTree(): Promise<NavCategory[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<NavCategory[]>>(
    `${API_ENDPOINTS.CATEGORIES}/navigation`
  )
  return data.data
}

/**
 * Fetch all categories (flat list).
 * GET /api/categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<Category[]>>(
    API_ENDPOINTS.CATEGORIES
  )
  return data.data
}

/**
 * Fetch a single category by ID.
 * GET /api/categories/:id
 */
export async function fetchCategoryById(id: number): Promise<Category> {
  const { data } = await apiClient.get<ApiSuccessResponse<Category>>(
    `${API_ENDPOINTS.CATEGORIES}/${id}`
  )
  return data.data
}
