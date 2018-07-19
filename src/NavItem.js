import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'


class Item extends Component{
    openMarker = () => {
        const {map, infoWindow, marker} = this.props;
        map.panTo(marker.getPosition());
        infoWindow.setContent(
            `<div name=${ marker.title }>
                <h3>${marker.title}</h3>
            </div>`
        );
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null)
        }, 800)
        infoWindow.open(map, marker)
    }
    componentDidMount(){
        const {marker} = this.props;
                $('.list li').click(function () {
                    $('.list .active').removeClass('active');
                    $(this).addClass('active');
                  })
            marker.addListener("click", function() {
                $('.list .active').removeClass('active');
            });
        }   

    render(){
        const {marker} = this.props;
        return(
            <div className="list">
            <li className="card" onClick={this.openMarker}><span className="row"><span className="home"><FontAwesomeIcon icon={faHome} /></span>{marker.title}</span><span className="icon-right"><FontAwesomeIcon icon={faAngleRight} /></span></li>
            </div>
        )
    }
}

export default Item;