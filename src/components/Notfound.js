import React from 'react';
import {Link} from 'react-router-dom';

import NotfoundLogo from '../assets/images/notfound.png';

function Notfound() {
    return (
        <div className="notFound">
            <img src={NotfoundLogo} alt='not found image' aria-hidden="true" />
            <Link to="/">Go To Home</Link>
        </div>
    )
}

export default Notfound
