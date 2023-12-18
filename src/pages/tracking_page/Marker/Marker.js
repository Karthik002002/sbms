import React from 'react';
import { useEffect, useState } from 'react';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';
import BusIcon from '../Icons/bus-idle-64.png';
import L from 'leaflet';
import { Popup } from 'react-leaflet';

const MapMarker = ({ position }) => {
  if (!position) {
    return null;
  }
  const { lat, lng } = position;
  const [prevPos, setPrevPos] = useState([lat, lng]);
  const customIcon = L.icon({
    iconUrl: BusIcon,
    iconSize: [45, 40]
  });
  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);

    console.log(lat, lng);
  }, [lat, lng, prevPos]);
  return (
    <LeafletTrackingMarker
      icon={customIcon}
      position={[lat, lng]}
      previousPosition={prevPos}
      duration={1000}
    >
      <Popup>
        <p>HEllo</p>
      </Popup>
    </LeafletTrackingMarker>
  );
};

export default MapMarker;
