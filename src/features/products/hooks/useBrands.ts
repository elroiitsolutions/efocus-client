import { useQuery } from "@tanstack/react-query"
import { ProductService } from "../services/product.service"

export function useBrands() {
  return useQuery({
    queryKey: ["product-brands"],
    queryFn: () => ProductService.getBrands(),
  })
}
