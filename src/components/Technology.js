import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import {Link} from 'react-router-dom'; 
import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Technology(props) {
    
    const [technologyNews, setTechnologyNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getTechnologyNews = async () => {
            try{
                const response = await apiInstance.get('/top-headlines', {
                    params: {
                        // country: 'uk',
                        q: 'technology',
                        sortBy: 'popularity'
                    }
                })
                return setTechnologyNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        // getTechnologyNews();
    }, []);

    const techNews = technologyNews.splice(0,3);
    const allTechnologyNews = technologyNews;

    return (
        <TopCards title={props.heading} newsListType={techNews} newsAllList={allTechnologyNews} />
    )
}

export default Technology
