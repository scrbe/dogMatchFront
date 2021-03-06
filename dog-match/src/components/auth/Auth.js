import React from 'react'

function Auth({ buttonText, onSubmit }) {
    const initialState = {email: '', password:''}
    const [state, setState] = React.useState(initialState)
    const handleChange = ({target}) => {
        setState({...state, [target.name]:target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(state)
    }
    return (
        <form>
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' value={state.email} onChange={handleChange}></input>
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' value={state.password} onChange={handleChange}></input>
            <button onSubmit={handleSubmit}>{buttonText}</button>
        </form>
    )
}

export default Auth