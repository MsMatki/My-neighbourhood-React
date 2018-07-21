import React, { Component } from 'react';
import Sidebar from './Sidebar'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'


class Map extends Component{


state = {
    map: {},
    infoWindow: {},
    markers: [],
    query:'',
    places: [
        {
            name: 'Cafe O Roaster',
            position: {lat: 43.4637, lng:  -80.4650},
            venue_id: '4c69d255d0bdc9b69e0da70b',
        },
        {
            name: 'Aroma Cafe',
            position: { lat: 43.4647, lng: -80.5235},
            venue_id: '4b6047c3f964a5207bdd29e3',
        },
        {
            name: 'Princess Cafe',
            position: { lat: 43.4664, lng: -80.5226},
            venue_id: '4c03e06139d476b061a630a7',
        },
        {
            name: "Balzac's Coffee",
            position: {lat: 43.4514, lng: -80.4982},
            venue_id: '4c814190d34ca14300a92080',
        },
        {
            name: 'City Cafe Bakery',
            position: {lat: 43.4762, lng: -80.4847},
            venue_id: '51af397f498eed68816c2557',
        },
        {
            name: 'Williams Coffee Pub',
            position: {lat: 43.4767, lng: -80.5230},
            venue_id: '4b9bbfc8f964a520d12036e3',
        },
        {
            name: 'Williams Fresh Café',
            position: {lat: 43.4724, lng: -80.5385},
            venue_id: '4b5fa4a8f964a5200bc629e3',
        },
        {
            name: 'Berlin Bicycle Cafe',
            position: {lat: 43.4536, lng: -80.5182},
            venue_id: '571e509e498e65ecae235c30',
        },
    ],
}

    componentDidMount(){
        this.loadMap();
    }
    loadMap() {
        //Check if Google props has data and Map is loaded --Based on feedback
        if(this.props && this.props.google) {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: {lat: 43.4485, lng: -80.5339},
                zoom: 13,
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: 'content'
            });
            this.setState({map, infoWindow});
            this.setMarkers(map);
        }
    }

    updateQuery = (query) => {
        this.setState({query: query})
        const {markers} = this.state
        //filter markers
        markers.forEach((marker) => {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0){
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        });
        
        this.setState({markers});
    };

    setMarkers = (map) => {
        
        let markers = this.state.places.map(place => {
            const marker = new window.google.maps.Marker({
                position: {lat: place.position.lat, lng: place.position.lng},
                map,
                title: place.name
            });
            marker.addListener('click', () => {
                this.state.map.panTo(marker.getPosition());
                this.state.infoWindow.setContent(`
                    <div name=${marker.title}>
                        <h3>${marker.title}</h3>
                    </div>`);
                this.state.infoWindow.open(map, marker)
            });
            marker.addListener('mouseover', function() {
                this.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => this.setAnimation(null), 400)
            });

            return marker;
        });
        this.setState({markers})
    }


    render() {
        const {query} = this.state;
        const {markers} = this.state
        //get the filter query to filter the listitems 
        let filteredLocations
        if (query){
          const match = new RegExp(escapeRegExp(query),'i')
          filteredLocations = markers.filter((marker)=> match.test(marker.title))
        }
        else{
          filteredLocations=markers
        }
        filteredLocations.sort(sortBy('title'))
        const style = {
            width: '100vw',
            height: '100vh'
        }
        return (
            <div>
            <Sidebar 
            updateQuery={this.updateQuery} 
            query={this.state.query}
            map={this.state.map} 
            filteredLocations={filteredLocations}
            marker={this.state.markers}
            infoWindow={this.state.infoWindow}
            openCloseMenu={this.props.openCloseMenu}
            />
            <div className="map-container">
            <div className="container" role="main">
                <div className="map-container">
                    <div id="map" style={style} role="application"/>
                </div>
            </div>
            </div>
            </div>
        )
    }

}
var foursquare = require('react-foursquare')({
    clientID: 'CWQ3TXXBMMD30Y5OX4O3XMW1PWD1XBAI5DQISABAH2D2RVDL',
    clientSecret: 'IU40MZ3LYRZC1MU431LJCYO1BZDFAMJ1OZNZYCM0F3FOY35W'  
  });

export default Map;

