import React, { Component } from 'react';
import Item from './NavItem'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Sidebar = props => {  

        const {map,infoWindow} = props;
        return(
        <div className="side-nav">
            <div className="menu-box">
            <h5>Main Menu</h5>
            <div className="tooltip" ><a className="times" aria-label="Close" onClick={props.openCloseMenu}><FontAwesomeIcon icon={faTimesCircle}/><span className="tooltiptext">Collapse Side Panel</span></a></div>
            </div>
            <div className="searchbox">
                <input type="text" className="search" tabIndex="1" aria-label="Search" role="search" placeholder="Filter Locations..." 
                value={props.query}
                onChange={(event) => props.updateQuery(event.target.value)}
                />
                </div>
                <ul className="places">
                {props.filteredLocations.map((marker) => (     
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

export default Sidebar;