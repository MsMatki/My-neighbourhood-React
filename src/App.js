import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
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
      <a onClick={this.openCloseMenu} >
      <FontAwesomeIcon icon={faBars} /> MENU
      </a>
    </span>
  <div className="">
    <ul className="header-nav">
      <h1>Neighbourhood map</h1>
    </ul>
  </div>
  </header>
  <Map google={this.props.google}/>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:('AIzaSyD3CUp0hxnPlJ3Ig0vpm2klPIuOWJjCdcc')
})(App)