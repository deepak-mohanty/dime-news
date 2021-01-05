import axios from 'axios';

const NEWS_KEY = process.env.REACT_APP_NEWS_API_KEY;
const WEAHTHER_KEY = process.env.REACT_APP_WEAHTHER_APIKEY;

export let cancelToken = axios.CancelToken.source();

export const newsApiInstance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: {
        apiKey: NEWS_KEY
    }
});

export const weatherApiInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appId: WEAHTHER_KEY
    }
})

