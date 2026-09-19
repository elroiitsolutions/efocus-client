import { useQuery } from "@tanstack/react-query"
import { ProductService } from "../services/product.service"

interface BrandsParams {
  category?: string
  subcategory?: string
  family?: string
}

export function useBrands(params?: BrandsParams) {
  return useQuery({
    queryKey: ["product-brands", params?.category, params?.subcategory, params?.family],
    queryFn: () => ProductService.getBrands(params),
    staleTime: 1000 * 60 * 5,
  })
}
