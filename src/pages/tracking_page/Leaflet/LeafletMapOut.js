import React, { useContext, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';
import AppContext from 'context/Context';

import 'leaflet-rotatedmarker';

const LeafletMapExample = ({ imei }) => {
  let [iconLocation, setIconLocation] = useState([13, 77]);
  const markerRef = useRef(null);
  const customIcon = L.icon({
    iconUrl: require('../Icons/bus-idle-64.png'),
    iconSize: [45, 40]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(imei);
        const response = await fetch(
          `http://192.168.0.30:8000/search/869523058096042/`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        setIconLocation([result.lat, result.lon]);
        console.log(result);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 10 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  function LayerComponent() {
    const map = useMap();
    const { config } = useContext(AppContext);
    const { isDark } = config;
    const {
      config: { currentVehicle }
    } = useContext(AppContext);
    var myPositionMarker = null;
    const filter = isDark
      ? [
          'invert:98%',
          'grayscale:69%',
          'bright:89%',
          'contrast:111%',
          'hue:205deg',
          'saturate:1000%'
        ]
      : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];

    // useEffect(() => {
    //   if (map) {
    //     L.tileLayer
    //       .colorFilter(
    //         'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    //         {
    //           attribution: null,
    //           transparent: true,
    //           filter: filter
    //         }
    //       )
    //       .addTo(map);
    //   }
    // }, [isDark]);

    return (
      <>
        
      </>
    );
  }

  function LeafletMap() {
    return (
      <MapContainer
        zoom={20}
        // minZoom={isRTL ? 1.8 : 1.1}
        // zoomSnap={0.25}
        center={[13,77]}
        // center={position}
        radius={200}
        style={{ height: '85vh', width: '100%' }}
      >
         <TileLayer
          attribution={null}
          url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
        />
        <ReactLeafletDriftMarker
          icon={customIcon}
          position={{lat:iconLocation[0], lon:iconLocation[1]}}
          duration={2000}
          keepAtCenter={true}
        ></ReactLeafletDriftMarker>
       
      </MapContainer>
    );
  }

  return <LeafletMap />;
};

export default LeafletMapExample;
