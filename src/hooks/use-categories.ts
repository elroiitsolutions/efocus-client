import { useQuery } from "@tanstack/react-query"
import { fetchNavigationTree, fetchCategories } from "@/services/category.service"

/**
 * Hook to fetch the full mega-menu navigation tree.
 * Cached for 10 minutes — navigation data rarely changes.
 */
export function useNavigationTree() {
  return useQuery({
    queryKey: ["navigation-tree"],
    queryFn: fetchNavigationTree,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes garbage collection
    refetchOnMount: false,
  })
}

/**
 * Hook to fetch all categories (flat list).
 */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  })
}
