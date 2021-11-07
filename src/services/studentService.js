import http from "./httpService";

const apiEndpoint = "/students";

function studentUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getStudents() {
  return http.get(apiEndpoint);
}

export function getStudent(movieId) {
  return http.get(studentUrl(movieId));
}

export function saveStudent(student) {
  // Updaating a movie
  //   if (student._id) {
  //     const body = { ...student };
  //     delete body._id;
  //     return http.put(studentUrl(student._id), body);
  //   }

  // Saving a new movie
  return http.post(apiEndpoint, student);
}

export function deleteStudent(movieId) {
  return http.delete(studentUrl(movieId));
}
