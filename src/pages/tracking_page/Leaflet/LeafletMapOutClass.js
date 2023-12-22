import React, { Component } from 'react';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import L from 'leaflet'
import runningIcon from '../Icons/running.png';
import defaultIcon from '../Icons/idle.png';
import RotatedMarker from './RotatedMarker';

class LeafLetMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconData: null
    };
    this.intervalFunction = null;
  }

  //Icon Status check function
  customIcon = iconData => {
    if (iconData) {
      if (iconData.ignition === 1 && iconData.speed > 0) {
        return L.icon({
          iconUrl: runningIcon,
          iconSize: [40, 35]
        });
      }
    } else {
      return L.icon({
        iconUrl: defaultIcon,
        iconSize: [40, 35]
      });
    }
  };

  componentDidMount() {
    this.intervalFunction = setInterval(() => {
      this.fetchAPI();
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalFunction);
  }

  //API function With a interval of 10 second until the component unmounts
  fetchAPI = async () => {
    try {
      const response = await fetch(
        'http://192.168.0.30:8000/search/869523058096042/'
      );
      if (!response.ok) {
        throw new Error('Error on API');
      }
      const result = await response.json();
      this.setState({ iconData: result });
      console.log(result);
    } catch (error) {
      console.log('Error on the API call', error);
    }
  };

  render() {
    const bounds = [
      [11.305553,77.839714],
      [14.120595,77.387081]
    ]
    return (
      <>
        <MapContainer
          center={[13, 77]}
          zoom={12}
          style={{ height: '79vh', width: '100%' }}
          maxBounds={bounds}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            minZoom={5}
          />
          <ReactLeafletDriftMarker
            position={
              this.state.iconData &&
              this.state.iconData.lat &&
              this.state.iconData.lon
                ? [this.state.iconData.lat, this.state.iconData.lon]
                : [13, 77]
            }
            duration={4000}
            keepAtCenter={false}
            icon={this.customIcon(this.state.iconData)}
            rotationOrigin="center"
            rotationAngle={this.state.iconData && this.state.iconData.heading ? this.state.iconData.heading : 0}
          >
            <Popup>
              Vehicle ID :{' '}
              {this.state.iconData !== null ? this.state.iconData.id : 'null'}
              <br />
              Register Number :
              {this.state.iconData !== null
                ? this.state.iconData.reg_no
                : 'null'}
            </Popup>
          </ReactLeafletDriftMarker>          
        </MapContainer>
      </>
    );
  }
}

export default LeafLetMap;