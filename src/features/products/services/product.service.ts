import { apiClient } from "@/services/api-client"
import { API_ENDPOINTS } from "@/services/api-endpoints"
import type { Product } from "../types/product.types"
import { slugify } from "@/lib/utils"

// Centralized mock data matching the original website layout
export const mockProducts: Product[] = [
  {
    id: 1,
    sku: "TST-001",
    catalog_number: "TST-001–009",
    product_name: "Lab & bench RF and meter leads (TST-001–009)",
    brand: "Generic",
    short_description: "Banana leads, Kelvin probes, BNC test assemblies & multimeter probes.",
    key_spec_1: "Power: 90W",
    key_spec_2: "Temp Range: 180–480°C",
    key_spec_3: "Lead-Free: Yes",
    category_name: "Testing & Measurement",
    rfq_eligible: true,
  },
  {
    id: 2,
    sku: "ICA-001",
    catalog_number: "ICA-001–009",
    product_name: "Sensor, servo, PLC & robot cabling (ICA-001–009)",
    brand: "Airtac",
    short_description: "Drag chain flex, encoder lines, M12 sensor jumpers & feedback cables.",
    key_spec_1: "Connector: M12 4-Pin",
    key_spec_2: "Standard: IP67 Waterproof",
    key_spec_3: "Application: Industrial Robotics",
    category_name: "Cables & Connectivity",
    rfq_eligible: true,
  },
  {
    id: 3,
    sku: "RF-001",
    catalog_number: "RF-001–007",
    product_name: "Coaxial assemblies & jumpers (RF-001–007)",
    brand: "DNC",
    short_description: "SMA-SMA, SMA-N, semi-rigid, low-loss RF cables & precision jumpers.",
    key_spec_1: "Frequency: Up to 6GHz",
    key_spec_2: "Connector: SMA to SMA",
    key_spec_3: "Impedance: 50 Ohm",
    category_name: "RF & Microwave",
    rfq_eligible: true,
  },
  {
    id: 4,
    sku: "NET-001",
    catalog_number: "NET-001–007",
    product_name: "Ethernet, fiber & USB industrial cords (NET-001–007)",
    brand: "TP-Link",
    short_description: "Cat6A/Cat7 shielded cords, LC-LC fiber patch cords & industrial switches.",
    key_spec_1: "Category: Cat6A Shielded",
    key_spec_2: "Connector: RJ45 to RJ45",
    key_spec_3: "Speed: Up to 10Gbps",
    category_name: "Cables & Connectivity",
    rfq_eligible: true,
  },
  {
    id: 5,
    sku: "SMT-001",
    catalog_number: "SMT-001–012",
    product_name: "SMT Soldering, Flux & Rework Station Setup",
    brand: "Quick",
    short_description: "No-clean flux, solder wire, pick & place nozzles, hot air SMD rework.",
    key_spec_1: "Power: 90W",
    key_spec_2: "Compatibility: Quick 203H",
    key_spec_3: "Temp Range: 180-480C",
    category_name: "SMT, Rework & Assembly",
    rfq_eligible: true,
  },
  {
    id: 6,
    sku: "MRO-001",
    catalog_number: "MRO-001–011",
    product_name: "Precision Crimping & Hand Tooling (MRO-001–011)",
    brand: "Knipex",
    short_description: "Ferrule crimpers, torque drivers, heat shrink tubes & wire strippers.",
    key_spec_1: "Range: 0.5-16mm²",
    key_spec_2: "Type: Ratchet Crimper",
    key_spec_3: "Jaw: Interchangeable",
    category_name: "Tools & MRO",
    rfq_eligible: true,
  },
  {
    id: 7,
    sku: "PWR-001",
    catalog_number: "PWR-001–005",
    product_name: "AC, DC & Industrial Power Cables (PWR-001–005)",
    brand: "Meanwell",
    short_description: "Heavy duty power cords, DC distribution, industrial plugs & power strips.",
    key_spec_1: "Voltage: 0-100V",
    key_spec_2: "Current: 0-60A",
    key_spec_3: "Power: 6000W",
    category_name: "Power & Electrical",
    rfq_eligible: true,
  },
  {
    id: 8,
    sku: "ESD-001",
    catalog_number: "ESD-001–008",
    product_name: "ESD Control, Wrist Straps & Meters (ESD-001–008)",
    brand: "DESCO",
    short_description: "Grounding cords, shielding bags, ESD mats, cots & field meters.",
    key_spec_1: "Type: Coiled Wrist Strap",
    key_spec_2: "Resistance: 1 MOhm",
    key_spec_3: "Standard: ANSI/ESD S20.20",
    category_name: "ESD & RF",
    rfq_eligible: true,
  },
]

export interface GetProductsParams {
  search?: string
  category?: string
  subcategory?: string
  family?: string
  brand?: string
  page?: number
  limit?: number
}

