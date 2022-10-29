import React from "react";
import { useState, useEffect } from "react";
import useForm from "../customHooks/useForm";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import CancelButton from "../common/cancelButton";
import {
  saveFaculty,
  getFaculty,
  deleteFaculty,
} from "../../services/facultyService";

const FacultyForm = (props) => {
  const [id, SetId] = useState("");
  const [data, SetData] = useState({
    faculty: "",
  });
  const [error, SetError] = useState({});
  const history = useHistory();

  async function populateFaculty() {
    try {
      const facultyId = props.match.params.id;
      if (facultyId === "new") return;
      const { data: fac } = await getFaculty(facultyId);
      SetData({ faculty: fac.name });
      SetId(fac._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  }
  useEffect(() => {
    populateFaculty();
  }, []);

  const rule = {
    schema: {
      faculty: Joi.string(),
    },
    doSubmit: async () => {
      try {
        await saveFaculty({ facultyName: data.faculty, id: id });
        history.push("/students");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          SetError({ faculty: ex.response.data });
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
      <h4 className='mt-3'>{id ? "Edit" : "Add New"} Faculty</h4>
      <form
        className='p-4 p-md-5 border rounded-3 bg-light'
        onSubmit={submitHandler}
      >
        {renderInput({
          label: `${!id ? "Enter" : ""} ${!id ? "New" : "Edit"} Faculty`,
          name: "faculty",
        })}
        <hr />
        <div className='d-flex flex-row justify-content-end'>
          <div className='p-2'>{renderButton("Submit")}</div>
          <div className='p-2'>
            <CancelButton linkTo='/students'>Cancel</CancelButton>
          </div>
          {id && (
            <div className='p-2'>
              <button
                className='btn btn-danger openModalBtn'
                style={{ marginRight: 4 }}
                type='button'
                onClick={async () => {
                  // setOpenModal(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FacultyForm;
