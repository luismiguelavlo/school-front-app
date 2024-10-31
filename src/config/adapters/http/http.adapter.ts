

export abstract class HttpAdapter {
  abstract get<T>(url: string, options?: Record<string, any>): Promise<T>

  abstract post<T>(url: string, data: Record<string, any>, options?: Record<string, any>): Promise<T>

  abstract put<T>(url: string, data: Record<string, any>, options?: Record<string, any>): Promise<T>

  abstract delete<T>(url: string, options?: Record<string, any>): Promise<T>
}