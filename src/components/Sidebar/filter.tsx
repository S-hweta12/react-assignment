import React, { useEffect, useState } from "react";
import vector from "../../assets/vector.svg";

interface FilterSidebar {
  label: string;
  values: string[];
  handleFilter: (
    keyName: "category" | "sortBy" | "author",
    value: string[]
  ) => void;
  keyName: "category" | "sortBy" | "author";
  initialFilterState: string[];
}

const Filter: React.FC<FilterSidebar> = ({
  label,
  values,
  handleFilter,
  keyName,
  initialFilterState,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    initialFilterState || []
  );
  const [sortOrders, setSortOrders] = useState<{
    [key: string]: { [field: string]: "asc" | "desc" };
  }>({
    category: {},
    sortBy: { date: "desc", title: "desc" },
    author: {},
  });
  const toggleSortOrder = (field: string) => {
    setSortOrders((prevSortOrders) => {
      const updatedSortOrders = {
        ...prevSortOrders,
        sortBy: {
          ...prevSortOrders.sortBy,
          [field]:
            prevSortOrders.sortBy[field] === "asc"
              ? "desc"
              : ("asc" as "asc" | "desc"),
        },
      };

      const sortedItems = selectedItems.map(
        (item) => `${item} ${updatedSortOrders.sortBy[item]}`
      );

      handleFilter(keyName, sortedItems);
      return updatedSortOrders;
    });
  };

  const handleSelect = (value: string) => {
    const updatedSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    setSelectedItems(updatedSelectedItems);

    if (keyName === "sortBy") {
      const sortedItems = updatedSelectedItems.map(
        (item) => `${item} ${sortOrders[keyName][item]}`
      );
      handleFilter(keyName, sortedItems);
    } else {
      handleFilter(keyName, updatedSelectedItems);
    }
  };

  useEffect(() => {
    if (keyName === "sortBy") {
      const initialSortOrders: { [field: string]: "asc" | "desc" } = {};
      const initialSelectedItems: string[] = [];

      initialFilterState.forEach((item) => {
        const [field, order] = item.split(" ");
        initialSortOrders[field] = order === "desc" ? "desc" : "asc";
        initialSelectedItems.push(field);
      });

      setSortOrders((prevOrders) => ({
        ...prevOrders,
        sortBy: { ...prevOrders.sortBy, ...initialSortOrders },
      }));
      setSelectedItems(initialSelectedItems);
    } else {
      setSelectedItems(initialFilterState);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <h4>{label}</h4>
      <ul className="choiceOptions">
        {values.map((value) => (
          <li
            key={value}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              className="options"
              id={`styled-checkbox-${value}`}
              type="checkbox"
              value={value}
              checked={selectedItems.includes(value)}
              onChange={() => handleSelect(value)}
            />
            <label htmlFor={`styled-checkbox-${value}`}>{value}</label>
            {keyName === "sortBy" && selectedItems.includes(value) && (
              <div
                className="arrowWrapper"
                role="button"
                tabIndex={0}
                onClick={() => toggleSortOrder(value)}
                style={{ cursor: "pointer" }}
                aria-label={`Toggle sort order for ${value} to ${
                  sortOrders.sortBy[value] === "asc"
                    ? "descending"
                    : "ascending"
                }`}
              >
                <span>
                  <img
                    height="18px"
                    src={vector}
                    className={
                      sortOrders.sortBy[value] === "asc" ? "upArrow" : ""
                    }
                    alt="sort by icon"
                  />
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Filter;
