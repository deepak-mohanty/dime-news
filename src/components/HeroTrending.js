import React from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';

function HeroTrending(props) {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
        initialSlide: 0
    };

    let topThreeNews = props.trendingNews.splice(0, 3);

    return (
        <>
            <Slider {...settings}>
            {
                topThreeNews.length && topThreeNews.map((news, index) => {
                    return (
                        <div key={index}>
                            <img src={news.urlToImage} />
                            <div className="trending__info">
                                <div className="meta meta__seperatot">
                                   <div className="meta__left">
                                        <Link to="/">{news.source ? news.source.name : 'Anonymous'}</Link>
                                        <Link to="/">{news.publishedAt.split('T')[0]}</Link>
                                   </div>
                                   <div className="meta__right">
                                        <Link to="/">{news.author ? news.author: 'Anonymous'}</Link>
                                   </div>
                                </div>
                                <h2 className="trending__infoHeader">
                                    <Link to="/">
                                        {news.title.substring(0, 50) + '...'}
                                    </Link>
                                </h2>
                                <p className="trending__infoDesc">{news.description && news.description.substring(0, 120) + '...'}</p>
                            </div>
                        </div>
                    )
                })
            }

            </Slider>
        </>
    )
}

export default HeroTrending


