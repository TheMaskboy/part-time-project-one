export interface PaginationResponse<S> {
  pages: number;
  records: S[];
  size: number;
  total: number;
  current: number;
}
