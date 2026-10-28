import { apiClient } from "./api-client";
import { API_ENDPOINTS } from "./api-endpoints";

export interface FormSubmissionPayload {
  form_name: string;
  form_type: string;
  name?: string;
  email: string;
  company_name?: string;
  phone?: string;
  subject?: string;
  message?: string;
  part_numbers?: string;
  skus?: string;
  quantity?: string;
  file?: File | null;
  [key: string]: any;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    form_name: string;
    form_type: string;
    email: string;
    status: string;
  };
}

export class FormSubmissionService {
  /**
   * Submit any form inquiry / RFQ / message to the backend
   */
  static async submitForm(payload: FormSubmissionPayload): Promise<FormSubmissionResponse> {
    if (payload.file) {
      // Use FormData for file attachment
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key === "file") {
          if (payload.file) {
            formData.append("bom_file", payload.file);
          }
        } else if (payload[key] !== undefined && payload[key] !== null) {
          formData.append(key, typeof payload[key] === "object" ? JSON.stringify(payload[key]) : String(payload[key]));
        }
      });

      const response = await apiClient.post<FormSubmissionResponse>(
        API_ENDPOINTS.FORMS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } else {
      // Standard JSON submission
      const response = await apiClient.post<FormSubmissionResponse>(
        API_ENDPOINTS.FORMS,
        payload
      );
      return response.data;
    }
  }
}
