import React,{useState, useEffect} from 'react';
import {newsApiInstance} from '../../apis/api';

import '../../assets/styles/individualInfo.scss';
import TopCards from '../Cards/TopCards';

function Politics(props) {
    const [generalNews, setGeneralNews] = useState([]);

    //Top Political useEffect
    useEffect(() => {
        const getGeneralNews = async () => {
            try{
                const response = await newsApiInstance.get('/top-headlines', {
                    params: {
                        country: 'US',
                        category: 'general',
                        sortBy: 'popularity',
                        pageSize: 100
                    }
                })
                return setGeneralNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        // getGeneralNews();
    }, []);

    const topGeneralNews = generalNews.splice(0,3);
    const allGeneralNews = generalNews;


    return (
        <TopCards title={props.heading} newsListType={topGeneralNews} newsAllList={allGeneralNews} />
    )
}

export default Politics;
