// src/components/Sidebar/Sidebar.tsx
import React from "react";
import "./index.scss";
import { Query, Stock } from "../../interfaces";
import Filter from "./filter";
import { getAllAuthor, getAllCategories, parseQueryParams } from "../../utils";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  handleSearch: (val: Query) => void;
  stocks: Stock[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, handleSearch, stocks }) => {
  const categories = getAllCategories(stocks);
  const authors = getAllAuthor(stocks);
  const sortBy = ["date", "title"];
  const location = useLocation();
  const handleFilter = (
    keyName: "category" | "sortBy" | "author",
    data: string[]
  ) => {
    const parsedQuery = parseQueryParams(location.search);
    let params: Query = {
      ...parsedQuery,
      page: 1,
    };

    const updateParams = (key: string, value: string[]) => {
      params = { ...params, [key]: value.length > 0 ? value : [] };
      handleSearch(params);
    };

    if (keyName === "author") {
      updateParams("author", data);
    } else if (keyName === "category") {
      updateParams("category", data);
    } else if (keyName === "sortBy") {
      updateParams("sort", data);
    }
  };

  return (
    <div className={`navbar sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebarWrapper">
        <div className="choiceWrapper">
          <Filter
            label="Category"
            values={categories}
            keyName="category"
            handleFilter={handleFilter}
            initialFilterState={
              parseQueryParams(location.search)?.category || []
            }
          />
        </div>

        <div className="choiceWrapper">
          <Filter
            label="Author"
            values={authors}
            keyName="author"
            handleFilter={handleFilter}
            initialFilterState={parseQueryParams(location.search)?.author || []}
          />
        </div>

        <div className="choiceWrapper">
          <Filter
            label="Sort By"
            values={sortBy}
            keyName="sortBy"
            handleFilter={handleFilter}
            initialFilterState={parseQueryParams(location.search)?.sort || []}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
