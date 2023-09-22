import { AxiosRequestConfig } from "axios";
import { get } from "../config/api.config";


export const getBooksList = async (request: AxiosRequestConfig) => {
    return get(``, { ...request });
}

export const getBookById = async (request: AxiosRequestConfig) => {
    const { params } = request;
    return get(`/${params}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`, {});
}