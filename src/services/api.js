import axios from 'axios';

// create axios instance
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
