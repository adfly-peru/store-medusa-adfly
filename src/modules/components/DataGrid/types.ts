// types.ts
export interface PageInfo {
  currentPage: number;
  totalPages: number;
}

export interface Edge<T> {
  node: T;
}

export interface PaginatedResult<T> {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface FilterInput {
  name?: string;
  email?: string;
  createdAt?: DateRangeInput;
}

export interface DateRangeInput {
  from?: string;
  to?: string;
}

export interface SortInput {
  field: string;
  direction: "ASC" | "DESC";
}
