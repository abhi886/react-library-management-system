import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
    state = { 
        movies : getMovies(),
     }
    render() { 
        return ( 
            <>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
    </tr>
  </thead>
  <tbody>
    
    
      {this.state.movies.map (movie =><tr> <td>{movie.title}</td> <td>{movie.numberInStock}</td> </tr>) }  
         
  </tbody>
</table>
            </>
         );
    }
}
 
export default Movie;