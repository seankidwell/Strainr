import React, { Component } from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav';
import './App.css';

class App extends Component {
  //test123 do re mi
  render() {
    return (
      <div className="App">
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
