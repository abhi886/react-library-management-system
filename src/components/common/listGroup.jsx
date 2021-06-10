import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty } = props;
  return (
    <ul className='list-group'>
      <li className='list-group-item active'>All Genres</li>
      {items.map((item) => (
        <li key={item[valueProperty]} className='list-group-item '>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
