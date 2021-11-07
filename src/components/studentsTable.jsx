import React from "react";

function StudentsTable({ students }) {
  return (
    <div>
      {students.map((s) => (
        <div key={s._id}>{s.firstName}</div>
      ))}
    </div>
  );
}

export default StudentsTable;
