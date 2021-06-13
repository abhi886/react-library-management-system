import React, { Component } from "react";

class Movies extends Component {
  state = {};
  render() {
    return (
      <>
        <div className='row'>
          <div className='col-2'>
            <ul>
              <li>All Genres</li>
            </ul>
          </div>
          <div className='col-8'>
            <table className='table'>
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
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>
                    <i className='fa fa-heart-o' aria-hidden='true'></i>{" "}
                  </td>
                  <td>Delete Button</td>
                </tr>
              </tbody>
            </table>
            <nav aria-label='Page navigation example'>
              <ul className='pagination'>
                <li className='page-item'>
                  <a className='page-link' href='/#'>
                    1
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
