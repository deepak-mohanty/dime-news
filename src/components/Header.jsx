import React, {useState} from 'react';
import '../assets/styles/header.scss';
import { NavLink, Link } from 'react-router-dom';
import brandLogo from '../assets/images/news.png';

function Header() {
    const [navbar, setNavbar] = useState(false);

    const changeBackgroundOnScroll = () => {
        if(window.scrollY >= 100){
            setNavbar(true)
        }
        else{
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBackgroundOnScroll)

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
                                    Current Time <span>13:00</span>
                                </div>
                            </li>
                            <li className="appHeader__infoItem">
                                <div className="date">
                                    <span>15th Oct, 2019</span>
                                </div>
                            </li>
                            <li className="appHeader__infoItem">
                                <div className="weatherInfo">
                                    <div className="tempDetails">
                                        <div className="temp">
                                            30 <sup>0</sup>C
                                        </div>
                                        <div className="location">Koraput, Odisha</div>
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
