import React,{useState, useEffect} from 'react';
import {newsApiInstance} from '../apis/api';

import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function HealthNews(props) {

    const [healthNews, setHealthNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getHealthNews = async () => {
            try{
                const response = await newsApiInstance.get('/top-headlines', {
                    params: {
                        // country: 'uk',
                        q: 'health',
                        sortBy: 'popularity'
                    }
                })
                return setHealthNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        // getHealthNews();
    }, [])

    const healthNewsThree = healthNews.splice(0,3);
    const allHealthNews = healthNews;
    
    return (
        <TopCards title={props.heading} newsListType={healthNewsThree} newsAllList={allHealthNews} />
    )
}

export default HealthNews;
