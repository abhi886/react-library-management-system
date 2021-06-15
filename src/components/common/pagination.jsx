import React, { Component } from "react";
import _ from "lodash";
class Pagination extends Component {
  render() {
    const { pageSize, itemsCount, onPageChange, currentPage } = this.props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              onClick={() => onPageChange(page)}
            >
              <a className='page-link' href='/#'>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
