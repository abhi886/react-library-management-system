import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  saveFaculty,
  getFaculty,
  deleteFaculty,
} from "../../services/facultyService";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

const FacultyForm = (props) => {
  const [facultyId, setFacultyId] = useState("");
  const [facultyName, setFacultyName] = useState("");

  useEffect(() => {
    populateFaculty();
    return () => {
      console.log("Clean Up - run");
    };
  }, []);

  const [error, setError] = useState();
  const history = useHistory();

  async function populateFaculty() {
    try {
      const facultyId = props.match.params.id;
      if (facultyId === "new") return;

      const { data: fac } = await getFaculty(facultyId);
      setFacultyName(fac.name);
      setFacultyId(fac._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  }

  const formik = useFormik({
    initialValues: {
      facultyName: facultyName,
      id: facultyId,
      // enableReinitialize: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      facultyName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await saveFaculty(values);
        history.push("/students");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          setFieldError(
            "faculty",
            "Faculty already exist. Please Select an unique faculty."
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
        <p>{facultyId ? "Edit" : "Add"} Id</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='studentForm'>
          <div className='form-group'>
            <label htmlFor='facultyName'>Name</label>
            <input
              id='facultyName'
              name='facultyName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.facultyName}
              className='form-control'
              placeholder='Enter Faculty'
            />
            {formik.touched.facultyName && formik.errors.facultyName ? (
              <div>{formik.errors.facultyName}</div>
            ) : null}
            {error && <div>{formik.errors.faculty}</div>}
          </div>
          <div className='' style={{ marginTop: 20 }}>
            <button
              className='btn btn-primary btn-sm '
              style={{ marginRight: 4 }}
              type='submit'
            >
              {facultyId ? "Edit" : "Add"}
            </button>
            {facultyId && (
              <button
                className='btn btn-danger btn-sm'
                style={{ marginRight: 4 }}
                onClick={async () => {
                  try {
                    await deleteFaculty(facultyId);
                    history.push("/students");
                  } catch (ex) {
                    // toast.error("This movie has already been deleted");
                    if (ex.response && ex.response.status === 404) {
                      // this.setState({ movies: originalMovies });
                      console.log(ex);
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
                history.push("/students");
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

export default FacultyForm;
