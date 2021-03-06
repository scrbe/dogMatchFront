import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/auth'
})

export const login = (user) => api.post('/login', user) 
export const signup = (user) => api.post('/signup', user) 