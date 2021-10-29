import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ListGroup = (props) => {
  const history = useHistory();

  const {
    user,
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect,
  } = props;
  const handleClick = (selectedItem) => {
    history.push({
      pathname: `/genres/${selectedItem._id}`,
    });
  };

  return (
    <div>
      {user && (
        <div>
          <Link
            to='/genres/new'
            className='btn btn-primary btn-sm'
            style={{ marginTop: 20 }}
          >
            New Genre
          </Link>
          {
            <button
              className='btn btn-warning btn-sm'
              style={{ marginTop: 10, marginBottom: 10 }}
              onClick={() => {
                // <Link to={`/genres/${selectedItem._id}`}>
                //   {selectedItem.name}{" "}
                // </Link>;
                handleClick(selectedItem);
              }}
              disabled={selectedItem._id === "" ? true : false}
            >
              Edit Genre
            </button>
          }
        </div>
      )}
      <div>
        <ul className='list-group'>
          {items.map((item) => (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={
                item.name === selectedItem.name
                  ? "list-group-item active"
                  : "list-group-item"
              }
              style={{ cursor: "pointer" }}
            >
              {item[textProperty]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
