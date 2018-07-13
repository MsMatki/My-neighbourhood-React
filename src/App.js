import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import escapeRegExp from 'escape-string-regexp';
import Container from './mapContainer'
import sortBy from 'sort-by'

class App extends Component {

state = {
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {},
  active: false,

  sidebar:'open',
  query: '',
  places: [
    {
        name: 'Westmount Golf & Country Club',
        position: {lat: 43.4485, lng:  -80.5339},
    },
    {
        name: 'David Johnston Research & Technology Park',
        position: { lat: 43.4804, lng: -80.5494},
    },
    {
        name: 'Wilfrid Laurier University',
        position: { lat: 43.4724, lng: -80.5263},
    },
    {
        name: 'University of Waterloo',
        position: {lat: 43.4723, lng: -80.5449},
    },
    {
        name: 'St. Mary’s General Hospital',
        position: {lat: 43.4379, lng: -80.5014},
    }
],
}

onMarkerClick = (props, marker, e) => {
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
});
}

onMapClicked = (props) => {
if (this.state.showingInfoWindow) {
  this.setState({
    showingInfoWindow: false,
    activeMarker: null
  })
}
};

onSidePanelCLick = () => {

}

updateQuery = (query) => {
  this.setState({
    query: query
  })
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
    const {query} = this.state;
    const {places} = this.state;
    //get the filter query to filter the listitems 
    let filteredLocations
    if (query){
      const match = new RegExp(escapeRegExp(query),'i')
      filteredLocations = places.filter((place)=> match.test(place.name))
    }
    else{
      filteredLocations=places
    }
    filteredLocations.sort(sortBy('name'))
  
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

  <div className="side-nav">
  <h2>Popular Places</h2>
  <div className="searchbox">
      <input className="search" data-bind="textInput: searchOption, valueUpdate: 'afterkeydown'" placeholder="Search Locations..." 
      value={this.state.query}
      onChange={(event) => this.updateQuery(event.target.value)}
      />
      </div>
      <ul className="places">
      {filteredLocations.map((place) => (     
        <li key={place.name} className="" onClick={this.onMarkerClick}>{place.name}</li>
        ))}
    </ul>
  </div>
  <div className="map-container">
      <Container 
      places={filteredLocations} 
      clickMarker={this.onMarkerClick}
      activeMarker={this.state.activeMarker}
      showingInfoWindow={this.state.showingInfoWindow}
      selectedPlace={this.state.selectedPlace}
      onMapClicked={this.onMapClicked}
      />
      </div>
      </div>
    );
  }
}

export default App;
