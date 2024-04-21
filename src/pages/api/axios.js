import axios from 'axios';


export const API = axios.create({
    baseURL: 'https://localhost:7240',
    timeout: 100000,
});