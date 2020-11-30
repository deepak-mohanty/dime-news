import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';
import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function Politics(props) {
    const [politicalNews, setPoliticalsNews] = useState([]);

    //Top Political useEffect
    useEffect(() => {
        const getpoliticalNews = async () => {
            try{
                const response = await apiInstance.get('/top-headlines', {
                    params: {
                        // country: 'uk',
                        q: 'general',
                        sortBy: 'popularity'
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

    const politicsNews = politicalNews.splice(0,3);
    const allPoliticalNews = politicalNews;

    return (
        <TopCards title={props.heading} newsListType={politicsNews} newsAllList={allPoliticalNews} />
    )
}

export default Politics;
