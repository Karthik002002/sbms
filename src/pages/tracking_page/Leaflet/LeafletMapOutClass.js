import { error } from 'is_js';
import React, { Component } from 'react';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';
import { MapContainer, TileLayer, Popup, Tooltip } from 'react-leaflet';
import runningIcon from '../Icons/running.png';
import defaultIcon from '../Icons/idle.png'

class LeafLetMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconData: null
    };
    this.intervalFunction = null;
  }
  
  customIcon = L.icon({
    iconUrl: runningIcon,
    iconSize: [45, 40]
  });
  componentDidMount() {
    this.intervalFunction = setInterval(() => {
      this.fetchAPI();
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalFunction);
  }
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
  

  // statusCheckIcon = data =>{
  //   if(data !== runningIcon){
  //     return defaultIcon
  //   } else if( data=== runningIcon){
  //     return runningIcon
  //   }
  // }
  

  render() {
    return (
      <>
        <MapContainer
          center={[13, 77]}
          zoom={12}
          style={{ height: '85vh', width: '100%' }}
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
            icon={this.customIcon}
          >
            <Popup>
              Vehicle ID :{' '}
              {this.state.iconData !== null ? this.state.iconData.id : 'null'}
            </Popup>
          </ReactLeafletDriftMarker>
        </MapContainer>
      </>
    );
  }
}

export default LeafLetMap;
