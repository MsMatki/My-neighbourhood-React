import React, { Component } from 'react';
import Item from './NavItem'


class Sidebar extends Component{

  
    render(){
        const {tips,map,infoWindow,marker} = this.props;
        return(

        <div className="side-nav">
            <h2>Popular Places</h2>
            <div className="searchbox">
                <input className="search" data-bind="textInput: searchOption, valueUpdate: 'afterkeydown'" placeholder="Search Locations..." 
                value={this.props.query}
                onChange={(event) => this.props.updateQuery(event.target.value)}
                />
                </div>
                <ul className="places">
                {this.props.filteredLocations.map((marker) => (     
                    <Item 
                    key={marker.title} className="" 
                    map={map} 
                    tips={tips} 
                    marker={marker} 
                    infoWindow={infoWindow}/>
                    ))}
                </ul>
        </div>
        )

    }
}

export default Sidebar;