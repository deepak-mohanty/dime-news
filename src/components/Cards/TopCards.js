import React from 'react';
import {Link} from 'react-router-dom'; 

const TopCards = ({title, newsListType}) => {

    return (
        <div className="individualInfo__section">
            <div className="infoSection">
                <h2>{title} News</h2>
                <Link to="/">View All</Link>
            </div>  
            <ul className="infoSection__cards--List">
                {
                    newsListType.length && newsListType.map((news, index) => {
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

export default TopCards;