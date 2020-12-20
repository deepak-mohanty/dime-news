
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Pages/Header';
import Home from './components/Pages/Home';
import Category from './components/Pages/Category';
import Notfound from './components/Pages/Notfound';
import DetailNews from './components/Pages/DetailNews';
import DetailInfo from './components/Pages/DetailInfo';
import Contact from './components/Pages/Contact';

function App() {
  return (
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/categories" exact={true} component={Category} />
            <Route path="/category" exact={true} component={DetailNews} />
            <Route path="/contact" exact={true} component={Contact} />
            <Route path="/:info" exact={true} render={(props) => <DetailInfo {...props} />} />
            <Route path="*" component={Notfound} />
          </Switch>
        </Router>

  );
}

export default App;
