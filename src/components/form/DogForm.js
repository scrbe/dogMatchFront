import React from "react";
import { addImageService } from "../../service/dog.service";

function DogForm({ onSubmit }) {
  const initialState = {
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    dogImage: "",
  };

  const [state, setState] = React.useState(initialState);
  const [image, setImage] = React.useState(false);
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleUpload = async (event) => {
    setImage(false); // por qué hacemos esto si este es el estado inicial ? setImage(false) --> setImage(true)
    const img = event.target.files;
    console.log("IMG -->", img);
    const uploadImg = new FormData();
    uploadImg.append("dogImage", img[0]);
    console.log("uploadImg -->", uploadImg);
    const { data } = await addImageService(uploadImg);
    console.log("Image -->", data);
    setState({ ...state, dogImage: data });
    setImage(!image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        name="name"
        type="text"
        value={state.name}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="breed">Breed</label>
      <input
        name="breed"
        type="text"
        value={state.breed}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="gender">Gender</label>
      <input
        name="gender"
        type="text"
        value={state.gender}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="age">Age</label>
      <input
        name="age"
        type="text"
        value={state.age}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        cols="30"
        rows="3"
        value={state.description}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="image">Upload Image</label>
      <input
        type="file"
        name="image"
        value={state.image}
        onChange={handleUpload}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DogForm;
