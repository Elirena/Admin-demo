import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {connect} from "react-redux";

/**
 * Google map
 */

const MarkComponent = ({ text }) => <div className="mark-text">
    <span className="fui-location local-mark"/>{text}</div>;

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        const {location} = this.props;
        const center = location ? {
                lat: parseFloat(location[0]),
                lng: parseFloat(location[1])
            } : this.props.center;
        return (
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={center}
                    defaultZoom={this.props.zoom}
                >
                    <MarkComponent
                        lat={location[0]}
                        lng={location[1]}
                        text={location[0]+ ',' +location[1]}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userId: state.userId
    }}

export default connect(mapStateToProps)(Map);
