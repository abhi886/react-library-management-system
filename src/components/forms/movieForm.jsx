import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";
import BookCode from "../common/tagInput";
import CancelButton from "../common/cancelButton";
import InputBox from "../inputBox";
import { toast } from "react-toastify";
import { min } from "lodash";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      author: "",
      tag: [],
      bookImage: "",
    },
    genres: [],
    errors: {},
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      console.log(movie);
      this.setState({ data: this.mapToViewMode(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().label("No of Stock"),
    dailyRentalRate: Joi.number().required().label("Rate"),
    author: Joi.string().min(3).max(30).required().label("Author"),
    tag: Joi.array().min(1).label("Book Code"),
    bookImage: Joi.label("Book Image"),
  };

  mapToViewMode(movie) {
    let tempTag = movie.tag;
    const movieTags = tempTag.map((t) => t.bookCode);

    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      author: movie.author,
      tag: movieTags,
      bookImage: movie.bookImage,
    };
  }

  doSubmit = async (e) => {
    const formData = new FormData();
    if (this.state.data._id) {
      formData.append("_id", this.state.data._id);
    }
    formData.append("title", this.state.data.title);
    formData.append("genreId", this.state.data.genreId);
    formData.append("numberInStock", this.state.data.numberInStock);
    formData.append("dailyRentalRate", this.state.data.dailyRentalRate);
    formData.append("author", this.state.data.author);
    formData.append("tag", JSON.stringify(this.state.data.tag));
    if (typeof this.state.data.bookImage !== "string") {
      formData.append("file", this.state.data.bookImage);
    }
    try {
      await saveMovie(formData);
      // Send a toast notification
      toast.success("Success");
      this.props.history.push("/books");
    } catch (error) {
      console.log(error);
    }
    // INITIAL
    // await saveMovie(this.state.data);
    // this.props.history.push("/movies");
  };

  handleAddItem = (tagValue) => {
    const data = { ...this.state.data };
    data["tag"] = [...this.state.data.tag, tagValue];
    console.log(data);
    this.setState({ data });
  };

  handleRemoveItem = (index) => {
    const data = { ...this.state.data };
    const tags = [...this.state.data.tag];
    data["tag"] = tags.filter((item, i) => i !== index);
    this.setState({ data });
  };

  handleAddImage = (e) => {
    const data = { ...this.state.data };
    data["bookImage"] = e.target.files[0];
    this.setState({ data });
  };
  handleRemoveImage = () => {
    const data = { ...this.state.data };
    data["bookImage"] = null;
    this.setState({ data });
  };

  render() {
    return (
      <div className='container'>
        <h3 className='mt-3'>
          {this.props.match.params.id === "new" ? "Add New Book" : "Edit Book"}
        </h3>
        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <div className='row'>
            <div className='col col-md-6 col-sm-12 col-12'>
              {this.renderInput("title", "Title")}
              {this.renderDropdown("genreId", "Genre", this.state.genres)}
              {this.renderInput("numberInStock", "Number In Stock")}
              {this.renderInput("dailyRentalRate", "Rate")}
              <BookCode
                value={this.state.data.tag}
                addItem={this.handleAddItem}
                removeItem={this.handleRemoveItem}
                errorParent={this.state.errors.tag}
              />
              {this.renderInput("author", "Author")}
            </div>
            <div className='col col-md-4 col-sm-12 col-12'>
              <InputBox
                Image={this.state.data.bookImage}
                addImageToPost={this.handleAddImage}
                removeImage={this.handleRemoveImage}
              />
            </div>
          </div>
          <div className='d-flex'>
            {this.renderButton("Register")}
            <div className='ms-2'>
              <CancelButton linkTo={"/books"} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MovieForm;
