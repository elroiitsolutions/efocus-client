export interface ProductSpec {
  value_id: number
  filter_id: number
  filter_name: string
  filter_type: string
  option_id: number | null
  option_value: string | null
  value: string | null
}

export interface Product {
  id: number
  sku: string
  catalog_number?: string | null
  product_name: string
  brand?: string
  short_description?: string | null
  key_spec_1?: string | null
  key_spec_2?: string | null
  key_spec_3?: string | null
  image_status?: string | null
  rfq_eligible?: boolean | number
  category_id?: number
  subcategory_id?: number
  family_id?: number
  category_name?: string
  subcategory_name?: string
  family_name?: string
  specs?: ProductSpec[]
}

export interface Category {
  id: number
  category_no: string
  name: string
  priority: number
  description?: string | null
  product_count?: number
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
  description?: string | null
}

export interface ProductFamily {
  id: number
  subcategory_id: number
  name: string
  description?: string | null
}
