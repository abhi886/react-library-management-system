import http from "./httpService";

const apiEndpoint = "/rentals";

function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getRentals() {
  return http.get(apiEndpoint);
}

export async function getReformattedRentals() {
  try {
    const { data: info } = await http.get(apiEndpoint);
    let reformattedArray = info.map((obj) => {
      let rObj = {};
      rObj._id = obj._id;
      rObj.bookTitle = obj.movie.title;
      rObj.bookCode = obj.movie.bookCode;
      rObj.author = obj.movie.author;
      rObj.studentName = obj.student.firstName + " " + obj.student.lastName;
      rObj.studentId = obj.student.stuId;
      rObj.studentFaculty = obj.student.faculty;
      rObj.status = obj.status;
      return rObj;
    });
    return reformattedArray;
  } catch (ex) {}
}

export function getRental(movieId) {
  return http.get(rentalUrl(movieId));
}

export function hireBook(studentId, movieId, bookCode) {
  const formData = new FormData();
  formData.append("studentId", studentId);
  formData.append("movieId", movieId);
  formData.append("bookCode", bookCode);
  return http.post(apiEndpoint, formData);
}

export function returnRentals(rentalId) {
  return http.post(rentalUrl(`return/${rentalId}`));
}
// export function saveRental(movie) {
//   // Updaating a movie
//   if (movie.get("_id")) {
//     const data = movie.get("_id");

//     movie.delete("_id");
//     return http.put(rentalUrl(data), movie);
//   }
//   // // Saving a new movie
//   return http.post(apiEndpoint, movie);
// }

// export function deleteMovie(movieId) {
//   return http.delete(rentalUrl(movieId));
// }
