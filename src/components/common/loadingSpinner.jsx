import React from "react";
import ReactLoading from "react-loading";

export default function LoadingSpinner({ type, color, text }) {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 90px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ReactLoading
        className={{ border: "1px solid blue" }}
        type={type}
        color={color}
        height={50}
        width={50}
      />
      <div> {text}</div>
    </div>
  );
}
