import { useQuery } from "@tanstack/react-query"
import { ProductService } from "../services/product.service"

export function useProduct(sku: string) {
  return useQuery({
    queryKey: ["product", sku],
    queryFn: () => ProductService.getProductBySku(sku),
    enabled: !!sku,
  })
}
