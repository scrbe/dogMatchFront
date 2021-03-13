import React from 'react'
import AuthForm from '../components/auth/Auth'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import {login, signup} from '../service/auth.service'
import { useAuth } from '../context/AuthContext'

function Auth() {
    const { auth } = useParams()
    const { push } = useHistory()
    const { setUser } = useAuth()
    
    const handleLogin = async (user) => {
        try {
            const { data } = await login(user)
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data.user))
            console.log('data.user -->', data.user)
            setUser({ user: data.user });
            push('/')
        } catch (error) {
            console.log(error);
        }
        console.log(user)
    }

    const handleSignUp = async (user) => {
        try {
            const { data } = await signup(user)
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data.user))
            console.log('data.user -->', data.user)
            setUser({ user: data.user });
            push('/')
        } catch (error) {
            console.log(error);
        }

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