import React, {Component} from 'react';
import axios from 'axios';

export default class StrainPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      desc: '',
      species: '',
      medicinal: [],
      positive: [],
      negative: [],
      flavors: []
    }
    this.key = '5qO8Dl0';
  }

  componentDidMount() {

    axios.get(`http://strainapi.evanbusse.com/${this.key}/strains/search/name/${this.props.match.params.name}`).then(res => {
      console.log('get with name:',res)
      let {name, desc, race} = res.data[0];
      race = race.charAt(0).toUpperCase(0) + race.slice(1);
      this.setState({name: name, desc: desc, species: race})
    })

    axios.get(`http://strainapi.evanbusse.com/${this.key}/strains/data/effects/${this.props.match.params.id}`).then(res => {
      console.log('id effects:',res)
      this.setState({medicinal: res.data.medical, positive: res.data.positive, negative: res.data.negative})
    })

    axios.get(`http://strainapi.evanbusse.com/${this.key}/strains/data/flavors/${this.props.match.params.id}`).then(res => {
      console.log('id flavors:',res)
      this.setState({flavors: res.data})
    })
  }

  render() {
    
    let medicinal = this.state.medicinal.map((effect, i) => <li key={i}>{effect}</li>)
    let positive = this.state.positive.map((effect, i) => <li key={i}>{effect}</li>)
    let negative = this.state.negative.map((effect, i) => <li key={i}>{effect}</li>)

    return (
      <div className='strainPage'>
        <div>{this.state.name}</div>
        <div>{this.state.species}</div>
        <p>{this.state.desc}</p>
        <div>
          Medical
          <ul>{medicinal}</ul>
        </div>
        <div>
          Positive
          <ul>{positive}</ul>
        </div>
        <div>
          Negative
          <ul>{negative}</ul>
        </div>
      </div>
    )
  }
}