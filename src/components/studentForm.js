import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveStudent } from "../services/studentService";
import { useHistory } from "react-router-dom";
import { getStudent } from "../services/studentService";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const StudentForm = (props) => {
  const history = useHistory();
  // const [stu, SetStu] = useState({});
  const [studentId, SetStudentId] = useState("");
  const [studentFName, SetStudentFName] = useState("");
  const [studentLName, SetStudentLName] = useState("");
  const [studentEmail, SetStudentEmail] = useState("");
  const [studentFaculty, SetStudentFaculty] = useState("");
  const [id, SetId] = useState("");

  async function populateStudent() {
    try {
      const studentId = props.match.params.id;
      if (studentId === "new") return;

      const { data: student } = await getStudent(studentId);
      SetStudentId(student.studentId);
      SetStudentFName(student.firstName);
      SetStudentLName(student.lastName);
      SetStudentEmail(student.email);
      SetStudentFaculty(student.faculty);
      SetId(student._id);

      // SetStu(student);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  }

  useEffect(() => {
    populateStudent();
  }, []);

  const formik = useFormik({
    initialValues: {
      studentId: studentId,
      firstName: studentFName,
      lastName: studentLName,
      email: studentEmail,
      faculty: studentFaculty,
      id: id,
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      studentId: Yup.string()
        .min(4, "Cannot be less than 4 characters")
        .required("Required"),
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      faculty: Yup.string().required("Required"),
    }),

    // alert(JSON.stringify(values, null, 2));
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await saveStudent(values);
        history.push("/students");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          // setFieldError(
          //   "genre",
          //   "Genre already exist. Please Select an unique genre."
          // );
          // setError(ex.response.data);
          console.log(ex.response);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='studentForm'>
        <div className='form-group'>
          <label htmlFor='studentId'>Student Id</label>
          <input
            id='studentId'
            name='studentId'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.studentId}
            className='form-control'
            placeholder='Enter Student Id'
          />
          {formik.touched.studentId && formik.errors.studentId ? (
            <div>{formik.errors.studentId}</div>
          ) : null}
        </div>
        <div className='form-group'>
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

        <div className='form-group'>
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
        <div className='form-group'>
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
        {/* <div className='form-group'>
          <input
            className='form-control'
            id='_id'
            name='_id'
            type='hidden'
            value={formik.values._id}
          />
        </div> */}
        <div className='form-group'>
          <label htmlFor='faculty'>Faculty</label>
          <select
            className='form-control'
            id='faculty'
            name='faculty'
            type='faculty'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.faculty}
            placeholder='Choose Faculty'
          >
            <option value='' label='Select a Faculty' />
            <option value='Plus2' label='Plus2' />
            <option value='Bachelors' label='Bachelors' />
            <option value='Masters' label='Masters' />
          </select>
          {formik.touched.faculty && formik.errors.faculty ? (
            <div>{formik.errors.faculty}</div>
          ) : null}
        </div>
        <div>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudentForm;
