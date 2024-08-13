import axios from 'axios';

const api = axios.create({
    baseURL: 'https://REMOVED/api',
});

export { api };

