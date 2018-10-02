import React, {Component} from 'react';
import './StrainCard.css';
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement('#root');

export default class StrainCard extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      desc: ''
    }
    this.key = '5qO8Dl0';
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    axios.get(`http://strainapi.evanbusse.com/${this.key}/strains/data/desc/${this.props.id}`).then(res => {
      this.setState({desc: res.data.desc})
    })
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }
  
  handleCloseModal() {
    console.log('Close Hit')
    this.setState({ showModal: false, desc: 'it worked' });
  }

  render() {

    let medicinal = this.props.effects.medical.map((effect, i) => <li key={i}>{effect}</li>)
    let positive = this.props.effects.positive.map((effect, i) => <li key={i}>{effect}</li>)
    let negative = this.props.effects.negative.map((effect, i) => <li key={i}>{effect}</li>)
    let flavors = this.props.flavors.map((flav, i) => <li key={i}>{flav}</li>)
    let species = this.props.species.charAt(0).toUpperCase(0) + this.props.species.slice(1);

    return (
      <div className='strainCard' onClick={this.handleOpenModal}>
          {this.props.name}
          <Modal
           isOpen={this.state.showModal}
           onRequestClose={this.handleCloseModal}
           className="modal"
           overlayClassName="overlay"
           shouldCloseOnOverlayClick={true}
          >
            <div className='title'>
              <div className='name'>{this.props.name}</div>
              <div className='species'>{species}</div>
            </div>
            <p className='description'>{this.state.desc}</p>
            <div className='allLists'>
              <div className='lists'>
                <div className='list'>
                  Positive Effects:
                  <ul>{positive.length>0?positive:<li>None</li>}</ul>
                </div>
                <div className='list'>
                  Negative Effects:
                  <ul>{negative.length>0?negative:<li>None</li>}</ul>
                </div>
              </div>
              <div className='lists'>
                <div className='list'>
                  Medical Use For:
                  <ul>{medicinal.length>0?medicinal:<li>None</li>}</ul>
                </div>
                <div className='list'>
                  Flavors:
                  <ul>{flavors}</ul>
                </div>
              </div>
            </div>
            <button onClick={this.handleCloseModal}>Close</button>
          </Modal>
      </div>
    )
  }
}