import React from 'react'
import AuthForm from '../components/auth/Auth'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import {login, signup} from '../service/auth.service'

function Auth() {
    const { auth } = useParams()
    const { push } = useHistory()
    
    const handleLogin = async (user) => {
        await login(user)
        push('/')
    }

    const handleSignUp = async (user) => {
        await signup(user)
        push('/')
    }

    if (auth === 'login') {
    return <div>
        <h2>hola</h2>
        <AuthForm buttonText='login' onSubmit={handleLogin}></AuthForm>
    </div>
    }
    
    if (auth === 'signup') {
        return <div>
            <h2>hola</h2>
            <AuthForm buttonText='signup' onSubmit={handleSignUp}></AuthForm>
        </div>
    }
    return <Redirect to='/'/>
}

export default Auth