export interface PaginatedProductsResponse {
  data: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export class ProductService {
  static async getProducts(params: GetProductsParams): Promise<PaginatedProductsResponse> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, { params })
      // Backend paginated structure formatting check
      if (response.data && Array.isArray(response.data.data)) {
        return response.data as PaginatedProductsResponse
      }
      // If server returns raw rows array:
      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          pagination: { total: response.data.length, page: 1, limit: 100, totalPages: 1 },
        }
      }
      throw new Error("Invalid API response format")
    } catch (error) {
      console.warn("Backend API is offline, returning local mock products dataset.", error)
      // Apply local client-side search & filtering mock fallbacks
      let filtered = [...mockProducts]

      if (params.search) {
        const query = params.search.toLowerCase()
        filtered = filtered.filter(
          (p) =>
            p.product_name.toLowerCase().includes(query) ||
            p.sku.toLowerCase().includes(query) ||
            (p.brand && p.brand.toLowerCase().includes(query))
        )
      }

      const catSlugs = params.category ? params.category.split(",").map((c) => slugify(c.trim())).filter(Boolean) : []
      const subcatSlugs = params.subcategory ? params.subcategory.split(",").map((s) => slugify(s.trim())).filter(Boolean) : []
      const brandList = params.brand ? params.brand.split(",").map((b) => b.trim().toLowerCase()).filter(Boolean) : []

      if (catSlugs.length > 0 || subcatSlugs.length > 0) {
        filtered = filtered.filter((p) => {
          const pCatSlug = slugify(p.category_name || "")
          const pSubcatSlug = slugify(p.subcategory_name || "")
          const pBrandLower = (p.brand || "").toLowerCase()

          if (catSlugs.length > 0) {
            if (catSlugs.includes(pCatSlug)) {
              // Find all subcategories for this category in the mock products
              const categorySubcats = mockProducts
                .filter(mp => slugify(mp.category_name || "") === pCatSlug)
                .map(mp => slugify(mp.subcategory_name || ""))
                .filter(Boolean)

              // Check if any of the query subcategories belong to this category
              const selectedSubsForThisCat = subcatSlugs.filter(s => categorySubcats.includes(s))

              if (selectedSubsForThisCat.length > 0) {
                // Product must match one of the selected subcategories
                if (selectedSubsForThisCat.includes(pSubcatSlug)) {
                  const selectedBrandsForSub = brandList.map(b => {
                    if (b.includes(':')) {
                      const [scopeSlug, bName] = b.split(':');
                      if (scopeSlug === pSubcatSlug) {
                        return bName;
                      }
                      return null;
                    }
                    return b;
                  }).filter(Boolean);

                  if (selectedBrandsForSub.length > 0) {
                    return selectedBrandsForSub.includes(pBrandLower)
                  }
                  return true
                }
                return false
              }
              return true
            }
            return false
          } else {
            // No categories selected, check subcategories
            if (subcatSlugs.includes(pSubcatSlug)) {
              const selectedBrandsForSub = brandList.map(b => {
                if (b.includes(':')) {
                  const [scopeSlug, bName] = b.split(':');
                  if (scopeSlug === pSubcatSlug) {
                    return bName;
                  }
                  return null;
                }
                return b;
              }).filter(Boolean);

              if (selectedBrandsForSub.length > 0) {
                return selectedBrandsForSub.includes(pBrandLower)
              }
              return true
            }
            return false
          }
        })
      } else {
        // No category or subcategory filters, filter by brand globally if selected
        if (brandList.length > 0) {
          filtered = filtered.filter((p) => p.brand && brandList.includes(p.brand.toLowerCase()))
        }
      }

      const page = params.page || 1
      const limit = params.limit || 8
      const start = (page - 1) * limit
      const paginatedData = filtered.slice(start, start + limit)

      return {
        data: paginatedData,
        pagination: {
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit),
        },
      }
    }
  }

  static async getBrands(): Promise<string[]> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}/brands`)
      return response.data.data || response.data
    } catch (error) {
      console.warn("Failed to fetch brands from server, returning local mock brands", error)
      const brands = mockProducts.map(p => p.brand).filter(Boolean)
      return Array.from(new Set(brands)) as string[]
    }
  }

  static async getProductBySku(sku: string): Promise<Product> {
    try {
      // Fetch list with SKU query since slug matching matches sku
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, {
        params: { search: sku },
      })
      const found = response.data.data?.find((p: any) => p.sku === sku)
      if (found) {
        // Fetch full product details (including specifications) via id
        const detailsResponse = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${found.id}`)
        return detailsResponse.data.data || detailsResponse.data
      }
      throw new Error(`Product ${sku} not found on server.`)
    } catch (error) {
      console.warn(`Product ${sku} fetch failed. Returning local fallback item.`, error)
      const local = mockProducts.find((p) => p.sku === sku)
      if (local) return local
      throw new Error(`Product ${sku} does not exist in local mocks.`)
    }
  }
}
