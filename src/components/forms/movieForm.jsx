import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";
import BookCode from "../common/tagInput";
import CancelButton from "../common/cancelButton";
import InputBox from "../inputBox";
import { toast } from "react-toastify";
import useForm from "../customHooks/useForm";

const MovieForm = (props) => {
  const [data, SetData] = useState({
    title: "",
    genreId: "",

    dailyRentalRate: "",
    author: "",
    tag: [],
    bookImage: "",
  });
  const [error, SetError] = useState({});
  const [genres, SetGenres] = useState([]);

  const mapToViewMode = (movie) => {
    let tempTag = movie.tag;
    const movieTags = tempTag.map((t) => t.bookCode);

    return {
      // _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      dailyRentalRate: movie.dailyRentalRate,
      author: movie.author,
      tag: movieTags,
      bookImage: movie.bookImage,
    };
  };

  const populateGenre = async () => {
    try {
      const { data: genres } = await getGenres();
      SetGenres(genres);
    } catch (ex) {
      console.log(ex);
    }
  };

  const populateMovie = async () => {
    try {
      const movieId = props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      console.log("map to view", mapToViewMode(movie));
      console.log(movie);
      SetData(mapToViewMode(movie));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        props.history.replace("/not-found");
    }
  };

  useEffect(() => {
    populateGenre();
    populateMovie();
  }, []);

  const rule = {
    schema: {
      _id: Joi.string(),
      title: Joi.string().required().label("Title"),
      genreId: Joi.string().required().label("Genre"),
      dailyRentalRate: Joi.number().required().label("Rate"),
      author: Joi.string().min(3).max(30).required().label("Author"),
      tag: Joi.array().min(1).label("Book Code"),
      bookImage: Joi.label("Book Image"),
    },
    doSubmit: async (e) => {
      const formData = new FormData();
      if (props.match.params.id !== "new") {
        formData.append("_id", props.match.params.id);
      }
      formData.append("title", data.title);
      formData.append("genreId", data.genreId);
      formData.append("dailyRentalRate", data.dailyRentalRate);
      formData.append("author", data.author);
      formData.append("tag", JSON.stringify(data.tag));
      if (typeof data.bookImage !== "string") {
        formData.append("file", data.bookImage);
      }
      try {
        console.log(formData);
        await saveMovie(formData);
        // Send a toast notification
        toast.success("Success");
        props.history.push("/books");
      } catch (error) {
        console.log(error);
      }
    },
    data,
    SetData,
    error,
    SetError,
  };
  const { renderButton, renderInput, renderDropdown, submitHandler } =
    useForm(rule);

  const handleAddItem = (tagValue) => {
    tagValue = [...data.tag, tagValue];
    const tag = { tag: tagValue };
    SetData((prev) => {
      return { ...prev, ...tag };
    });
  };
  const handleRemoveItem = (index) => {
    console.log(index);
    const tag = data.tag.filter((item, i) => i !== index);
    SetData((prev) => {
      return { ...prev, ...tag };
    });
  };

  const handleAddImage = (e) => {
    const bookImage = { bookImage: e.target.files[0] };
    console.log(bookImage);
    SetData((prev) => {
      return { ...prev, ...bookImage };
    });
  };
  const handleRemoveImage = () => {
    const bookImage = { bookImage: null };
    console.log(bookImage);
    SetData((prev) => {
      return { ...prev, ...bookImage };
    });
  };

  return (
    <div className='container'>
      <h3 className='mt-3'>
        {props.match.params.id === "new" ? "Add New Book" : "Edit Book"}
      </h3>
      <form onSubmit={submitHandler} encType='multipart/form-data'>
        <div className='row'>
          <div className='col col-md-6 col-sm-12 col-12'>
            {renderInput({ label: "Title", name: "title" })}
            {renderDropdown({
              label: "Genre",
              name: "genreId",
              options: genres,
            })}
            {renderInput({ label: "Rental Rate", name: "dailyRentalRate" })}
            <BookCode
              value={data.tag}
              addItem={handleAddItem}
              removeItem={handleRemoveItem}
              errorParent={error.tag}
            />
            {renderInput({ label: "Author", name: "author" })}
          </div>
          <div className='col col-md-4 col-sm-12 col-12 mx-auto'>
            <InputBox
              Image={data.bookImage}
              addImageToPost={handleAddImage}
              removeImage={handleRemoveImage}
            />
          </div>
        </div>
        <div className='d-flex'>
          {renderButton("Register")}
          <div className='ms-2'>
            <CancelButton linkTo={"/books"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
