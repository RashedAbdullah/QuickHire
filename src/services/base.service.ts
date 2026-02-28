/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/lib/http";

interface ApiError {
  statusCode: number;
  message: string;
  details?: any;
}

export interface ServiceResult<T> {
  data?: T;
  error?: ApiError;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export abstract class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Clean parameters by removing null, undefined, empty strings, and empty arrays
  // inside BaseService

  protected cleanParams(
    params?: Record<string, any>,
  ): Record<string, any> | undefined {
    if (!params) return undefined;

    const cleaned: Record<string, any> = {};

    // ✅ expand filters -> filter.*
    const filters = params.filters;
    if (filters && typeof filters === "object" && !Array.isArray(filters)) {
      for (const [k, v] of Object.entries(filters)) {
        if (
          v !== null &&
          v !== undefined &&
          v !== "" &&
          !(Array.isArray(v) && v.length === 0)
        ) {
          cleaned[`filter.${k}`] = v;
        }
      }
    }

    for (const [key, value] of Object.entries(params)) {
      if (key === "filters") continue; // already handled

      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        cleaned[key] = value;
      }
    }

    return Object.keys(cleaned).length ? cleaned : undefined;
  }

  // Error Handler
  private handleError(error: any): ApiError {
    return {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message || error.message || "An error occurred",
      details: error.response?.data || error,
    };
  }

  // GET Request
  protected async get<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<ServiceResult<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const cleanedParams = this.cleanParams(params ?? {});

      const response = await http.get(url, { params: cleanedParams });
      return { data: response.data };
    } catch (error: any) {
      return { error: this.handleError(error) };
    }
  }

  // POST Request
  protected async post<T>(
    endpoint: string,
    data?: any,
  ): Promise<ServiceResult<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await http.post(url, data);

      return { data: response.data };
    } catch (error: any) {
      return { error: this.handleError(error) };
    }
  }

  // PUT Request
  protected async put<T>(
    endpoint: string,
    data?: any,
  ): Promise<ServiceResult<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await http.put(url, data);

      return { data: response.data };
    } catch (error: any) {
      return { error: this.handleError(error) };
    }
  }

  // PATCH Request
  protected async patch<T>(
    endpoint: string,
    data?: any,
  ): Promise<ServiceResult<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await http.patch(url, data);

      return { data: response.data };
    } catch (error: any) {
      return { error: this.handleError(error) };
    }
  }

  // DELETE Request
  protected async delete<T>(
    endpoint: string,
    data?: any,
  ): Promise<ServiceResult<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await http.delete(url, data);

      return { data: response.data };
    } catch (error: any) {
      return { error: this.handleError(error) };
    }
  }
}
