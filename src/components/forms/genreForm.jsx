import React from "react";
import { useState, useEffect } from "react";
import { saveGenre, getGenre, deleteGenre } from "../../services/genreService";
import { getMovieToRenameGenre } from "../../services/movieService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import useForm from "../customHooks/useForm";
import Joi from "joi-browser";
import Modal from "components/common/modal";
import CancelButton from "../common/cancelButton";

const GenreForm = (props) => {
  const history = useHistory();
  const [error, SetError] = useState({});
  const [data, SetData] = useState({
    genre: "",
  });
  const [id, SetId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const populateGenre = async () => {
    try {
      const genreId = props.match.params.id;
      if (genreId === "new") return;
      const { data: gen } = await getGenre(genreId);
      SetData({ genre: gen.name });
      SetId(gen._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  };
  useEffect(() => {
    populateGenre();
  }, []);

  const rule = {
    schema: {
      genre: Joi.string().required().label("Genre"),
    },
    doSubmit: async () => {
      try {
        await saveGenre({ genreName: data.genre, id: id });
        history.push("/books");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          SetError({ genre: ex.response.data });
        }
      }
    },
    data,
    SetData,
    error,
    SetError,
  };
  const { renderButton, renderInput, submitHandler } = useForm(rule);

  return (
    <div className='container'>
      <h3 className='mt-3'>{id ? "Edit" : "Add New"} Genre</h3>
      <form
        className='p-4 p-md-5 border rounded-3 bg-light'
        onSubmit={submitHandler}
      >
        {renderInput({ label: "Genre", name: "genre" })}
        <hr />
        <div className='d-flex flex-row justify-content-end'>
          <div className='p-2'>{renderButton("Submit")}</div>
          <div className='p-2'>
            <CancelButton linkTo='/books'>Cancel</CancelButton>
          </div>
          {id && (
            <div className='p-2'>
              <button
                className='btn btn-danger openModalBtn'
                style={{ marginRight: 4 }}
                type='button'
                onClick={async () => {
                  setOpenModal(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </form>
      {openModal && (
        <Modal closeModal={setOpenModal}>
          {" "}
          <div className='title'>
            <p>
              Do You Want To Delete all the Books OR Rename the books to
              different Genres??
            </p>
          </div>
          <div className='body'>
            <button
              className='btn btn-danger btn-sm '
              onClick={async () => {
                try {
                  const { data: movie } = await getMovieToRenameGenre(id);
                  console.log(movie);
                  if (movie.length !== 0) {
                    alert("Please rename all the boks before deleting.");
                  }
                  if (movie.length === 0) {
                    await deleteGenre(id);
                    history.push("/books");
                  }
                } catch (ex) {
                  toast.error("Genre cannot be deleted");
                  if (ex.response && ex.response.status === 404) {
                    console.log(ex.message);
                  }
                }
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                history.push(`/genres/renameGenre/${id}`);
              }}
              style={{ marginLeft: 8 }}
              className='btn btn-primary btn-sm'
            >
              Rename Genre
            </button>
          </div>{" "}
        </Modal>
      )}
    </div>
  );
};

export default GenreForm;
