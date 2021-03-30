import React from "react";

function MessageForm({ onSubmit }) {
  const initialState = { message: "" };
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message"></label>
        <textarea
          name="message"
          type="text"
          value={state.message}
          onChange={handleChange}
          required
          className="form-field"
        ></textarea>
        <button type="submit" className="login-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
