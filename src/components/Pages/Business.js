import React,{useState, useEffect, Suspense} from 'react';
import {newsApiInstance, cancelToken} from '../../apis/api';

import './../../assets/styles/individualInfo.scss';
// import TopCards from '../Cards/TopCards';

const TopCards = React.lazy(() => import ('../Cards/TopCards'));

function Business(props) {
    
    const [businessNews, setBusinessNews] = useState([]);

    // //Top Sports useEffect
    useEffect(() => {

        //Get BUsiness News API call starts
        const getBusinessNews = async () => {

            try{

                const response = await newsApiInstance.get('/top-headlines', {
                    params: {
                        country: 'US',
                        category: 'business',
                        sortBy: 'popularity'
                    }
                })
                return setBusinessNews(response.data.articles);
            }
            
            catch(error){
                // if (cancelToken.isCancel(error)) {
                //     console.log('Error: ', error.message);
                //     return true;
                // } else {
                //     throw new Error(error);
                // }
                      console.log('Error: ', error.message);
            }
        }

        // getBusinessNews();
        //Get BUsiness News API call starts

        // componentWillUnmount events
        //  return () =>{
        //     cancelToken.cancel();
        // }

    }, []);

    const bNews = businessNews.splice(0,3);
    const allBusinessNews = businessNews;

    return (
        <Suspense fallback={ <div className="pre-loader">Loading</div> }>
            <TopCards title={props.heading} newsListType={bNews} newsAllList={allBusinessNews} />
        </Suspense>
    )
}

export default Business;
