import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Search from './components/Search/Search';
import StrainPage from './components/StrainPage/StrainPage';

export default (
  <Switch>
    <Route component={Search} exact path='/'/>
    <Route component={StrainPage} path='/search/:name/:id'/>
  </Switch>
)