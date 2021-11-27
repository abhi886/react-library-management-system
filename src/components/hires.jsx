import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { getMovie } from "../services/movieService";
import { getStudentFromId } from "../services/studentService";
import { hireBook } from "../services/rentalService";

import CancelButton from "./common/cancelButton";

function Hires(props) {
  const [mId, SetMId] = useState("");
  const [title, SetTitle] = useState("");
  const [genre, SetGenre] = useState("");
  const [numberOfStock, SetNumberOfStock] = useState("");
  const [author, SetAuthor] = useState("");
  const [bookImage, SetBookImage] = useState("");
  const [tags, SetTags] = useState("");

  const [studentId, SetStudentId] = useState("");
  const [studentFName, SetStudentFName] = useState("");
  const [studentLName, SetStudentLName] = useState("");
  const [studentEmail, SetStudentEmail] = useState("");
  const [studentFaculty, SetStudentFaculty] = useState("");
  const [sid, SetSid] = useState("");
  const [faculty, SetFaculty] = useState("");
  const [studentImage, SetStudentImage] = useState("");
  const [hireBookCode, SetHireBookCode] = useState("");

  async function populateMovie() {
    try {
      const movieId = props.match.params.id;
      const { data: movie } = await getMovie(movieId);
      SetMId(movie._id);
      SetTitle(movie.title);
      SetGenre(movie.genre);
      SetNumberOfStock(movie.numberInStock);
      SetAuthor(movie.author);
      SetBookImage(movie.bookImage);
      SetTags(movie.tag);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  }
  useEffect(() => {
    populateMovie();
  }, []);

  const formik = useFormik({
    initialValues: {
      studentId: studentId,
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      studentId: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const formData = new FormData();
        formData.append("studentId", values.studentId);
        //   GET THE STUDENT INFORMATION
        const studentInfo = await getStudentFromId(formData);
        //  AND UPDATE THE STATE
        // console.log(studentInfo.data[0].firstName);
        SetSid(studentInfo.data[0]._id);
        SetStudentFName(studentInfo.data[0].firstName);
        SetStudentLName(studentInfo.data[0].lastName);
        SetStudentEmail(studentInfo.data[0].email);
        SetStudentFaculty(studentInfo.data[0].faculty);
        SetStudentImage(studentInfo.data[0].studentImage);
      } catch (ex) {
        if (
          (ex.response && ex.response.status === 400) ||
          ex.response.status === 404
        ) {
          toast.error(ex.response.data);
          console.log(ex.response);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleHire = async (sid, mId) => {
    try {
      if (hireBookCode === "") {
        toast.error("Select a Book Code");
        return;
      }
      await hireBook(sid, mId);
      toast.success("Success.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookCodeChange = (e) => {
    SetHireBookCode(e.target.value);
  };

  return (
    <div className='container'>
      <div className='row'>
        <h4>Book Information</h4>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-4'>
              {" "}
              {bookImage && (
                <img
                  src={`http://localhost:3900/${bookImage}`}
                  height={150}
                  width={150}
                  alt=''
                />
              )}
              {!bookImage && (
                <img
                  src='https://i.picsum.photos/id/1032/150/150.jpg?hmac=DIbf0xC_HJchjLmN2loyEXyeaXfce8QqT9nqc4vF4PU'
                  height={150}
                  width={150}
                  alt=''
                />
              )}
            </div>
            <div className='col-md-8'>
              {" "}
              <p>Title: {title}</p>
              <p>Genre: {genre.name}</p>
              <p>No. of Stock: {numberOfStock}</p>
              <p>Author: {author}</p>
              <form action=''>
                <div className='form-group'>
                  <label> Book Codes</label>
                  <select
                    className='form-control'
                    onChange={(e) => handleBookCodeChange(e)}
                  >
                    <option value=''>Choose a Book Code</option>
                    {tags &&
                      tags.map((t, i) => (
                        <option value={t} key={i}>
                          {t}
                        </option>
                      ))}
                  </select>
                </div>
              </form>{" "}
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Student Information</h4>
          <div className='row'>
            <div className='col-md-6'>
              {" "}
              <form onSubmit={formik.handleSubmit}>
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
                <div>
                  <button className='btn btn-primary mt-2' type='submit'>
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className='col-md-6'>
              {" "}
              {studentFName && (
                <>
                  <div className='row'>
                    <div className='col-md-12'>
                      {studentImage && (
                        <img
                          src={`http://localhost:3900/${studentImage}`}
                          height={150}
                          width={150}
                          alt=''
                        />
                      )}
                    </div>
                    <p>FirstName: {studentFName}</p>
                    <p>last Name: {studentLName}</p>
                    <p>Email: {studentEmail}</p>
                    <p>Faculty: {studentFaculty}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          {" "}
          <CancelButton linkTo='/movies' />
          {studentFName && (
            <button
              className='btn btn-primary mt-2'
              onClick={() => handleHire(sid, mId)}
            >
              Hire Book
            </button>
          )}
        </div>
        <div className='col-md-8'></div>
      </div>
    </div>
  );
}

export default Hires;
