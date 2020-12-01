import React,{useState, useEffect} from 'react';
import {newsApiInstance} from '../apis/api';

import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Politics(props) {
    const [politicalNews, setPoliticalsNews] = useState([]);

    //Top Political useEffect
    useEffect(() => {
        const getpoliticalNews = async () => {
            try{
                const response = await newsApiInstance.get('/top-headlines', {
                    params: {
                        country: 'US',
                        category: 'general',
                        sortBy: 'popularity',
                    }
                })
                return setPoliticalsNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        getpoliticalNews();
    }, []);

    const topPoliticsNews = politicalNews.splice(0,3);
    const allPoliticalNews = politicalNews;


    return (
        <TopCards title={props.heading} newsListType={topPoliticsNews} newsAllList={allPoliticalNews} />
    )
}

export default Politics;
