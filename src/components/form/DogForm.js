import React from "react";

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
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
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
      <label htmlFor="dog-image">Upload Image</label>
      <input type="file" name="dog-image"></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DogForm;
