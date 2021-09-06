import axios from 'axios'

export const apiLogin = (request_data) => {
    return axios.post('/login', request_data)
}

export const fetchProfile = (token) => {
    return axios.get('/me')
}