import React, {useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import AppBreadCrumbs from '../../AppBreadCrumbs';

import {newsApiInstance, cancelToken} from '../../apis/api';
import Pagination from './../Utils/Pagination';
import ScrollToTop from '../Utils/ScrollToTop';
import RadioButton from '../Utils/Radio';
import Checkbox from '../Utils/Checkbox';
import Select from 'react-select';
// import ReactPaginate from 'react-paginate';
import CardLoader from '../Utils/CardLoader';
import Card from '../Cards/Card';
import _ from 'lodash';

import backArrow from './../../assets/images/arrow-left.svg';
import ListView from './../../assets/images/list.svg';
import GridView from './../../assets/images/grid.svg';
import './../../assets/styles/individualInfo.scss';
import './../../assets/styles/filteredNews.scss';


function DetailNews(props){

    const selectedCategory = props.location.title || 'general';

    const [categoryList, setCategoryList] = useState([]);
    const [checkedValue, setCheckedValue] = useState(selectedCategory);
    const [isChecked, setIsChecked] = useState(false);
    const [domainsValues, setDomainsValues] = useState([]);
    const [activeGridView, setACtiveGridView] = useState(true);
    const [activeListView, setACtiveListView] = useState(false);
    const [sourcesValues, setSourcesValues] = useState([]);
    const [sortBy, setSortBy] = useState('publishedAt');

    const [totalPageCount, setTotalPageCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    
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

    const checkboxList = [];
    const allSources = (sourcesValues !== 'undefined' ?  sourcesValues : "");


    radioCategoryList.sort((a,b)=>{
        return a.name.toLowerCase() - b.name.toLowerCase();
    });

    const checkboxSelectHandler = (event) => {
        const { value, checked } = event.target;
            setIsChecked(checked);
            setDomainsValues([...domainsValues, domainsValues.push(value)]);
    }

    //Pagination Handle Page CLick 
    const handlePageClick = ({ selected: selectedPage }) => {
       return setCurrentPage(selectedPage)
    }

    useEffect(()=>{

        const getAllCategoryList = async () => {
            try{
                    const response = await newsApiInstance.get('/everything', {
                        params:{
                            q: checkedValue,
                            sources: allSources,
                            // domains: '',
                            language: 'en',
                            sortBy: sortBy,
                            // page: currentPage + 1,
                            pageSize: 9
                        }
                    }
                );

                _isMounted.current = true;
                if(_isMounted.current){
                    setCategoryList(response.data.articles);
                    setTotalPageCount(response.data.totalResults);
                    console.log('articles List', response.data.articles)
                }
            }
            catch(error){
                console.log('Error: ', error.message);
            }
        }

        getAllCategoryList();

        return () => {
          _isMounted.current = false
        }

    }, [categoryList, checkedValue]);

    const radioSelectHandler = (e) => (
        setCheckedValue(e.target.value)
    );

    //React Hooks to search and set the news Sources
    categoryList && categoryList.map((elem) => {
        const value = elem.url.replace(/(https?:\/\/)?(www.)?/i, '').split('/')[0];
        const name = value.split('.')[0];
        return checkboxList.push({name: name, value: value });
    })

    //Setting the Checkbox List in Alphabetic order
    checkboxList.sort((a,b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1
        }
        else{
            return 1
        }
    });

    //Removed sorted repeating checkbox names
    const uniqueCheckboxList = _.unionBy(checkboxList, 'name');

    //Toggle News Items View
    const toggleActiveView = (elem) =>{
        if(elem.target.alt === 'gridView-icon'){
            setACtiveGridView(true)
            setACtiveListView(false)
        }
        else{
            setACtiveGridView(false)
            setACtiveListView(true)
        }
    }

    const onSortByChange = (e) => {
        return setSortBy(e.value);
    }

    return (
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

                    <div className="filteredNews__wrapper">

                        {/* Filtered News Left Items */}
                        <div className="filteredNews__left">
                            <div className="filteredNews__list">
                                <div className="filteredNews__listItem">

                                    <div className="filteredNews__listWrapper">
                                        <h4 className="filteredNews__header">Category</h4>
                                        {
                                            radioCategoryList.map((item, index)=>{
                                                return <RadioButton 
                                                            value={item.value} 
                                                            key={index} 
                                                            name={item.name} 
                                                            selected = {checkedValue}
                                                            onChange={(e) => radioSelectHandler(e)}  
                                                        />
                                            })
                                        }
                                    </div>

                                    <div className="filteredNews__listWrapper">

                                        {uniqueCheckboxList.length ?  <h4 className="filteredNews__header">Domains</h4> : ""}
                                        <ul className="unstyled centered">
                                            {
                                                uniqueCheckboxList.map((item, index) => {
                                                    return (
                                                            <Checkbox key={index} 
                                                                value={item.value}
                                                                id={index} 
                                                                label={item.name} 
                                                                name={item.name} 
                                                                checked={isChecked[item.name]} 
                                                                onChange={(e) => checkboxSelectHandler(e) } 
                                                            />
                                                    )
                                                })
                                            }
                                        </ul>

                                    </div>
                                
                                </div>
                            </div>
                        </div>


                        {/*  Filtered News List Result */}
                        <div className="filteredNews__right">

                            {/* Filtered Header */}
                            <div className="filteredNews__right--infoHeader">

                            
                                <div className="filteredNews--view">                                
                                    <div className={`filteredNews--gridView ${activeGridView ? 'active' : '' }`} data-target="grid-view" onClick={(e) => toggleActiveView(e)}>
                                        <img src={GridView} alt="gridView-icon" />
                                    </div>
                                    <div className={`filteredNews--listView ${activeListView ? 'active' : ''}`} data-target="list-view" onClick={(e) => toggleActiveView(e)}>
                                        <img src={ListView} alt="listView-icon" />
                                    </div>
                                </div>

                                <div className="filteredNews__sort">
                                    <div className="filteredHeader">Sort By: </div>
                                    <Select options={sortByOptions} onChange={(e) => onSortByChange(e)} disabled="true" />
                                </div>

                            </div>
                            
                            <div className={`filteredNews--list ${activeGridView ? 'filteredNews--grid' : '' } `}>
                                {
                                    categoryList.length ? 
                                        (<React.Fragment>

                                            <ul className="categoryList__Item">
                                                {
                                                    categoryList.length && categoryList.map((list, index) => {
                                                        return (
                                                            <li className="categoryCard" key={index}>
                                                                { <Card cardInfo={list}  viewType={`${activeGridView ? 'filteredNews--grid' : 'filteredNews--list' }`} /> }
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul> 
                                        
                         
                                    
                                        </React.Fragment>)
                                    
                                    : <CardLoader />
                                } 

                            </div>

                        </div>

                    </div>

                </div>

            </div>
    )

}

                                // {totalPageCount && 
                                //     <div className="paginaion-wrapper">
                                //         <Pagination perPage={9} handlePageChange={handlePageClick} totalPages={totalPageCount} currentPage={currentPage} />
                                //     </div>
                                // }

export default DetailNews;


