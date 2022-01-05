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
export function getStudentFromId(student) {
  // for (var value of studentId.values()) {
  //   console.log(value);
  // }
  return http.post(studentUrl(`getInfo/${student.get("studentId")}`));
}

export function saveStudent(student) {
  // Updating a Movie
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
