import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
// import { getMovies, saveMovie } from "../services/fakeMovieService";

class NewMovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  componentDidMount() {
    // const genres = getGenres();
    this.setState({ genres: getGenres() });
    // const movieId = this.props.match.params.id;
    // console.log(movieId);
    // const movie = getMovies(movieId);
    // if (!movie) return this.props.history.replace("/not-found");

    // this.setState({ data: this.mapToViewMode(movie) });
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().alphanum().min(3).max(30).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.string().required().label("No of Stock"),
    dailyRentalRate: Joi.string().required().label("Rate"),
  };

  mapToViewMode(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    Joi.validate(obj, schema);
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  doSubmit = () => {
    // saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div className='container'>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default NewMovie;
