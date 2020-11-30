import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import '../assets/styles/individualInfo.scss';
import TopCards from './Cards/TopCards';

function ScienceNews(props) {

    const [scienceNews, setScienceNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getSciencesNews = async () => {
            try{
                const response = await apiInstance.get('/top-headlines', {
                    params: {
                        // country: 'uk',
                        q: 'science',
                        sortBy: 'popularity'
                    }
                })
                return setScienceNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        // getSciencesNews();
    }, [])

    const scienceNewsThree = scienceNews.splice(0,3);
    const allScienceNews = scienceNews;
    
    return (
        <TopCards title={props.heading} newsListType={scienceNewsThree} newsAllList={allScienceNews} />
    )
}

export default ScienceNews;
