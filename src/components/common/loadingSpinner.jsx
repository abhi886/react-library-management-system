import React from "react";
import ReactLoading from "react-loading";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 90px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ReactLoading
        className={{ border: "1px solid blue" }}
        type={"spokes"}
        color={"#0b3060"}
        height={50}
        width={50}
      />
    </div>
  );
}
