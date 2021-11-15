import http from "./httpService";
const apiEndpoint = "/genres";

function genreUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getGenres() {
  return http.get("/genres");
}

export function getGenre(genreId) {
  return http.get(genreUrl(genreId));
}

export function saveGenre(g) {
  // Updaating a genre
  if (g.id) {
    let genre = {
      name: g.genreName,
      _id: g.id,
    };
    // console.log("edit");
    const body = { ...genre };
    delete body._id;
    return http.put(genreUrl(genre._id), body);
  }
  let genre = {
    name: g.genreName,
  };
  // // Saving a new genre
  return http.post(apiEndpoint, genre);
}

export function deleteGenre(genreId) {
  return http.delete(genreUrl(genreId));
}
