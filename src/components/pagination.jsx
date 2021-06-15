import React, { Component } from "react";
class Pagination extends Component {
  state = {};
  render() {
    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          <li className='page-item'>
            <a className='page-link' href='/#'>
              1
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
