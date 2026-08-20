import { useQuery } from "@tanstack/react-query"
import { FilterService } from "../services/filter.service"

export function useFilters(familyId?: number) {
  return useQuery({
    queryKey: ["filters", familyId],
    queryFn: () =>
      familyId !== undefined
        ? FilterService.getFiltersByFamilyId(familyId)
        : FilterService.getAllFilters(),
  })
}
