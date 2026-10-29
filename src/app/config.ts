export const config = {
  apiUrl: (import.meta.env.VITE_API_URL as string) || "http://localhost:5001/api",
  serverUrl: ((import.meta.env.VITE_API_URL as string) || "http://localhost:5001/api").replace(/\/api\/?$/, ""),
  emailContact: "sales@efocus.in",
  phoneContact: "+91 7397 242 650",
}

