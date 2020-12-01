import React,{useState, useEffect} from 'react';
import {newsApiInstance} from '../apis/api';

import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Entertainment(props) {
    
    const [entertainmentNews, setEntertainmentNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getEntertainmentNews = async () => {
            try{
                const response = await newsApiInstance.get('/top-headlines', {
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
        // getEntertainmentNews();

    }, []);

    const eNews = entertainmentNews.splice(0,3);
    const allEntertainmentList = entertainmentNews;

    return (
       <>
        {eNews ? <TopCards title={props.heading} newsListType={eNews} newsAllList={allEntertainmentList} /> : " Hello"}
       </>
    )
}

export default Entertainment;
