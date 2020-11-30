
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Category from './components/Category';
import Notfound from './components/Notfound';
import DetailNews from './components/DetailNews';
import DetailInfo from './components/DetailInfo';


   // <Route path="*" component={Notfound} /> 
function App() {
  return (
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/categories" exact={true} component={Category} />
            <Route path="/category/:name" exact={true} component={DetailNews} />
            <Route path="/:info" exact={true} component={DetailInfo} />
            <Redirect to="/" />
          </Switch>
        </Router>

  );
}

export default App;
