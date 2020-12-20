import React from 'react';
import {Link} from 'react-router-dom';

function NewsHighlights(props) {
    let relatedNews = props.relatedNews.splice(0,3);
    return (
        <div className="news__right">
            <ul className="newsCategory__list">
                <li className="newsCategory__listItem active--category">Related</li>
                <li className="newsCategory__listItem">Popular</li>
                <li className="newsCategory__listItem">Others</li>
                <li className="newsCategory__listItem">Others</li>
            </ul>
            <ul className="newsHighlights__list">
                {
                    relatedNews && relatedNews.map((news, index) => {
                        return (
                            <li className="newsHighlights__listItem" key={index}>
                                <div className="img-wrapper">
                                    <img src={news.urlToImage} alt={news.title} aria-hidden='false' />
                                </div>
                                <div className="relatedNews--desc">
                                    <div className="meta meta__seperatot">
                                        <div className="meta__left">
                                                <Link to="/">{news.source ? news.source.name : 'Anonymous'}</Link>
                                                <Link to="/">{news.publishedAt.split('T')[0]}</Link>
                                        </div>
                                    </div>
                                    <h2 className="trending__infoHeader">
                                        <Link to="/">
                                            {news.title.substring(0, 130) + '...'}
                                        </Link>
                                    </h2>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NewsHighlights
