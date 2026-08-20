import axios from "axios"
import { config } from "@/app/config"
import { ApiError } from "./api-error"

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Error transformation interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status
      const data = error.response?.data as any
      const message = data?.message || error.message || "An unexpected error occurred"
      const validationErrors = data?.errors || undefined

      return Promise.reject(new ApiError(message, statusCode, validationErrors))
    }
    return Promise.reject(new ApiError(error.message || "Network request failed"))
  }
)
