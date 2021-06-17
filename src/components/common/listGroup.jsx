import React from "react";
const ListGroup = (props) => {
  const { items, onItemClick, textProperty, valueProperty, selectedItem } =
    props;
  console.log(items);
  console.log(selectedItem);
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item._id === selectedItem._id
              ? "list-group-item active"
              : "list-group-item"
          }
          aria-current='true'
          onClick={() => onItemClick(item)}
        >
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
