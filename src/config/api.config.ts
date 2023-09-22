import axios, { AxiosRequestConfig } from "axios";


export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const get = async (path: string, config?: AxiosRequestConfig) => {
    return await axiosClient
        .get(`${path}`, config)
        .then((response) => response.data)
        .catch((error) => {throw error.response.data});
}