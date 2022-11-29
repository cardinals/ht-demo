import axios from '@/axios'

export const Login = (params) => {
    console.info(axios.post('/login', params));
    return axios.post('/login', params)
}