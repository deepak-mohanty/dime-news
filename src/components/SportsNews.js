import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import {Link} from 'react-router-dom'; 
import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function SportsNews(props) {

    const [sportsNews, setSportsNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getSportsNews = async () => {
            try{
                const response = await apiInstance.get('/top-headlines', {
                    params: {
                        // country: 'uk',
                        q: 'sports',
                        sortBy: 'popularity'
                    }
                })
                return setSportsNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        // getSportsNews();
    }, [])

    const sNews = sportsNews.splice(0,3);
    const allSportsNews = sportsNews;
    
    return (
        <TopCards title={props.heading} newsListType={sNews} newsAllList={allSportsNews} />
    )
}

export default SportsNews
