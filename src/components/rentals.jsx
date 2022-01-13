import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [pageSize] = useState(5);
  const [currentPage, SetCurrentPage] = useState(1);
  const [itemsCount, SetItemsCount] = useState(0);
  const [viewHistory, SetViewHistory] = useState(false);

  useEffect(() => {
    getPageData();
  }, [searchQuery, sortColumn, pageSize, currentPage, viewHistory]);

  const getPageData = async () => {
    const allRentals = await getReformattedRentals();
    // if (viewHistory === false) {
    //   var filtered = allRentals.filter((r) => r.status !== 2);
    // } else(viewHistory === false) {
    //   filtered = allRentals;
    // }
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

  const handleViewHistory = () => {
    SetViewHistory(!viewHistory);
    console.log(viewHistory);
  };
  return (
    <div className='container'>
      <p>Showing {itemsCount} results in the database</p>

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
      <CancelButton linkTo={"/movies"}></CancelButton>
    </div>
  );
};

export default Rentals;
