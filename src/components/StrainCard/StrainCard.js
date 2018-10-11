import React, {Component} from 'react';
import './StrainCard.css';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import potLeaf from '../../assets/pot-leaf-icon.png';

export default class StrainCard extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      desc: '',
      backgroundColor: ''
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
    this.setState({ showModal: false });
  }

  render() {

    let medicinal = this.props.effects.medical.map((effect, i) => <li key={i}>{effect}</li>)
    let positive = this.props.effects.positive.map((effect, i) => <li key={i}>{effect}</li>)
    let negative = this.props.effects.negative.map((effect, i) => <li key={i}>{effect}</li>)
    let flavors = this.props.flavors.map((flav, i) => <li key={i}>{flav}</li>)
    let species = this.props.species.charAt(0).toUpperCase(0) + this.props.species.slice(1);
    let noDesc = 'No description available'

    return (
      <div>
        <div className='strainCard' onClick={this.handleOpenModal} style={{backgroundColor: this.props.bgColor}}>
            <span>{this.props.name}</span>
            <img className='weedImg' alt='leaf' src={potLeaf}/>
        </div>
        <Modal
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          classNames={{overlay: 'overlay', modal: 'modal', closeIcon: 'closeIcon', closeButton: 'closeButton'}}
        >
          <div className='title'>
            <div className='name'>{this.props.name}</div>
            <div className='species'>{species}</div>
          </div>
          <p className='description'>{this.state.desc===null?noDesc:this.state.desc}</p>
          <div className='allLists'>
            <div className='lists'>
              <div className='list'>
                Positive Effects:
                <ul>{positive.length>0?positive:<li>None</li>}</ul>
              </div>
              <div className='list'>
                Medical Use For:
                <ul>{medicinal.length>0?medicinal:<li>None</li>}</ul>
              </div>
            </div>
            <div className='lists'>
              <div className='list'>
                Negative Effects:
                <ul>{negative.length>0?negative:<li>None</li>}</ul>
              </div>
              <div className='list'>
                Flavors:
                <ul>{flavors}</ul>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}