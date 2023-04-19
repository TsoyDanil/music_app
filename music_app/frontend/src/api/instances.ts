import axios, { InternalAxiosRequestConfig } from "axios";
import { baseUrl } from "./baseUrl";

export const instance = axios.create({
    baseURL: baseUrl
})

instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token){
        req.headers.Authorization = token
    }
    return req
})