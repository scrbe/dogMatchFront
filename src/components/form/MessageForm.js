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
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        type="text"
        value={state.message}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MessageForm;
