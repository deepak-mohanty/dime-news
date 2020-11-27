import React, {useState, useEffect} from 'react';

import apiInstance from '../apis/api';
import HeroTrending from './HeroTrending';
import NewsHighlights from './NewsHighlights';
// import FeaturedNews from './FeaturedNews';
import SportsNews from './SportsNews';
import Technology from './Technology';
import Politics from './Politics';
import Entertainment from './Entertainment';
import Business from './Business';
import Travel from './Travel';

import '../assets/styles/home.scss';

function Home() {

    const [todaysHeadlines, setTodaysHeadlines] = useState([]);

    //Top Headlines useEffect
    useEffect(() => {
        const getNews = async () => {
            // try{
            //     const response = await apiInstance.get('/top-headlines', {
            //         params: {
            //             country: 'IN',
            //             q: 'all'
            //         }
            //     });
            //     return setTodaysHeadlines(response.data.articles);
            // }
            // catch (error) {
            //     console.error(error);
            // }
        };

        getNews();

    },[]);



    return (
        <div>
            <div className="container">
                <div className="bannerSection">
                    <HeroTrending trendingNews={todaysHeadlines} />
                    <NewsHighlights relatedNews={todaysHeadlines} />
                </div>
                <div className="featured__wrapper">
                    <div className="featured__units">
                        <Politics heading="Political" />
                        <Business heading="Business" />
                        <Technology heading="Technology" />
                        <Entertainment heading="Entertainment" />
                        <SportsNews heading="Sports" />
                        <Travel heading="Travel" />
                    </div>
                    <div className="featured__widgets">
                        <div>Hello List</div>
                        <div>Hello LIst</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
