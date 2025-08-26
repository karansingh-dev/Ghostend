export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors: null | string[];
}