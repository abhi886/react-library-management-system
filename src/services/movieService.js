import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovieToRenameGenre(genreId) {
  return http.get(`${apiEndpoint}/getMoviesToRename/${genreId}`);
}
export function renameMovieToRenameGenre(movieId, genre) {
  return http.put(`${apiEndpoint}/editMoviesToRename/${movieId}`, genre);
}
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  // Updaating a movie
  if (movie.get("_id")) {
    const data = movie.get("_id");

    movie.delete("_id");
    return http.put(movieUrl(data), movie);
  }
  // // Saving a new movie
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
