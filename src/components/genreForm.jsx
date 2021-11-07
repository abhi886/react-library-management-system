import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { saveGenre, getGenre, deleteGenre } from "../services/genreService";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

const GenreForm = (props) => {
  const [genre, setGenre] = useState({});
  useEffect(() => {
    populateGenre();
    return () => {
      console.log("Clean Up - run");
    };
  }, []);

  const [error, setError] = useState();
  const history = useHistory();

  async function populateGenre() {
    try {
      const genreId = props.match.params.id;
      if (genreId === "new") return;

      const { data: gen } = await getGenre(genreId);
      setGenre(gen);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        // this.props.history.replace("/not-found");
        console.log("error");
    }
  }

  const formik = useFormik({
    initialValues: {
      genreName: genre ? genre.name : "",
      id: genre ? genre._id : "",
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
        await saveGenre(values);
        history.push("/movies");
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
        {console.log(genre)}
        <p>{genre ? "Edit" : "Add"} Genre</p>
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
              {genre ? "Edit" : "Add"}
            </button>
            {genre && (
              <button
                className='btn btn-danger btn-sm'
                style={{ marginRight: 4 }}
                onClick={async () => {
                  try {
                    await deleteGenre(genre._id);
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
    </div>
  );
};

export default GenreForm;
