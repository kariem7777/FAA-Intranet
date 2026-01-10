export interface Error {
  propertyName: string;
  message: string;
}
interface PaginatedData<T = unknown> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}

export interface BaseResponse {
  message?: string;
  errorList?: Error[];
}

export interface ApiResponse<T = unknown> extends BaseResponse {
  data?: T;
}

export type PaginatedResponse<T = unknown> = ApiResponse<PaginatedData<T>>;
