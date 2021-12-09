import React, { useEffect, useState } from "react";
import RentalsTable from "./rentalsTable";
import SearchBox from "./searchBox";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

import _ from "lodash";

import { getReformattedRentals } from "../services/rentalService";
import CancelButton from "./common/cancelButton";

const Rentals = (props) => {
  const [sortColumn, SetSortColumn] = useState({
    path: "bookTitle",
    order: "desc",
  });

  const [rental, SetRental] = useState([]);
  const [searchQuery, SetSearchQuery] = useState("");
  const [pageSize] = useState(10);
  const [currentPage, SetCurrentPage] = useState(1);
  const [itemsCount, SetItemsCount] = useState(0);

  useEffect(() => {
    getPageData();
  }, [searchQuery, sortColumn, pageSize, currentPage]);

  const getPageData = async () => {
    const allRentals = await getReformattedRentals();
    let filtered = allRentals;
    if (searchQuery)
      filtered = allRentals.filter((m) =>
        m.bookTitle.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const rentals = paginate(sorted, currentPage, pageSize);
    SetRental(rentals);
    SetItemsCount(filtered.length);
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
  return (
    <div className='container'>
      <p>Showing {itemsCount} results in the database</p>

      <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
      <RentalsTable
        sortColumn={sortColumn}
        rentals={rental}
        onSort={handleSort}
      />
      <Pagination
        itemsCount={itemsCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
      <CancelButton linkTo={"/movies"}></CancelButton>
    </div>
  );
};

export default Rentals;
