
import React, { Suspense } from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';

const HeaderComponent = React.lazy(() => import('./components/Pages/Header'));
const HomeComponent = React.lazy(() => import ('./components/Pages/Home'));
const Category = React.lazy(() => import ('./components/Pages/Category'));
const DetailNews = React.lazy(() => import ('./components/Pages/DetailNews'));
const DetailInfo = React.lazy(() => import ('./components/Pages/DetailInfo'));
const Contact = React.lazy(() => import ('./components/Pages/Contact'));
const Notfound = React.lazy(() => import ('./components/Pages/Notfound'));

function App() {
  return (
        <Router>
            <Suspense fallback={ <div className="pre-loader">Loading</div> }>
                <HeaderComponent />
                <Switch>
                  <Route path={ROUTES.HOME} component={HomeComponent} exact={true}/>
                  <Route path={ROUTES.CATEGORIES} exact={true} component={Category} />
                  <Route path={ROUTES.CATEGORY} exact={true} component={DetailNews} />
                  <Route path={ROUTES.CONTACT} exact={true} component={Contact} />
                  <Route path={ROUTES.DETAIL} exact={true} render={(props) => <DetailInfo {...props} />} />
                  <Route path={ROUTES.NOT_FOUND} component={Notfound} />
                </Switch>
            </Suspense>
        </Router>

  );
}

export default App;
