import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import {Link} from 'react-router-dom'; 
import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function TravelNews(props) {

    const [travelNews, setTravelsNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getTravelsNews = async () => {
            try{
                const response = await apiInstance.get('/everything', {
                    params: {
                        // country: 'uk',
                        q: 'travel',
                        sortBy: 'popularity'
                    }
                })
                return setTravelsNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        getTravelsNews();
    }, [])

    const tvlNews = travelNews.splice(0,3);
    console.log(travelNews)
    
    return (
        <TopCards title={props.heading} newsListType={tvlNews} />
    )
}

export default TravelNews;
