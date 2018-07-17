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

    componentDidMount(){
        this.loadMap();
    }
    loadMap() {
        //Check if Google props has data and Map is loaded --Based on feedback
        if(this.props && this.props.google) {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: {lat: 43.4485, lng: -80.5339},
                zoom: 11,
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: 'content'
            });
            this.setState({map, infoWindow});
            this.setMarkers(map);
        }
    }

    updateQuery = (query) => {
        this.setState({
          query: query
        })
      }


    setMarkers = (map) => {
        const {query} = this.state;
        const {places} = this.state;
        //get the filter query to filter the listitems 
        let filteredLocations
        if (query){
          const match = new RegExp(escapeRegExp(query),'i')
          filteredLocations = places.filter((place) => match.test(place.name))
        }
        else{
          filteredLocations=places
        }
        filteredLocations.sort(sortBy('name'))
        
        let markers = filteredLocations.map(place => {
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

            return marker;
        });
        this.setState({markers})
    }


    render() {
        const {query} = this.state;
        const {places} = this.state;
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
            tips={this.state.tips} 
            filteredLocations={filteredLocations}
            marker={this.state.markers}
            infoWindow={this.state.infoWindow}
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


export default Map;

