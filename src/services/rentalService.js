import http from "./httpService";

const apiEndpoint = "/rentals";

function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}
// export function getRentals() {
//   return http.get(apiEndpoint);
// }

// export function getRental(movieId) {
//   return http.get(rentalUrl(movieId));
// }

export function hireBook(studentId, movieId) {
  const formData = new FormData();
  formData.append("studentId", studentId);
  formData.append("movieId", movieId);
  return http.post(apiEndpoint, formData);
  // console.log("reached Here");
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
