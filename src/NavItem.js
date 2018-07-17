import React, { Component } from 'react';

class Item extends Component{
    openMarker = () => {
        const {tips, map, infoWindow, marker} = this.props;
        map.panTo(marker.getPosition());
        infoWindow.setContent(
            `<div name=${ marker.title }>
                <h3>${marker.title}</h3>
            </div>`
        );
      
        infoWindow.open(map, marker)

    }

    render(){
        const {marker} = this.props;
        return(
            <div>
            <li className="" onClick={this.openMarker}>{marker.title}</li>
            </div>
        )
    }
}

export default Item;