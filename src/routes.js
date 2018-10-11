import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';

export default (
  <Switch>
    <Route component={Home} exact path='/'/>
    <Route component={Search} path='/search'/>
  </Switch>
)