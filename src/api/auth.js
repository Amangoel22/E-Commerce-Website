import axiosInstance from './axiosInstance'

export const registerUser = async (data) => {
    return axiosInstance.post('/auth/register', data)
}

export const loginUser = async (data) => {
    return axiosInstance.post('/auth/login', data)
}