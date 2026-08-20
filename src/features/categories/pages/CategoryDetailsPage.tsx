import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { slugify } from "@/lib/utils"

export default function CategoryDetailsPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      // Map path slugs dynamically (e.g. SMT to category name)
      let categoryName = slug
      const lower = slug.toLowerCase()
      if (lower.includes("smt") || lower.includes("rework")) {
        categoryName = "SMT, Rework & Assembly"
      } else if (lower.includes("cable") || lower.includes("connect")) {
        categoryName = "Cables & Connectivity"
      } else if (lower.includes("tool")) {
        categoryName = "Tools & MRO"
      } else if (lower.includes("power") || lower.includes("elect")) {
        categoryName = "Power & Electrical"
      } else if (lower.includes("esd") || lower.includes("rf")) {
        categoryName = "ESD & RF"
      } else if (lower.includes("test") || lower.includes("measur")) {
        categoryName = "Testing & Measurement"
      }

      navigate(`/products?category=${slugify(categoryName)}`, {
        replace: true,
      })
    } else {
      navigate("/products", { replace: true })
    }
  }, [slug, navigate])

  return null
}
