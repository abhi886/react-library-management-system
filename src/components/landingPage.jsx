import React from "react";
import RegisterForm from "./registerForm";
// import bgImage from "../public/bg.jpeg";


function landingPage() {
  return (
    <div className='landingPage container'>
      <div className="landingBg">
        <div className="bgImage">
        </div>
      </div>
      <div className='row align-items-center g-lg-5 py-5'>
        <div className='col-lg-7 text-center text-lg-start'>
          <h1 className='display-4 fw-bold lh-1 mb-3'>
            Library Management System
          </h1>
          <p className='col-lg-10 fs-4 indexTitleDescription'>
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
