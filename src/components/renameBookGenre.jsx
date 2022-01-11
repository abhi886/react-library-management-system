import React from "react";
import CancelButton from "./common/cancelButton";
import { useHistory } from "react-router-dom";

function RenameBookGenre(props) {
  // const history = useHistory();
  const genreId = props.match.params.id;

  return (
    <div className='container'>
      <h5>Rename Genre</h5>
      <div>
        <CancelButton linkTo={`/genres/${genreId}`} />
      </div>
    </div>
  );
}

export default RenameBookGenre;
