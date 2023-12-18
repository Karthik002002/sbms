import React, { useContext, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import AppContext from 'context/Context';


import 'leaflet-rotatedmarker';

const LeafletMapExample = ({ imei }) => {
  let [iconLocation, setIconLocation] = useState([13, 77])
  const customIcon = L.icon({
    iconUrl: require('./Icons/bus-idle-64.png'),
    iconSize: [45, 40]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
      console.log(imei)
            const response = await fetch(`http://192.168.0.30:8000/search/${imei}/`); 
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
    
    
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchData()
    setInterval(() => {
      fetchData()
      console.log(iconLocation)
    }, 10 * 1000);

    
  }, [])
  

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
    //   map.invalidateSize();
    // }, [config]);

    useEffect(() => {
      // Update marker position when Location prop changes
      if (Location && Location.latitude && Location.longitude) {
        setMarkerPosition([Location.latitude, Location.longitude]);
      }
    }, []); 


    useEffect(() => {
      if (map) {
        L.tileLayer
          .colorFilter(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            {
              attribution: null,
              transparent: true,
              filter: filter
            }
          )
          .addTo(map);
      }
    }, [isDark]);

    return (
      <>
        <TileLayer
          attribution={null}
          url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
        /> 
        </>
    );
  }

  function LeafletMap() {
    return (
      <MapContainer
        zoom={14}
        // minZoom={isRTL ? 1.8 : 1.1}
        zoomSnap={0.25}
        center={[12.972442, 77.580643]}
        // center={position}
        radius={200}
        style={{ height: '85vh', width: '100%' }}
      >
        <Marker
          icon={customIcon}
          position={{
            lat: iconLocation[0],
            lng: iconLocation[1]
          }}
        ></Marker>
        <LayerComponent />
      </MapContainer>
    );
  }

  return <LeafletMap />;
};

export default LeafletMapExample;

