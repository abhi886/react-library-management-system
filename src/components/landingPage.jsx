import React from "react";
import RegisterForm from "./registerForm";

function landingPage() {
  return (
    <div className='container'>
      <div class='row align-items-center g-lg-5 py-5'>
        <div class='col-lg-7 text-center text-lg-start'>
          <h1 class='display-4 fw-bold lh-1 mb-3'>Library Management System</h1>
          <p class='col-lg-10 fs-4'>
            It’s the easiest, fastest way to manage your books. Created using
            the MERN stack, Library Management System is an open source project
            hosted over github. Feel free to contribute.
          </p>
        </div>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
}

export default landingPage;
