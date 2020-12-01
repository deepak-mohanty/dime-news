import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import Moment from 'moment';
import {weatherApiInstance} from '../apis/api';

import '../assets/styles/header.scss';
import brandLogo from '../assets/images/news.png';

function Header() {
    const [navbar, setNavbar] = useState(false);
    const [weatherData, setWeatherData] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    const changeBackgroundOnScroll = () => {
        if(window.scrollY >= 100){
            setNavbar(true)
        }
        else{
            setNavbar(false)
        }
    }
    window.addEventListener('scroll', changeBackgroundOnScroll);

    useEffect(()=>{
        const getCoordinates = () => {
            let options = {
                enableHighAccuracy: true, 
                timeout: 1000, 
                maximumAge: 100 
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
            if (navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(success, error, options);
            }
        }

        getCoordinates();

    }, []);

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

    // console.log('Coordinate', coordinates)

	return (
		<nav className={navbar ? 'appHeader active' : 'appHeader'}>
			<div className="container">
                <div className="appHeader--wrapper">
                
					<Link to="/" className="appHeaderLogo">
                        <img src={brandLogo} alt="The Dime News" />
                        <div className="appHeaderName">The Dime News</div>
					</Link>

                    <div className="appHeader_content">
                        <ul className="appHeader__list">
                            <li className="appHeader__listItem">
                                <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
                            </li>
                            <li className="appHeader__listItem">
                                <NavLink to="/categories"  activeClassName="active">Personalized News</NavLink>
                            </li>
                            <li className="appHeader__listItem">
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                        </ul>

                        <ul className="appHeader__info">
                            <li className="appHeader__infoItem">
                                <div className="timeline">
                                    Current Time <span>{Moment().format('HH:mm a')}</span>
                                </div>
                            </li>
                            <li className="appHeader__infoItem">
                                <div className="date">
                                    <span>{Moment().format("MMM Do YYYY")}</span>
                                </div>
                            </li>
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
                        </ul>
                    </div>
                
                </div>
			</div>
		</nav>
	);
}

export default Header;

// (weatherData.main.temp - 273).toFixed(2)
