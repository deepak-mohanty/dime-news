import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import {Link} from 'react-router-dom'; 
import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Entertainment(props) {
    
    const [entertainmentNews, setEntertainmentNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getEntertainmentNews = async () => {
            try{
                const response = await apiInstance.get('/everything', {
                    params: {
                        // country: 'uk',
                        q: 'entertainment',
                        sortBy: 'popularity'
                    }
                })
                return setEntertainmentNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        getEntertainmentNews();

    }, []);

    const eNews = entertainmentNews.splice(0,3);

    return (
        <TopCards title={props.heading} newsListType={eNews} />
    )
}

export default Entertainment;
