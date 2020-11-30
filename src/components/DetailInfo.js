import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';

import '../assets/styles/detailInfo.scss';
import published from '../assets/images/published.svg';
import user from '../assets/images/user.svg';
import backArrow from '../assets/images/arrow-left.svg';
import NoData from '../assets/images/no-data.png';

const DetailInfo = (props) => {
    const [indiDetail, setIndiDetail] = useState([]);

    useEffect(() => {
        const setIndiDetailFunc = () => {
            let cardDetail = props.history.location.query.cardDetail;
            if(cardDetail === 'undefined'){
                props.history.push('/')
            }
            else{
                return setIndiDetail(cardDetail)
            }
        }

        setIndiDetailFunc();
    }, []);

    return (
        <div className="detailInfo__wrapper">
            <div className="container">
                <div className="detailInfo">
                    {
                        indiDetail ?
                        <>
                            <div className="backArrowWrapper">
                                <Link to="/">
                                    <img src={backArrow} className="backArrow" />
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="detailInfo__card">
                                <div className="detailInfo__title">{indiDetail.title}</div>
                                <div className="detainInfo__featured--singleImage">
                                    <img src={indiDetail.urlToImage} alt="imgtitle" />
                                </div>
                                <div className="detailInfoInnerDetailWrapper">
                                    <div className="authorDetails">
                                        <img src={user} alt="titleImg" />
                                        <h4>{indiDetail.author}</h4>
                                    </div>
                                    <div className="published">
                                        <img src={published} alt="published Img" />
                                        <div>{indiDetail.publishedAt}</div>
                                    </div>
                                </div>
                                <a href={indiDetail.url} target="_blank" className="detailInfo__desc">
                                    {indiDetail.description}
                                </a>
                            </div>
                        </>
                        :  <div className="categoryNotFound">
                            <img src={NoData} className="categoryNotFoundImg" />
                            <div>No Categories Found</div>
                        </div>
                    }
                    <div className="detailInfo__right">
                        Hello
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailInfo;
