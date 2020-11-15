import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import {Link} from 'react-router-dom'; 
import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Business(props) {
    
    const [businessNews, setBusinessNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getBusinessNews = async () => {
            try{
                const response = await apiInstance.get('/everything', {
                    params: {
                        // country: 'uk',
                        q: 'Finance',
                        sortBy: 'popularity'
                    }
                })
                return setBusinessNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        getBusinessNews();

    }, []);

    const bNews = businessNews.splice(0,3);

    return (
        <TopCards title={props.heading} newsListType={bNews} />
    )
}

export default Business;
