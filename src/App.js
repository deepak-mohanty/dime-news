
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Category from './components/Category';
import Notfound from './components/Notfound';
import DetailNews from './components/DetailNews';
import DetailInfo from './components/DetailInfo';
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
