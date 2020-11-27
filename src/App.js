
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Category from './components/Category';
import Notfound from './components/Notfound';
import DetailNews from './components/DetailNews';
import DetailInfo from './components/DetailInfo';

function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/categories" component={Category} />
          <Route path="/:info" exact component={DetailInfo} />
          <Route path="/category/:name" exact component={DetailNews} />
          <Route path='*' component={Notfound} /> 
        </Switch>
      </Router>
  );
}

export default App;
