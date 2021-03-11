import React from "react";

function Form({ buttonText, onSubmit }) {
  const initialState = { email: "", password: "" };
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
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        value={state.password}
        onChange={handleChange}
        required
      ></input>
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default Form;
