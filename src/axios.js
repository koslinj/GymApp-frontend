import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
});

export default instance;