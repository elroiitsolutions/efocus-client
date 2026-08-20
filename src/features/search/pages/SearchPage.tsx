import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("query") || ""
    navigate(`/products?search=${encodeURIComponent(q)}`, { replace: true })
  }, [searchParams, navigate])

  return null
}
