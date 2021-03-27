import React from "react";
import "./form.css";

function Form({ buttonText, onSubmit }) {
  const initialState = { email: "", password: "" };
  const [state, setState] = React.useState(initialState);
  const [error, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = ({ target }) => {
    setError(true);
    setState({ ...state, [target.name]: target.value });
  };
  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      onSubmit(state);
      setLoading(false);
      setState(initialState);
    } catch (error) {
      console.log("error :>> ", error);
      setError(error);
      setLoading(false);
    }
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
          className="form-field"
        ></input>
      </div>
      <div className="btn-container">
        <button type="submit" className="login-btn">
          {buttonText}
        </button>
        {error}
        {isLoading && "Loading..."}
      </div>
    </form>
  );
}

export default Form;
