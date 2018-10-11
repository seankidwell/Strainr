import React from 'react';
import './Nav.css'
import {Link} from 'react-router-dom';

export default function Nav () {
  return (
    <div id='nav'>
      <div className='navBar'>
        <Link to={'/'}>Home</Link>
        <Link to={'/search'}>Search</Link>
      </div>
      <h1>Strainr</h1>
    </div>
  )
}