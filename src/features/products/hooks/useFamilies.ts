import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/services/api-client"
import { API_ENDPOINTS } from "@/services/api-endpoints"
import type { ProductFamily } from "../types/product.types"

export function useFamilies() {
  return useQuery({
    queryKey: ["families"],
    queryFn: async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.FAMILIES)
        return (response.data.data || response.data || []) as ProductFamily[]
      } catch (error) {
        console.warn("Failed to fetch product families from server", error)
        return []
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })
}
