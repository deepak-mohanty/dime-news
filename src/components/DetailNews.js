import React, {useState, useEffect} from 'react';
import AppBreadCrumbs from '../AppBreadCrumbs';
import NoData from '../assets/images/no-data.png';
import backArrow from '../assets/images/arrow-left.svg';

import '../assets/styles/individualInfo.scss';
import {Link} from 'react-router-dom';
import Card from './Cards/Card';

const DetailNews = (props) => {
    
    const [categoryList, setCategoryList] = useState([]);
    const [loadMore, setLoadMore] = useState(4);

    useEffect(()=>{
        const getAllCategoryList = () => {
                let category = props.location.query.categoryList.splice(0, loadMore);
                if(category.length){
                    return setCategoryList(category)
                }
        }
        getAllCategoryList();   
    }, [loadMore]);



    return (
        <div className="categoryList">
            <div className="container">
                <div className="innerHeader">
                    <div className="backArrowWrapper">
                        <Link to="/">
                            <img src={backArrow} className="backArrow" />
                            <span>Back</span>
                        </Link>
                    </div>
                    <div className="innerHeader__details">
                       <AppBreadCrumbs />
                        <div className="categoryType">
                            Category : <h1>{props.match.params.name.replace(/\b\w/g, function(l){ return l.toUpperCase() })}</h1>
                        </div>
                    </div>
                </div>
                {
                    categoryList ?   
                        <>
                            <ul className="categoryList__Item">
                                {
                                    categoryList.length && categoryList.map((list, index) => {
                                        return (
                                            <li className="categoryCard" key={index}>
                                                <Card cardInfo={list} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                        : <div className="categoryNotFound">
                            <img src={NoData} className="categoryNotFoundImg" />
                            <div>No Categories Found</div>
                        </div>
                }

                <div className="loadMore__wrapper">
                    <button className="primary-btn loadMore--btn" onClick={() => setLoadMore(loadMore+4)}>Load More</button>
                </div>

            </div>
        </div>
    );
}

export default DetailNews;
