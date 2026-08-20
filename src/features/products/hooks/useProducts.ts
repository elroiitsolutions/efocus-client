import { useQuery } from "@tanstack/react-query"
import { ProductService, type GetProductsParams } from "../services/product.service"

export function useProducts(params: GetProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => ProductService.getProducts(params),
  })
}
