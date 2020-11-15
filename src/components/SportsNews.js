import React,{useState, useEffect} from 'react';
import apiInstance from '../apis/api';

import {Link} from 'react-router-dom'; 
import '../assets/styles/individualInfo.scss';

function SportsNews(props) {

    const [sportsNews, setSportsNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {
        const getSportsNews = async () => {
            try{
                const response = await apiInstance.get('/everything', {
                    params: {
                        // country: 'uk',
                        q: 'athletics',
                        sortBy: 'popularity'
                    }
                })
                return setSportsNews(response.data.articles);
            }
            catch(error){
                console.error(error);
            }
        }
        getSportsNews();
    }, [])

    const sNews =sportsNews.splice(0,3);
    
    return (
        <div className="individualInfo__section">
            <div className="infoSection">
                <h2>{props.heading}</h2>
                <Link to="/">View All</Link>
            </div>  
            <ul className="infoSection__cards--List">
                {
                    sNews && sNews.map((news, index) => {
                        return (
                            <li className="infoSection__card--Listitem" key={index}>
                                <div className="card">
                                    <div className="card--banner">
                                        <img src={news.urlToImage} alt="" aria-hidden="false" />
                                    </div>
                                    <div className="card--body">
                                        <div className="meta meta__seperatot">
                                            <div className="meta__left">
                                                <Link to="/">{news.source.name}</Link>
                                                <Link to="/">{news.publishedAt.split('T')[0]}</Link>
                                            </div>
                                        </div>
                                        <h2 className="trending__infoHeader">
                                            <Link to="/">{news.title.substring(0, 40) + '...'}</Link>
                                        </h2>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SportsNews
