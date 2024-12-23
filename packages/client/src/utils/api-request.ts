import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@/config";

/**
 * Server should return json with error description and/or status code
 */
export interface ApiError {
  error?: string;
  status?: number;
}

/**
 * All kinds of errors become these ApiRequestError
 * The message and status are taken from the response JSON (if valid) or the response object.
 */
export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status?: number,
    public cause?: Error
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

const instance = axios.create({
  baseURL: config.api.baseUrl
});

async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    
    if (error instanceof AxiosError) {
      // Handle all kinds of request errors: 
      // - with a valid json { error, status ?}, e.g. server reports something
      // - with bad JSON, e.g. something went wrong on the server
      // - network errors
      const errorData = error.response?.data as ApiError | undefined;
      const errorMessage = errorData?.error ?? error.message;
      throw new ApiRequestError(
        errorMessage,
        error.response?.status,
        error
      );
    }

    // Unknown weird error
    throw new ApiRequestError(
      'Request failed',
      undefined,
      error as Error
    );
  }
}

export const apiRequest = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return handleRequest(instance.get<T>(url, config));
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return handleRequest(instance.post<T>(url, data, config));
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return handleRequest(instance.put<T>(url, data, config));
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return handleRequest(instance.patch<T>(url, data, config));
  },

  request: async <T>(
    method: string,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return handleRequest(
      instance.request<T>({
        method,
        url,
        data,
        ...config
      })
    );
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return handleRequest(instance.delete<T>(url, config));
  }
};
