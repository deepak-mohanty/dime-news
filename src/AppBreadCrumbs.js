import React from 'react';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import {BrowserRouter as Router} from 'react-router-dom';

import './assets/styles/breadcrumbs.scss';

const routesList = {
    '/': 'Home',
    '/category/:name': 'Politics'
}

const AppBreadCrumbs = () => {
    return(
        <Router>
            <Breadcrumbs mappedRoutes={routesList}
                WrapperComponent={(props) => <ol className="breadcrumb" >{props.children}</ol>}
                ActiveLinkComponent={(props) => <li className="active" >{props.children}</li>}
                LinkComponent={(props) => <li>{props.children}</li>} // Don't create link tag or <Link />. Component will wrapp props.children with <Link />
            />
        </Router>
    )
}

export default AppBreadCrumbs;

//NOTE: https://github.com/icd2k3/react-router-breadcrumbs-hoc


// const Breadcrumbs = (props) => (
//     <div className="breadcrumbs">
//         <ul className='container'>
//             <Route path='/:path' component={BreadcrumbsItem} />
//         </ul>
//     </div>
// )

// const BreadcrumbsItem = ({ match, ...rest }) => (
//     <React.Fragment>
//         <li className={match.isExact ? 'breadcrumb-active' : undefined}>
//             <Link to={match.url || ''}>
//                 {match.url}
//             </Link>
//         </li>
//         <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
//     </React.Fragment>
// )