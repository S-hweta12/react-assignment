export interface Query {
  sort?: string[];
  author?: string[];
  category?: string[];
  page?: number;
}

export interface Stock {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

export interface StocksState {
  totalStocks: Stock[];
  filteredStocks: Stock[];
  loading?: boolean;
  message?: string;
  error?: string;
  success?: boolean;
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  totalPage?: number;
  filteredTotalPage?: number;
}

export interface FilteredResult {
  stocks: Stock[];
  page: number;
  totalItems: number;
  itemsPerPage: number;
  totalPage: number;
  filteredTotalPage: number
}

export interface ParsedQueryParams extends Query {
  [key: string]: number | string | string[] | undefined;
}

export interface FilterQuery extends Query {
  itemsPerPage?: number
}
