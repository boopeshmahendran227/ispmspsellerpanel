export interface PaginationDataInterface {
  totalItems: number;
  currentPageNumber: number;
  currentPageSize: number;
  totalPages: number;
}

export interface PaginatedDataInterface<T> extends PaginationDataInterface {
  results: T[];
}
