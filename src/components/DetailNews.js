import React from 'react';
import AppBreadCrumbs from '../AppBreadCrumbs';
import NoData from '../assets/images/no-data.png';

import '../assets/styles/individualInfo.scss';
import {Link} from 'react-router-dom';

const DetailNews = (props) => {
    let categoryList = props.location.query.categoryList;
    return (
        <div className="categoryList">
            <div className="container">
                {
                    categoryList.length ? `
                        <AppBreadCrumbs />
                        <div className="categoryType">
                            Category : <h1>{props.match.params.name.replace(/\b\w/g, function(l){ return l.toUpperCase() })}</h1>
                        </div>
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
                        </ul>`
                        : <div className="categoryNotFound">
                            <img src={NoData} className="categoryNotFoundImg" />
                            <div>No Categories Found</div>
                        </div>
                }

            </div>
        </div>
    );
}

export default DetailNews;
