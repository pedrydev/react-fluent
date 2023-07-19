export default interface PaginatedModel<T> {
  items: T[];
  total: number;
}
