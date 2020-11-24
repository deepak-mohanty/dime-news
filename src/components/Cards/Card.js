import React from 'react';
import {Link} from 'react-router-dom';

const Card = ({cardInfo}) => {
    return(
        <div className="card">
            <div className="card--banner">
                <img src={cardInfo.urlToImage} alt="" aria-hidden="false" />
            </div>
            <div className="card--body">
                <div className="meta meta__seperatot">
                    <div className="meta__left">
                        <Link to="/">{cardInfo.source.name}</Link>
                        <Link to="/">{cardInfo.publishedAt.split('T')[0]}</Link>
                    </div>
                </div>
                <h2 className="trending__infoHeader">
                    <Link to="/">{cardInfo.title.substring(0, 40) + '...'}</Link>
                </h2>
            </div>
        </div>
    )
}

export default Card;