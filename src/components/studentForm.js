import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const StudentForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='studentForm'>
        <div class='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            id='firstName'
            name='firstName'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className='form-control'
            placeholder='Enter First Name'
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div class='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            id='lastName'
            name='lastName'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className='form-control'
            placeholder='Enter last name'
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div class='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            className='form-control'
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='Enter Email Address'
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='form-control'>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
