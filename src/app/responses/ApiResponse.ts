export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
  }
  
  export interface PagedResponse<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  }
  