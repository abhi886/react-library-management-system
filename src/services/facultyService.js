import http from "./httpService";
const apiEndpoint = "/faculties";

function facultyUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFaculties() {
  return http.get("/faculties");
}

export function getFaculty(genreId) {
  return http.get(facultyUrl(genreId));
}

export function saveFaculty(f) {
  //   Updaating a faculty
  if (f.id) {
    let faculty = {
      name: f.facultyName,
      _id: f.id,
    };
    // console.log("edit");
    const body = { ...faculty };
    delete body._id;
    return http.put(facultyUrl(faculty._id), body);
  }
  let faculty = {
    name: f.facultyName,
  };
  // // Saving a new genre
  return http.post(apiEndpoint, faculty);
}

export function deleteFaculty(facultyId) {
  return http.delete(facultyUrl(facultyId));
}
