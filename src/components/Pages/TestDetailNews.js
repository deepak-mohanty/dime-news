import React, {useState, useEffect } from 'react';
import AppBreadCrumbs from '../../AppBreadCrumbs';
import {Link} from 'react-router-dom';
import RadioButton from '../Utils/Radio';
import Checkbox from '../Utils/Checkbox';
import {newsApiInstance, cancelToken} from '../../apis/api';
import Select from 'react-select';
import CardLoader from '../Utils/CardLoader';
import ScrollToTop from '../Utils/ScrollToTop';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

// import NoData from './../../assets/images/no-data.png';
import backArrow from './../../assets/images/arrow-left.svg';
import ListView from './../../assets/images/list.svg';
import GridView from './../../assets/images/grid.svg';
import './../../assets/styles/individualInfo.scss';
import './../../assets/styles/filteredNews.scss';
import Card from '../Cards/Card';


const DetailNews = (props) => {

    //if selectedCategory returns undefined it will fallback to 'general category
    const selectedCategory = props.location.title || 'general';

    // const selectedCategory = props.match.params.name.replace(/\b\w/g, function(l){ return l.toLowerCase() });
    
    const [categoryList, setCategoryList] = useState([]);
    const [sourcesValues, setSourcesValues] = useState([]);
    const [sortBy, setSortBy] = useState('publishedAt');
    const [activeGridView, setACtiveGridView] = useState(true);
    const [activeListView, setACtiveListView] = useState(false);
    const [checkedValue, setCheckedValue] = useState(selectedCategory);
    const [isChecked, setIsChecked] = useState(false);
    const [domainsValues, setDomainsValues] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(null);

    const PER_PAGE = 9
    // const offset = currentPage * PER_PAGE;
    // const currentPageData = categoryList.slice(offset, offset + PER_PAGE).map(({ thumburl }) => <img src={thumburl} />);
    const pageCount = Math.ceil(totalPageCount / PER_PAGE);

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

    //Lost of News Sources
    const checkboxList = [];
    const allSources = (sourcesValues !== 'undefined' ?  sourcesValues : "");

    // const domainListDefault = (domainsValues.length && domainsValues === undefined ? '' : domainsValues.join(',')) 

    useEffect(()=>{

        const getAllCategoryList = async () => {
            try{
                const response = await newsApiInstance.get('/everything', {
                    params:{
                        q: checkedValue,
                        // sources: allSources,
                        // domains: '',
                        language: 'en',
                        sortBy: sortBy,
                        // page: currentPage + 1,
                        pageSize: 9
                    }
                }
                );

                setCategoryList(response.data.articles);
                // setTotalPageCount(response.data.totalResults);
                console.log('articles List', response.data.articles)
            }
            catch(error){
                    console.log('Error: ', error.message);
            }
        }

    }, []);

    //[categoryList, checkedValue,sortBy, sourcesValues, allSources]

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

    const radioSelectHandler = (e) => (
        setCheckedValue(e.target.value)
    )

    const checkboxSelectHandler = (event) => {
        const { value, checked } = event.target;
        setIsChecked(checked);
        setDomainsValues(domainsValues.push(value))
    }

    //Pagination Handle Page CLick 
     const handlePageClick = ({ selected: selectedPage }) => {
       setCurrentPage(selectedPage)
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

                                <form>
                                    <input type="text" placeholder="Search News, Headlines ..." />
                                </form>

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
                        
                         <div className={`filteredNews--list ${activeGridView ? 'filteredNews--grid' : 'filteredNews--list' } `}>
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
                                       
                                        <div className="paginaion-wrapper">
                                            <ReactPaginate 
                                                previousLabel={"← Previous"}
                                                nextLabel={"Next →"}
                                                pageCount={pageCount}
                                                pageRange={2}
                                                containerClassName={"pagination"}
                                                previousLinkClassName={"pagination__link"}
                                                nextLinkClassName={"pagination__link"}
                                                disabledClassName={"pagination__link--disabled"}
                                                pageClassName={'paginate-li'}
                                                onPageChange={handlePageClick}
                                                activeClassName={"pagination__link--active"}
                                            />
                                        </div>
                                    

                                    </React.Fragment>)
                                
                                : <CardLoader />
                            } 
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default DetailNews;


// <div className="categoryNotFound">
//     <img src={NoData} className="categoryNotFoundImg" />
//     <div>No Categories Found</div>
// </div>



                                    // <div className="filteredNews__listWrapper">
                                    // {uniqueCheckboxList.length ?  <h4 className="filteredNews__header">Domains</h4> : ""}
                                    //     <ul className="unstyled centered">
                                    //         {
                                    //             uniqueCheckboxList.map((item, index) => {
                                    //                 return (
                                    //                         <Checkbox key={index} 
                                    //                             value={item.value}
                                    //                             id={index} 
                                    //                             label={item.name} 
                                    //                             name={item.name} 
                                    //                             checked={isChecked[item.name]} 
                                    //                             onChange={(e) => checkboxSelectHandler(e) } 
                                    //                         />
                                    //                 )
                                    //             })
                                    //         }
                                    //     </ul>
                                    // </div>