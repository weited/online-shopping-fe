import axios from 'axios';

// create axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
