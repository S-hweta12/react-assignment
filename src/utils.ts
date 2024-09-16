import {
  FilteredResult,
  FilterQuery,
  ParsedQueryParams,
  Query,
  Stock,
} from "./interfaces";

export const buildQueryParams = (params: Query) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.set(key, value.join(","));
    } else {
      searchParams.set(key, value);
    }
  });
  return searchParams.toString();
};

export const parseQueryParams = (search: string): ParsedQueryParams => {
  const searchParams = new URLSearchParams(search);
  const parsedData: ParsedQueryParams = {};

  searchParams.forEach((value, key) => {
    if (key === 'page') {
      parsedData[key] = parseInt(value, 10);
    } else {
      parsedData[key] = value.includes(",") ? value.split(",") : [value];
    }
  });

  return parsedData;
};

export const filteredData = (
  filterQuery: FilterQuery,
  originalData: Stock[]
): FilteredResult => {
  const {
    category,
    sort: sortBy,
    author,
    page = 1,
    itemsPerPage = 5,
  } = filterQuery;

  let filtered = [...originalData];
  let filteredTotalPage = 0;
  if (filtered && filtered.length) {
    if (category && category.length > 0) {
      filtered = filtered.filter((stock) => category.includes(stock.source));
    }

    if (author && author.length > 0) {
      filtered = filtered.filter((stock) => author.includes(stock.author));
    }

    if (sortBy && sortBy.length) {
      filtered = filtered.sort((a, b) => {
        for (const sortField of sortBy) {
          const [field, direction] = sortField.split(" ");
          let comparison = 0;
          if (field === "title") {
            comparison = a.title.localeCompare(b.title);
          } else if (field === "date") {
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          }
          if (direction === "desc") {
            comparison *= -1;
          }
          if (comparison !== 0) return comparison;
        }
        return 0;
      });
    }
    
    filteredTotalPage = Math.ceil(filtered.length / 5);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    filtered = filtered.slice(startIndex, endIndex)
  }

  return {
    stocks: filtered,
    page,
    itemsPerPage,
    filteredTotalPage,
    totalItems: originalData.length,
    totalPage: Math.ceil(originalData.length / itemsPerPage)
  };
};

export const getAllCategories =(stocks: Stock[]): string[]=> {
 return Array.from(new Set(stocks.map((stock) => stock.source)))
}

export const getAllAuthor =(stocks: Stock[]): string[]=> {
  return Array.from(new Set(stocks.map((stock) => stock.author)))
 }