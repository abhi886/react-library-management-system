import React, { useState, useEffect } from "react";
import CancelButton from "./common/cancelButton";
import { getRental, returnRentals } from "../services/rentalService";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

function ReturnRentals(props) {
  const history = useHistory();

  const rentalId = props.match.params.id;
  const handleProceedReturn = async (rentalId) => {
    try {
      const { data: result } = await returnRentals(rentalId);
      if (result) toast.success("Succes : Book Has been returned");
      history.push("/rentals");
    } catch (ex) {
      toast.error(ex);
    }
  };

  const [rentalFee, SetRentalFee] = useState("");
  const [title, SetTitle] = useState("");

  const populateRenatls = async () => {
    const { data: allRentals } = await getRental(rentalId);
    SetRentalFee(allRentals.rentalFee);
    SetTitle(allRentals.movie.title);
  };

  useEffect(() => {
    populateRenatls();
  }, []);

  return (
    <div className='container mt-3'>
      <p>Book Name : {title}</p>
      <p>Total Charge :{(rentalFee && rentalFee) || " N/A"}</p>
      <CancelButton linkTo={"/rentals"} />
      <button
        style={{ marginLeft: "2px" }}
        className='btn btn-primary'
        onClick={() => handleProceedReturn(rentalId)}
      >
        Proceed
      </button>
    </div>
  );
}

export default ReturnRentals;
