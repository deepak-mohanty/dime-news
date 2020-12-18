import React from 'react';

import contactBanner from '../../assets/images/contactus_banner.jpg';
import '../../assets/styles/contact.scss';

function Contact() {
    return (
        <div>
            <div className="contactBanner__wrapper">
                <img src={contactBanner} alt="contactBanner-img" />
            </div>
        </div>
    )
}

export default Contact
