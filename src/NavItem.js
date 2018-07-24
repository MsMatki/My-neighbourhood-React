import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'


class Item extends Component{
    openMarker = () => {
        const {map, infoWindow, marker} = this.props;
        map.panTo(marker.getPosition());
        infoWindow.setContent(
            `<div class="infoWindow">
            <div name=${ marker.title }>
                <h3>${marker.title}</h3>
                <p>${marker.text}</p>
                <p>Tips provided by <a href="https://foursquare.com/">Foursquare</a></p>
            </div>
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
            <li className="card" tabIndex="2" onClick={this.openMarker}><div className="box"><span className="icon-awesome"><FontAwesomeIcon icon={faCoffee} /></span><span className="row">{marker.title}<span className="icon-right"><FontAwesomeIcon icon={faAngleRight} /></span></span></div></li>
            </div>
        )
    }
}

export default Item;