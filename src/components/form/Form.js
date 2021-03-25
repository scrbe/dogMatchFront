import React from "react";
import "./form.css";

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
    <form onSubmit={handleSubmit} className="form">
      <div className="input-container">
        <label htmlFor="email">Email</label>

        <input
          name="email"
          type="text"
          value={state.email}
          onChange={handleChange}
          required
          placeholder="Your email address"
          className="form-field"
        ></input>
      </div>

      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          required
          placeholder="Choose a safe one :)"
          className="form-field"
        ></input>
      </div>
      <div className="btn-container">
        <button type="submit" className="login-btn">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default Form;
