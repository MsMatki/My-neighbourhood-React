import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import Map from './mapContainer'
import {GoogleApiWrapper} from 'google-maps-react'

class App extends Component {

state = {
  sidebar:'open',
}

openCloseMenu = () => {
  let ul = document.querySelector('.side-nav')
    if(this.state.sidebar === 'open'){
    ul.classList.add('response');
    this.setState({sidebar: 'closed'})
    }else{
      ul.classList.remove('response');
      this.setState({sidebar: 'open'})
    }
}
  render() {
  
    return (
      <div className="App">
        <header className="header">
      <span className="open-slide">
          <a className="angle-right tooltip" onClick={this.openCloseMenu}>
          <FontAwesomeIcon icon={faChevronCircleRight} /><span className="tooltiptext position">Expand Side Panel</span> 
      </a>
    </span>
  <div className="">
    <ul className="header-nav">
      <h1>Waterloo Coffee Places</h1>
    </ul>
  </div>
  </header>
  <Map google={this.props.google} openCloseMenu={this.openCloseMenu}/>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:('AIzaSyD3CUp0hxnPlJ3Ig0vpm2klPIuOWJjCdcc')
})(App)