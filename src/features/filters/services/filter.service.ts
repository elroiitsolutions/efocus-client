import { apiClient } from "@/services/api-client"
import { API_ENDPOINTS } from "@/services/api-endpoints"

export interface FilterOption {
  id: number
  option_value: string
}

export interface ProductFilter {
  id: number
  family_id: number
  filter_name: string
  filter_type: string
  options?: FilterOption[]
}

const mockFilters: ProductFilter[] = [
  {
    id: 1,
    family_id: 1,
    filter_name: "Brand",
    filter_type: "select",
    options: [
      { id: 1, option_value: "Quick" },
      { id: 2, option_value: "Weller" },
      { id: 3, option_value: "Hakko" },
      { id: 4, option_value: "Generic" },
    ],
  },
  {
    id: 2,
    family_id: 1,
    filter_name: "Power",
    filter_type: "select",
    options: [
      { id: 5, option_value: "60W" },
      { id: 6, option_value: "70W" },
      { id: 7, option_value: "90W" },
      { id: 8, option_value: "120W+" },
    ],
  },
  {
    id: 3,
    family_id: 1,
    filter_name: "Lead-Free Compatible",
    filter_type: "select",
    options: [
      { id: 9, option_value: "Yes" },
      { id: 10, option_value: "No" },
    ],
  },
]

export class FilterService {
  static async getAllFilters(): Promise<ProductFilter[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FILTERS)
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data as ProductFilter[]
      }
      if (Array.isArray(response.data)) {
        return response.data as ProductFilter[]
      }
      throw new Error("Invalid API format")
    } catch (error) {
      console.warn("Backend API offline. Returning local mock filters dataset.", error)
      return mockFilters
    }
  }

  static async getFiltersByFamilyId(familyId: number): Promise<ProductFilter[]> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.FILTERS}/${familyId}`)
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data as ProductFilter[]
      }
      if (Array.isArray(response.data)) {
        return response.data as ProductFilter[]
      }
      throw new Error("Invalid API format")
    } catch (error) {
      console.warn(`Backend API offline. Returning mock filters for family ${familyId}`, error)
      return mockFilters
    }
  }
}
