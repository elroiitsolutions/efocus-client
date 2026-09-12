import { useQuery } from "@tanstack/react-query"
import { ProductService } from "../services/product.service"

interface ContextFilterParams {
  category?: string
  subcategory?: string
  family?: string
}

export function useContextualFilters(params: ContextFilterParams) {
  return useQuery({
    queryKey: ["contextual-filters", params.category, params.subcategory, params.family],
    queryFn: () => ProductService.getContextualFilters(params),
    enabled: Boolean(params.family),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })
}
