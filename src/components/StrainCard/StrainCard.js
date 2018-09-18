import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class StrainCard extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Link to={`/search/${this.props.name}/${this.props.id}`}>{this.props.name}</Link>
      </div>
    )
  }
}