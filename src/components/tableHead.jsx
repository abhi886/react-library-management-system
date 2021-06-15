import React, { Component } from "react";
class TableHead extends Component {
  state = {};
  render() {
    return (
      <thead>
        <tr>
          <th scope='col'>Title</th>
          <th scope='col'>Genre</th>
          <th scope='col'>No of Stock</th>
          <th scope='col'>Rental rate</th>
          <th scope='col'></th>
          <th scope='col'></th>
        </tr>
      </thead>
    );
  }
}

export default TableHead;
