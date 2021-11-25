import http from "./httpService";

const apiEndpoint = "/students";

function studentUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getStudents() {
  return http.get(apiEndpoint);
}

export function getStudent(studentId) {
  return http.get(studentUrl(studentId));
}

export function saveStudent(student) {
  // Updaating a movie
  // for (var value of student.values()) {
  //   console.log(value);
  // }
  // console.log(student);
  if (student.get("_id")) {
    const data = student.get("_id");

    student.delete("_id");
    return http.put(studentUrl(data), student);
  }
  // // Saving a new student
  return http.post(apiEndpoint, student);
}

export function deleteStudent(studentId) {
  return http.delete(studentUrl(studentId));
}
