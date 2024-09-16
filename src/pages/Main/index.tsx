import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import StockCard from "../../components/StockCard";
import { Query, StocksState } from "../../interfaces";
import { buildQueryParams, filteredData, parseQueryParams } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllStocks, setFilteredStocks } from "../../redux/slices/stockSlice";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";

import "./index.scss";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { filteredStocks, totalStocks, loading, filteredTotalPage } =
    useAppSelector<StocksState>((state) => state.Stock);

  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page: number) => {
    const parsedQuery = parseQueryParams(location.search);
    const updatedQuery = {
      ...parsedQuery,
      page,
    };
    setCurrentPage(page);
    handleSearch(updatedQuery);
    window.scrollTo(0, 0);
  };

  const handleSearch = ({ sort, author, category, page = 1 }: Query) => {
    const parsedQuery = parseQueryParams(location.search);

    let params: Query = {
      ...parsedQuery,
      page,
    };

    if (sort?.length) params = { ...params, sort };
    if (author?.length) params = { ...params, author };
    if (category?.length) params = { ...params, category };

    if (!sort?.length) delete params.sort;
    if (!author?.length) delete params.author;
    if (!category?.length) delete params.category;

    const queryString = buildQueryParams(params);
    navigate(`/stocks?${queryString}`);
  };

  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  useEffect(() => {
    const parsedQuery = parseQueryParams(location.search);
    setCurrentPage(parsedQuery.page ? parsedQuery.page : 1);
    const data = filteredData(parsedQuery, totalStocks);
    dispatch(setFilteredStocks(data));
  }, [totalStocks, dispatch, location.search]);

  return (
    <div data-testid="main-page-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <div className="mainWrapper">
          <Sidebar
            stocks={totalStocks}
            isOpen={isSidebarOpen}
            handleSearch={handleSearch}
          />
          {filteredStocks.length ? (
            <div className="stocksDetails">
              <div className="stockCardWrapper">
                {filteredStocks?.map(
                  ({ title, url, image, date, body, source, author }) => (
                    <StockCard
                      key={url}
                      url={url}
                      title={title}
                      image={image}
                      date={date}
                      author={author}
                      source={source}
                      body={body}
                    />
                  )
                )}
              </div>
              <Pagination
                totalPages={filteredTotalPage ?? totalStocks.length / 5}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <div className="noResultWrapper">
              <h1>No result found for Selection</h1>
            </div>
          )}
          <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        </div>
      )}
    </div>
  );
};

export default App;
