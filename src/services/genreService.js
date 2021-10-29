import http from "./httpService";
const apiEndpoint = "/genres";

// function genreUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

export function getGenres() {
  return http.get("/genres");
}

export function saveGenre({ genreName }) {
  let genre = {
    name: genreName,
  };
  // Updaating a genre
  // if (genre._id) {
  //   const body = { ...genre };
  //   delete body._id;
  //   return http.put(genreUrl(genre._id), body);
  // }

  // // Saving a new genre
  return http.post(apiEndpoint, genre);
}
