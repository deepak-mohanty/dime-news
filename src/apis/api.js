import axios from 'axios';

const API_KEY = '367eec3490524b158c52b0dff8e05769';

const apiInstance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: {
        apiKey: API_KEY
    }
})

export default apiInstance;