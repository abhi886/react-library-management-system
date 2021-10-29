import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { saveGenre } from "../services/genreService";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const GenreForm = () => {
  const [error, setError] = useState();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      genreName: "",
    },
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
        <p>New Genre Form</p>
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
              placeholder='Enter Genre Name'
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
              Submit
            </button>
            <button
              className='btn btn-danger btn-sm'
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
