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
  console.log("res", student);
  // Updaating a student
  if (student.id) {
    const body = { ...student };
    delete body.id;
    return http.put(studentUrl(student.id), body);
  }

  // Saving a new movie
  return http.post(apiEndpoint, student);
}

export function deleteStudent(studentId) {
  return http.delete(studentUrl(studentId));
}
