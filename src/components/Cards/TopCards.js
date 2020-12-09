import React from 'react';
import {Link} from 'react-router-dom'; 
import Card from './Card';

const TopCards = (props) => {
    let title= props.title;
    let newsListType = props.newsListType;
    let newsAllList = props.newsAllList;

    //Send Values through Link tags
    //  <Link to={{ pathname: `/category/${title.toLowerCase()}`, query:{categoryList: newsAllList} }}>View All</Link>

    return (
        <>
            {newsAllList.length ? (
                        <div className="individualInfo__section">
                            <div className="infoSection">
                                <h2>{title} News</h2>
                                <Link to={{ pathname: `/category/`, title: `${title.toLowerCase()}` }}>View All</Link>
                            </div>  
                            <ul className="infoSection__cards--List">
                                {
                                    newsListType.length && newsListType.map((news, index) => {
                                        return (
                                            <li className="infoSection__card--Listitem" key={index}>
                                                <Card cardInfo={news} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                ) : ""
            }
        </>
    )
}

export default TopCards;