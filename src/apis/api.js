import axios from 'axios';

const NEWS_API_KEY = '367eec3490524b158c52b0dff8e05769';
const WEAHTHER_APIKEY = 'b54a9aa3edb488bad3e39f82f1b245ed';

export const newsApiInstance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: {
        apiKey: NEWS_API_KEY
    }
});

export const weatherApiInstance = axios.create({
    baseURL: 'api.openweathermap.org/data/2.5',
    params: {
        appId: WEAHTHER_APIKEY
    }
})
