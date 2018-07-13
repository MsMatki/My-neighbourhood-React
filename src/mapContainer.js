
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'



export class Container extends Component{
    
    
        render() {

          return (
        <Map google={this.props.google}
            onClick={this.props.onMapClicked}
            initialCenter={{
              lat:43.4643, 
              lng:-80.5204
            }}
            zoom={12}
            >
            {this.props.places.map((place) => (
            <Marker
            key={place.name}
            onClick={this.props.clickMarker}
            position={place.position}
            name={place.name}
            ></Marker>
          ))}

        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}>
          
            <div>
              <h3>{this.props.selectedPlace.name}</h3>
            </div>
        </InfoWindow>
      </Map>
          );
        }
    }
      


export default GoogleApiWrapper({
    apiKey:('AIzaSyD3CUp0hxnPlJ3Ig0vpm2klPIuOWJjCdcc')
  })(Container)