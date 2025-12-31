import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    // Accept: 'application/json, text/plain, */*',
    // 'Accept-Encoding': 'gzip, deflate, br, zstd',
  },
});

export default instance;
