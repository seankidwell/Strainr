import React, {Component} from 'react';
import StrainCard from '../StrainCard/StrainCard';
import Pagination from "react-js-pagination";
import axios from 'axios';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      species: 'indica',
      list: [],
      activePage: 1
    }
    this.key = '5qO8Dl0';
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  search() {
    axios.get(`http://strainapi.evanbusse.com/${this.key}/strains/search/all`).then(res => {
      let loopList = [];
      for (var key in res.data) {
        if (res.data[key].race===this.state.species) {
          let newObj = res.data[key];
          newObj.name = key;
          loopList.push(newObj)
        }
      }
      this.setState({list: loopList, activePage: 1})
    })
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {

    let strainCards = this.state.list.map((strain, i) => {
      let backgroundColor = '';
      if (strain.race==='indica') {
        backgroundColor = '#0000ff'
      } else if (strain.race==='sativa') {
        backgroundColor = '#ff9900'
      } else {
        backgroundColor = '#804c80'
      }
      return <StrainCard key={i} id={strain.id} name={strain.name} species={strain.race} flavors={strain.flavors} effects={strain.effects} bgColor={backgroundColor}/>
    })

    let shortList = strainCards.slice(0,10);

    let arrayOfPages = [];
    while (strainCards.length > 0) {
      arrayOfPages.push(strainCards.splice(0,30))
    }

    return (
      <div id='searchPage'>
        <div id='searchArea'>
          <select name='species' onChange={this.handleChange}>
            <option value='indica'>Indica</option>
            <option value='sativa'>Sativa</option>
            <option value='hybrid'>Hybrid</option>
          </select>
          <button onClick={this.search}>Search</button>
        </div>
        <div className='strains'>
          {arrayOfPages[this.state.activePage-1]}
        </div>
        {this.state.list.length!==0?
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={36}
          totalItemsCount={this.state.list.length}
          onChange={this.handlePageChange}
          itemClass='itemClass'
        />:
        null}
      </div>
    )
  }
}