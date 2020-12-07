import React, {useState, useEffect } from 'react';
import AppBreadCrumbs from '../AppBreadCrumbs';
import {Link} from 'react-router-dom';
import RadioButton from './Utils/Radio';
import {newsApiInstance} from '../apis/api';
import Select from 'react-select';

import NoData from '../assets/images/no-data.png';
import backArrow from '../assets/images/arrow-left.svg';
import ListView from '../assets/images/list.svg';
import GridView from '../assets/images/grid.svg';
import '../assets/styles/individualInfo.scss';
import '../assets/styles/filteredNews.scss';
import Card from './Cards/Card';


const DetailNews = (props) => {

    const selectedCategory = props.match.params.name.replace(/\b\w/g, function(l){ return l.toLowerCase() });
    
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('publishedAt');
    const [activeGridView, setACtiveGridView] = useState(true);
    const [activeListView, setACtiveListView] = useState(false);
    const [checkedValue, setCheckedValue] = useState(selectedCategory)
    const [testeList, setTestList] = useState('');

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
    ]

    useEffect(()=>{

        const getAllCategoryList = async () => {
            try{
                const response = await newsApiInstance.get('/everything', {
                    params:{
                        q: selectedCategory,
                        language: 'en',
                        sortBy: sortBy,
                        pageSize: 100
                    }
                });

                setCategoryList(response.data.articles);
                setTestList(response.data.status)
            }
            catch(error){
                console.log('Error', error.message)
            }
        }

        getAllCategoryList();  

    }, [categoryList, sortBy, checkedValue]);


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

    const radioSelectHandler = (e) => {
        return setCheckedValue(e.target.value)
    }

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

                <div className="filteredNews__wrapper">
                    <div className="filteredNews__left">
                        <div className="filteredNews__list">
                            <div className="filteredNews__listItem">
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
                        </div>
                    </div>
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
                                <div className="filteredHeader">Sort By</div>
                                <Select options={sortByOptions} onChange={(e) => onSortByChange(e)} disabled="true" />
                            </div>

                        </div>
                        
                         <div className="filteredNews--list filteredNews__grid">
                                {
                                    categoryList ?   
                                        <ul className="categoryList__Item">
                                            {
                                                categoryList.length && categoryList.map((list, index) => {
                                                    return (
                                                        <li className="categoryCard" key={index}>
                                                            {loading ? <Card cardInfo={list}/> : "Loading ..."}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        : <div className="categoryNotFound">
                                            <img src={NoData} className="categoryNotFoundImg" />
                                            <div>No Categories Found</div>
                                        </div>
                                }
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default DetailNews;


          // <select id="sort_by" onChange={(e) => onSortByChange(e)}>
                                //     <option value="publishedAt">PublishedAt</option>
                                //     <option value="relevancy">Relevancy</option>
                                //     <option value="popularity">Popularity</option>
                                // </select>
