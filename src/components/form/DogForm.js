import React from "react";
import { addImageService } from "../../service/dog.service";
import "./form.css";

function DogForm({ onSubmit }) {
  const initialState = {
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    image: "",
  };

  const [state, setState] = React.useState(initialState);
  const [image, setImage] = React.useState(false);
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleUpload = async (event) => {
    setImage(false);
    const img = event.target.files;
    const uploadImg = new FormData();
    uploadImg.append("dogImage", img[0]);
    const { data } = await addImageService(uploadImg);
    setState({ ...state, dogImage: data });
    setImage(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name*</label>
      <input
        name="name"
        type="text"
        value={state.name}
        onChange={handleChange}
        required
        className="form-field"
      ></input>
      <label htmlFor="breed">Breed*</label>
      <input
        name="breed"
        type="text"
        value={state.breed}
        onChange={handleChange}
        required
        className="form-field"
      ></input>
      <label htmlFor="gender">Gender*</label>
      <input
        name="gender"
        type="text"
        value={state.gender}
        onChange={handleChange}
        required
        className="form-field"
      ></input>
      <label htmlFor="age">Age*</label>
      <input
        name="age"
        type="text"
        value={state.age}
        onChange={handleChange}
        required
        className="form-field"
      ></input>
      <label htmlFor="description">Description*</label>
      <textarea
        name="description"
        cols="30"
        rows="3"
        value={state.description}
        onChange={handleChange}
        required
        className="form-field"
      ></textarea>
      <label htmlFor="image">Upload Image*</label>
      <input
        type="file"
        name="image"
        value={state.image}
        onChange={handleUpload}
      ></input>
      <button type="submit" disabled={!image} className="login-btn">
        Submit
      </button>
    </form>
  );
}

export default DogForm;
