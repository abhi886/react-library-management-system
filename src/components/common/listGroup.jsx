import React from "react";
import { useHistory } from "react-router-dom";

const ListGroup = (props) => {
  const history = useHistory();
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
    props;

  return (
    <div>
      <ul className='list-group'>
        {items.map((item) => (
          <li
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              item.name && item.name === selectedItem.name
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer", marginTop: "10px" }}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
