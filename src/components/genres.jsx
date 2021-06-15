import React, { Component } from "react";
class Genres extends Component {
  state = {};
  render() {
    const { genres } = this.props;
    return (
      <div className='col-2'>
        <ul className='list-group'>
          {genres.map((genre) => (
            <li key={genre._id} className='list-group-item' aria-current='true'>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Genres;
