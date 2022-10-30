import React, { useState } from "react";
import Joi from "joi-browser";
import auth from "services/authService";
import useForm from "components/customHooks/useForm";
import LoadingSpinner from "../common/loadingSpinner";

function LoginForm() {
  const [data, SetData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, SetError] = useState({});
  const [isLoading, SetIsLoading] = useState(false);

  const rule = {
    schema: {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
      rememberMe: Joi.boolean(),
    },
    doSubmit: async () => {
      // Call the server
      try {
        SetIsLoading(true);
        await auth.login(data.username, data.password, data.rememberMe);
        window.location = "/books";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          SetError({ username: ex.response.data });
          SetIsLoading(false);
        }
      }
    },
    data,
    SetData,
    error,
    SetError,
  };
  const { renderInput, renderButton, renderCheckbox, submitHandler } =
    useForm(rule);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner
          type={"balls"}
          color={"#0b3060"}
          text={"Getting Things Ready For You !!"}
        />
      ) : (
        <div className='col-md-10 mx-auto col-lg-4 mt-3'>
          <h1 className='d-flex justify-content-center'>Welcome</h1>
          <p className='d-flex justify-content-center'>
            Login to your LMS account
          </p>
          <form
            className='p-4 p-md-5 border rounded-3 bg-light'
            onSubmit={submitHandler}
          >
            {renderInput({ label: "Username", name: "username" })}
            {renderInput({
              label: "Password",
              name: "password",
              type: "password",
            })}
            {renderCheckbox({
              label: "Remember Me",
              name: "rememberMe",
              type: "checkbox",
            })}
            <div className='mt-4'>{renderButton("Login")}</div>
            <hr className='my-4' />
            <small className='text-muted'>
              Log in via SSO | Reset Password | Resend Confirmation | Unlock
              Account
            </small>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginForm;
