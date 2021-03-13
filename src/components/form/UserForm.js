import React from "react";

function UserForm({ onSubmit }) {
  const initialState = { city: "", username: "" };
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
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="text"
        value={state.email}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        type="text"
        value={state.username}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="user-image">Upload Image</label>
      <input type="file" name="user-image"></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
