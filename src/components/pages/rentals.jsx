import React, { useEffect, useState } from "react";
import RentalsTable from "components/tables/rentalsTable";
import SearchBox from "components/common/searchBox";
import { paginate } from "utils/paginate";
import Pagination from "components/common/pagination";
import _ from "lodash";
import { getReformattedRentals } from "services/rentalService";

const Rentals = (props) => {
  const [sortColumn, SetSortColumn] = useState({
    path: "bookTitle",
    order: "desc",
  });

  const [rental, SetRental] = useState([]);
  const [searchQuery, SetSearchQuery] = useState("");
  const [pageSize] = useState(5);
  const [currentPage, SetCurrentPage] = useState(1);
  const [itemsCount, SetItemsCount] = useState(0);
  const [viewHistory, SetViewHistory] = useState(false);

  useEffect(() => {
    getPageData();
  }, [searchQuery, sortColumn, pageSize, currentPage, viewHistory]);

  const getPageData = async () => {
    const allRentals = await getReformattedRentals();

    let filtered =
      viewHistory === false
        ? allRentals && allRentals.filter((r) => r.status !== 2)
        : viewHistory === false
        ? allRentals
        : allRentals;
    console.log(filtered);
    if (searchQuery)
      filtered = allRentals.filter((m) =>
        m.bookTitle.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const rentals = paginate(sorted, currentPage, pageSize);
    SetRental(rentals);
    SetItemsCount(filtered && filtered.length);
  };

  const handleSort = (sortColumn) => {
    SetSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    SetSearchQuery(query);
  };

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleViewHistory = () => {
    SetViewHistory(!viewHistory);
    console.log(viewHistory);
  };
  return (
    <div className='container'>
      <p className='mt-3'>Showing {itemsCount} results in the database</p>

      <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
      <RentalsTable
        sortColumn={sortColumn}
        rentals={rental}
        onSort={handleSort}
        viewHistory={viewHistory}
        onhandleViewHistory={handleViewHistory}
      />
      <Pagination
        itemsCount={itemsCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Rentals;
