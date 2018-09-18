import React, {Component} from 'react';
import StrainCard from '../StrainCard/StrainCard';
import axios from 'axios';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      species: 'indica',
      list: []
    }
    this.key = '5qO8Dl0';
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
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
      this.setState({list: loopList})
      console.log(this.state.list)
    })
  }

  render() {

    let strainCards = this.state.list.map((strain, i) => {
      return <StrainCard key={i} id={strain.id} name={strain.name} race={strain.race} flavors={strain.flavors} effects={strain.effects}/>
    })

    return (
      <div className='searchPage'>
        <div className='searchArea'>
          <select name='species' onChange={this.handleChange}>
            <option value='indica'>Indica</option>
            <option value='sativa'>Sativa</option>
            <option value='hybrid'>Hybrid</option>
          </select>
          <button onClick={this.search}>Search</button>
        </div>
        <div className='strains'>
          {strainCards}
        </div>
      </div>
    )
  }
}