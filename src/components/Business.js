import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Business(props) {
    
    const [businessNews, setBusinessNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getBusinessNews = async () => {
            try{
                const response = await apiInstance.get('/top-headlines', {
                    params: {
                        // country: 'uk',
                        q: 'business',
                        sortBy: 'popularity'
                    }
                })
                return setBusinessNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        // getBusinessNews();

    }, []);

    const bNews = businessNews.splice(0,3);
    const allBusinessNews = businessNews;

    return (
        <TopCards title={props.heading} newsListType={bNews} newsAllList={allBusinessNews} />
    )
}

export default Business;
