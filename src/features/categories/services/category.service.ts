import { apiClient } from "@/services/api-client"
import { API_ENDPOINTS } from "@/services/api-endpoints"
import type { Category } from "@/features/products/types/product.types"

export const mockCategories: Category[] = [
  { id: 1, category_no: "01", name: "SMT, Rework & Assembly", priority: 1, description: "Precision rework stations & consumables" },
  { id: 2, category_no: "02", name: "Cables & Connectivity", priority: 2, description: "Cabling, patch cords & coaxial jumpers" },
  { id: 3, category_no: "03", name: "Tools & MRO", priority: 3, description: "Precision crimping tools & hand tools" },
  { id: 4, category_no: "04", name: "Power & Electrical", priority: 4, description: "DC power supplies & power cables" },
  { id: 5, category_no: "05", name: "ESD & RF", priority: 5, description: "Wrist straps, shielding bags & boxes" },
  { id: 6, category_no: "06", name: "Testing & Measurement", priority: 6, description: "Multimeters, test leads & oscilloscopes" },
  { id: 7, category_no: "07", name: "IT Hardware & Workstation", priority: 7, description: "Workstations, monitor arms & storage bins" },
  { id: 8, category_no: "08", name: "Labelling & Identification", priority: 8, description: "Printers, barcodes, ribbons & tags" },
]

export class CategoryService {
  static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIES)
      // Check response wrapper
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data as Category[]
      }
      if (Array.isArray(response.data)) {
        return response.data as Category[]
      }
      throw new Error("Invalid API format")
    } catch (error) {
      console.warn("Backend API offline. Returning local mock categories dataset.", error)
      return mockCategories
    }
  }
}
