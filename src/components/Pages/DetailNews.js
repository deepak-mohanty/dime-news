import React, {useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import AppBreadCrumbs from '../../AppBreadCrumbs';

import {newsApiInstance, cancelToken} from '../../apis/api';
import Pagination from './../Utils/Pagination';
import ScrollToTop from '../Utils/ScrollToTop';

import backArrow from './../../assets/images/arrow-left.svg';
import ListView from './../../assets/images/list.svg';
import GridView from './../../assets/images/grid.svg';
import './../../assets/styles/individualInfo.scss';
import './../../assets/styles/filteredNews.scss';


function DetailNews(props){

    const selectedCategory = props.location.title || 'general';

    const [categoryList, setCategoryList] = useState([]);
    const [totalPageCount, setTotalPageCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [checkedValue, setCheckedValue] = useState(selectedCategory);
    
    const _isMounted = useRef(true);

    const sortByOptions = [
        {value: "publishedAt", label: "PublishedAt"},
        {value: "relevancy", label: "Relevancy"},
        {value: "popularity", label: "Popularity"}
    ];

    const radioCategoryList = [
        {value: 'general', name: 'general'},
        {value: 'business', name: 'business'},
        {value: 'entertainment', name: 'entertainment'},
        {value: 'health', name: 'health'},
        {value: 'science', name: 'science'},
        {value: 'sports', name: 'sports'},
        {value: 'technology', name: 'technology'}
    ];
    radioCategoryList.sort((a,b)=>{
        return a.name.toLowerCase() - b.name.toLowerCase();
    })

    useEffect(()=>{

        const getAllCategoryList = async () => {
            try{
                const response = await newsApiInstance.get('/everything', {
                    params:{
                        q: checkedValue,
                        // sources: allSources,
                        // domains: '',
                        language: 'en',
                        // sortBy: sortBy,
                        // page: currentPage + 1,
                        pageSize: 9
                    }
                }
                );

                if(_isMounted.current){
                    setCategoryList(response.data.articles);
                    setTotalPageCount(response.data.totalResults);
                    // console.log('articles List', response.data.articles)
                }
            }
            catch(error){
                console.log('Error: ', error.message);
            }
        }

        // getAllCategoryList();

        return () => {
          _isMounted.current = false
        }

    }, [categoryList, checkedValue]);

    //Pagination Handle Page CLick 
    const handlePageClick = ({ selected: selectedPage }) => {
       return setCurrentPage(selectedPage)
    }

    return (
        <>
            <div className="categoryList">
                <ScrollToTop showBelow={300} />

                <div className="container">

                    <div className="innerHeader">
                        <div className="backArrowWrapper">
                            <Link to="/">
                                <img src={backArrow} className="backArrow"  alt="back Arrow" />
                                <span>Back</span>
                            </Link>
                        </div>
                        <div className="innerHeader__details">
                            <AppBreadCrumbs />
                            <div className="categoryType">
                                Category : <h1>{checkedValue.toUpperCase()}</h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="paginaion-wrapper">
                        <Pagination perPage={9} handlePageChange={handlePageClick}  totalPages={totalPageCount} />
                    </div>

                </div>

            </div>
        </>
    )

}

export default DetailNews;