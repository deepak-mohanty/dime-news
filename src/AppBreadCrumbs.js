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