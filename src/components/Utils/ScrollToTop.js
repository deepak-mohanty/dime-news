
import React, {useState, useEffect} from 'react';

import ScrollTopIcon from '..//../assets/images/chevrons-up.svg';
import '../../assets/styles/scroll.scss';


const ScrollToTop = (props) => {

    const [show, setShow] = useState(props.showBelow ? false : true);

    const handleScroll = () => {
        if(window.pageYOffset > props.showBelow){
           setShow(true)
        }
        else{
            setShow(false)
        }
    }

    useEffect(()=>{
        if(props.showBelow){
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScrollToTop = () => {
        window[`scrollTo`]({top: 0, behavior: "smooth"})
    }


    return (
        <>
            {show ?  (
                <div className="scroll-top" onClick={handleScrollToTop}>
                    <img src={ScrollTopIcon} alt="scroll-top-img" className='scroll-top-img' />
                </div>
             ) : ""
            }
        </>
    )
}

export default ScrollToTop;
