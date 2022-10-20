import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { getMovie } from "../services/movieService";
import { getStudentFromId } from "../services/studentService";
import { hireBook } from "../services/rentalService";

import CancelButton from "./common/cancelButton";

function Hires(props) {
  const history = useHistory();

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
        SetStudentId(studentInfo.data[0].studentId);
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
      await hireBook(sid, mId, hireBookCode);
      history.push("/movies");

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
        <h4 className='mt-4 mb-4'>Book Information</h4>

        <div className='col col-12  col-sm-6 col-md-4 col-12'>
          <div className='card'>
            {bookImage && (
              <img
                src={`http://localhost:3900/${bookImage}`}
                alt={"Book Pic"}
              />
            )}
            {!bookImage && (
              <img
                src={
                  "https://i.picsum.photos/id/1032/150/150.jpg?hmac=DIbf0xC_HJchjLmN2loyEXyeaXfce8QqT9nqc4vF4PU"
                }
                alt=''
              />
            )}{" "}
            <div className='card-body'>
              <h5 className='card-title'>{title}</h5>
              <p className='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col-6'>Genre</div>
                  <div className='col-6'>{genre.name}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col-6'>No of Stock</div>
                  <div className='col-6'>{numberOfStock}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col-6'>No of Stock</div>
                  <div className='col-6'>{numberOfStock}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col-6'>Author</div>
                  <div className='col-6'>{author}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col-6'>Book Codes</div>
                  <div className='col-6'>
                    {" "}
                    <select
                      className='form-control'
                      onChange={(e) => handleBookCodeChange(e)}
                    >
                      <option value=''>Choose a Book Code</option>
                      {tags &&
                        tags.map((t, i) => (
                          <option
                            value={t.bookCode}
                            key={i}
                            disabled={t.status === "0" ? false : true}
                          >
                            {t.bookCode}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className='col'>
          <h4>Student Information</h4>
          <div className='row'>
            <div className='col-md-12'>
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
            <div className='col-md-12'>
              {" "}
              {studentFName && (
                <div className='row' style={{ marginTop: "0.9rem" }}>
                  <div className='col col-md-4'>
                    {" "}
                    {studentImage && (
                      <img
                        src={`http://localhost:3900/${studentImage}`}
                        alt=''
                      />
                    )}
                    {!studentImage && (
                      <img
                        src={
                          "https://i.picsum.photos/id/1032/150/150.jpg?hmac=DIbf0xC_HJchjLmN2loyEXyeaXfce8QqT9nqc4vF4PU"
                        }
                        alt=''
                      />
                    )}
                  </div>
                  <div className='col col-md-8'>
                    {" "}
                    <ul class='list-group list-group-flush'>
                      <li class='list-group-item'>
                        <div className='row'>
                          <div className='col col-md-4'> Name</div>
                          <div className='col col-md-6'>
                            {" "}
                            {studentFName} {studentLName}
                          </div>
                        </div>
                      </li>
                      <li class='list-group-item'>
                        {" "}
                        <div className='row'>
                          <div className='col col-md-4'> Faculty</div>
                          <div className='col col-md-6'> {studentFaculty}</div>
                        </div>
                      </li>
                      <li class='list-group-item'>
                        {" "}
                        <div className='row'>
                          <div className='col col-md-4'>Id</div>
                          <div className='col col-md-6'> {studentId}</div>
                        </div>
                      </li>
                      <li class='list-group-item'>
                        {" "}
                        <div className='row'>
                          <div className='col col-md-4'>Email</div>
                          <div className='col col-md-6'> {studentEmail}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
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
              style={{ marginLeft: ".4rem" }}
              className='btn btn-primary mt-2'
              onClick={() => handleHire(sid, mId, hireBookCode)}
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
