export interface PaginationDataInterface<T = void> {
  totalItems: number;
  currentPageNumber: number;
  currentPageSize: number;
  totalPages: number;
  results: T[];
}
