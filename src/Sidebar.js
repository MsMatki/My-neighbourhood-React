import React, { Component } from 'react';
import Item from './NavItem'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Sidebar extends Component{

  
    render(){
        const {tips,map,infoWindow,marker} = this.props;
        return(

        <div className="side-nav">
            <div className="menu-box">
            <h5>Main Menu</h5>
            <div className="tooltip"><a className="times" onClick={this.props.openCloseMenu}><FontAwesomeIcon icon={faTimesCircle}/><span class="tooltiptext">Collapse Side Panel</span></a></div>
            </div>
            <div className="searchbox">
                <input className="search" data-bind="textInput: searchOption, valueUpdate: 'afterkeydown'" aria-labelledby="filter" placeholder="Search..." 
                value={this.props.query}
                onChange={(event) => this.props.updateQuery(event.target.value)}
                />
                </div>
                <ul className="places">
                {this.props.filteredLocations.map((marker) => (     
                    <Item 
                    key={marker.title} className="" 
                    map={map} 
                    marker={marker} 
                    infoWindow={infoWindow}/>
                    ))}
                </ul>
        </div>
        )

    }
}

export default Sidebar;