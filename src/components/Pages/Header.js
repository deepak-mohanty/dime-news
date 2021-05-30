import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import Moment from 'moment';
import {weatherApiInstance} from '../../apis/api';

import './../../assets/styles/header.scss';
import searchIcon from '../../assets/images/search.svg';
import podcastIcon from '../../assets/images/podcast-icon.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import brandLogo from './../../assets/images/news.png';

function Header() {
    const [navbar, setNavbar] = useState(false);
    const [weatherData, setWeatherData] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    const changeBackgroundOnScroll = () => {
        if(window.scrollY >=  50){
            setNavbar(true)
        }
        else{
            setNavbar(false)
        }
    }
    window.addEventListener('scroll', changeBackgroundOnScroll);


    //Get Geolocation Coordinates
    useEffect(()=> {
        
        const getCoordinates = () => {

            if (window.navigator && window.navigator.geolocation) {
                    window.navigator.geolocation.watchPosition(success, error, options);
                }
            }

            let options = {
                enableHighAccuracy: false, 
                timeout: 60000, 
                maximumAge: 75000 
            }

            const success = (pos) => {
                var crd = pos.coords; 
                var lat = crd.latitude.toString(); 
                var lng = crd.longitude.toString(); 
                var coordinates = [Math.floor(lat), Math.floor(lng)]; 
                setCoordinates(coordinates); 
                clearTimeout(options.timeout)
                return; 
            }
            function error(err) { 
                console.warn(`ERROR(${err.code}): ${err.message}`); 
                  clearTimeout(options.timeout)
            } 

        getCoordinates();

    }, []);

    //Get weather Data
    useEffect(()=>{
        const getWeatherData = async () => {
            try{
                const responseWeatherData = await weatherApiInstance.get('/weather',{
                    params:{
                        lat: coordinates[0],
                        lon: coordinates[1],
                    }
                });

                return setWeatherData(responseWeatherData.data)
            }
            catch(error){
                console.log('Weather Data Not Found')
            }
        } 

        getWeatherData();

    }, [coordinates]);

	return (
		<nav className={navbar ? 'appHeader active' : 'appHeader'}>
			<div className="container">
                <div className="appHeader--wrapper">

                    {/* News Top Header */}
                    <div className="appHeaderTop--wrapper"> 
                    
                        <div className="appHeader_content">
                            <ul className="appHeader__info">
                                <li className="appHeader__infoItem">
                                    <div className="timeline">
                                        <span>{Moment().format('HH:mm a')}</span>
                                    </div>
                                    
                                    <div className="date">
                                        <span> , {Moment().format("Do,MMM,YYYY")}</span>
                                    </div>
                                </li>

                                {
                                    weatherData ? 
                                        <li className="appHeader__infoItem">
                                            <div className="weatherInfo">
                                                <div className="tempDetails">
                                                    <div className="temp">
                                                        {weatherData ? (weatherData.main.temp - 273).toFixed(2) : ""}<sup>0</sup>C
                                                    </div>
                                                    <div className="location">{weatherData ? weatherData.name : ""}, {weatherData ? weatherData.sys.country : ""}</div>
                                                </div>
                                            </div>
                                        </li>
                                    : ""
                                }
                            </ul>
                        </div>

                        <Link to="/" className="appHeaderLogo">
                            <div className="appHeaderName">The Dime News</div>
                        </Link>

                        <div className="appHeaderTop__right">
                            <Link to="/">Sign In</Link>
                            <Link to="/" className="btn btn-primary">Subscribe</Link>
                        </div>

                    </div>

                    {/* NavList SubHeader */}

                    <div className="appHeader__subHeader">

                        <ul className="appHeader__subHeaderList">
                            <li>
                                <NavLink activeClassName="active" to="/" className="appHeader__subHeaderListItem">News</NavLink>
                            </li>
                            <li>
                                <NavLink to="/business" className="appHeader__subHeaderListItem">Business</NavLink>
                            </li>
                            <li>
                                <NavLink to="/health" className="appHeader__subHeaderListItem">Health</NavLink>
                            </li>
                            <li>
                                <NavLink to="/science" className="appHeader__subHeaderListItem">Science</NavLink>
                            </li>
                            <li>
                                <NavLink to="/technology" className="appHeader__subHeaderListItem">Technology</NavLink>
                            </li>
                            <li>
                                <NavLink to="/entertainment" className="appHeader__subHeaderListItem">Entertainment</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sports" className="appHeader__subHeaderListItem">Sports</NavLink>
                            </li>
                        </ul>

                        <div className="appHeader__subHeader--right">
                            <div className="appHeader__subHeader--rightList searchCustomNews">
                                <form id="newsSearchForm">
                                    <img src={searchIcon} alt="News Search Icon" />
                                    {/* <input type="text" name="searchCustomNews" id="searchNews" value="" /> */}
                                    <label htmlFor="searchCustomNews">Searching</label>
                                </form>
                            </div>
                            <Link to="/" className="appHeader__subHeader--rightList">
                                <img src={podcastIcon} alt="Podcast Icon" />
                                <div>Podcasts</div>
                            </Link>
                            <Link to="/" className="appHeader__subHeader--rightList">
                                <img src={videoIcon} alt="Videos Icon" />
                                <div>Videos</div>
                            </Link>
                        </div>

                    </div>
                
                </div>
			</div>
		</nav>
	);
}

export default Header;


// (weatherData.main.temp - 273).toFixed(2)

// [categoryList, sortBy, checkedValue, sourcesValues, allSources]
