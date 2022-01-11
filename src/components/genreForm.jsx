import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { saveGenre, getGenre, deleteGenre } from "../services/genreService";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";
import Modal from "./common/modal";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

const GenreForm = (props) => {
  useEffect(() => {
    populateGenre();
    return () => {
      setGenreName("");
      setGenreId("");
    };
  }, []);

  const [error, setError] = useState();
  const history = useHistory();
  const [genreName, setGenreName] = useState("");
  const [genreId, setGenreId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  async function populateGenre() {
    try {
      const genreId = props.match.params.id;
      if (genreId === "new") return;

      const { data: gen } = await getGenre(genreId);
      setGenreName(gen.name);
      setGenreId(gen._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  }

  const formik = useFormik({
    initialValues: {
      genreName: genreName,
      id: genreId,
      // enableReinitialize: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      genreName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        if (
          window.confirm(
            "Editing genre will change the genres of all related books. Are you sure ?"
          )
        ) {
          await saveGenre(values);
          history.push("/movies");
        } else {
          return;
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          setFieldError(
            "genre",
            "Genre already exist. Please Select an unique genre."
          );
          setError(ex.response.data);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className='container'>
      <div>
        <p>{genreId ? "Edit" : "Add"} Genre</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='studentForm'>
          <div className='form-group'>
            <label htmlFor='genreName'>Genre Name</label>
            <input
              id='genreName'
              name='genreName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.genreName}
              className='form-control'
              placeholder='Enter Genre'
            />
            {formik.touched.genreName && formik.errors.genreName ? (
              <div>{formik.errors.genreName}</div>
            ) : null}
            {error && <div>{formik.errors.genre}</div>}
          </div>
          <div className='' style={{ marginTop: 20 }}>
            <button
              className='btn btn-primary btn-sm '
              style={{ marginRight: 4 }}
              type='submit'
            >
              {genreId ? "Edit" : "Add"}
            </button>
            {genreId && (
              <button
                className='btn btn-danger btn-sm openModalBtn'
                style={{ marginRight: 4 }}
                type='button'
                onClick={async () => {
                  setOpenModal(true);
                  // try {
                  //   await deleteGenre(genreId);
                  //   history.push("/movies");
                  // } catch (ex) {
                  //   // toast.error("This movie has already been deleted");
                  //   if (ex.response && ex.response.status === 404) {
                  //     // this.setState({ movies: originalMovies });
                  //   }
                  // }
                }}
              >
                Delete
              </button>
            )}
            <button
              className='btn btn-light btn-sm'
              style={{ marginRight: 4 }}
              onClick={() => {
                history.push("/movies");
              }}
            >
              Cancel
            </button>
          </div>
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
                  await deleteGenre(genreId);
                  history.push("/movies");
                } catch (ex) {
                  // toast.error("This movie has already been deleted");
                  if (ex.response && ex.response.status === 404) {
                    // this.setState({ movies: originalMovies });
                  }
                }
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                history.push(`/genres/renameGenre/${genreId}`);
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
