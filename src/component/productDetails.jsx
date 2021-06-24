import React from "react";
import queryString from "query-string";

const ProductDetails = ({ match, location }) => {
  const result = queryString.parse(location.search);
  console.log(result);
  return (
    <div>
      <h1>Product Details - {match.params.id}</h1>
    </div>
  );
};

export default ProductDetails;
