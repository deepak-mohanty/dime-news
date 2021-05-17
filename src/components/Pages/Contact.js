import React, {useState, Suspense} from 'react';

import contactBanner from '../../assets/images/contact-us.jpg';
import '../../assets/styles/contact.scss';


const TabManager = React.lazy(() => import ('./../Utils/TabManager'));

const TabList = [
  { label: "Testimonial", value: 1 },
  { label: "Contact Us", value: 2 },
];

function Contact() {
     const [activeTab, handleTab] = useState(1);

    return (
        <div className="contact__wrapper">
            <div className="contactImg__wrapper">
                <img src={contactBanner} alt="contactBanner-img" />
                <div className="container">
                    <div className="contactImg--content">
                        <div className="contactMe">Contact Me</div>
                        <div className="letsConnect">Lets Connect</div>
                    </div>
                </div>
            </div>
            <div className="contact__content--wrapper">
                <div className="container">

                    <Suspense fallback={ <div className="pre-loader">Loading</div> }>
                        <TabManager tabs={TabList} activeTab={activeTab} handleTab={handleTab} />
                    </Suspense>

                    <div className="tab-content">
                        <div className={activeTab === 1 ? 'tabSelected' : 'tabHidden'}>
                            <div className="form__header">Drop a Testimonial</div>
                            <form>
                                <div>
                                    <label htmlFor="testimonial-name">Name :</label>
                                    <input type="text" name="testimonial-name" value="" />
                                </div>
                                <div>
                                    <label htmlFor="testimonial-email">Email :</label>
                                    <input type="email" name="testimonial-email" value="" />
                                </div>
                                <div>
                                    <label htmlFor="testimonial-designation">Designation :</label>
                                    <input type="text" name="testimonial-designation" value="" />
                                </div>
                                <div>
                                    <label htmlFor="testimonial-company">Company Name :</label>
                                    <input type="text" name="testimonial-company" value="" />
                                </div>
                            </form>
                        </div>
                        <div className={activeTab === 2 ? 'tabSelected' : 'tabHidden'} >
                            COntact FOrm
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact
