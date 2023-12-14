import React, { useContext, useEffect, useState } from 'react';
// import FalconComponentCard from 'components/common/FalconComponentCard';
import L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import AppContext from 'context/Context';
// import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
// import { markers } from 'data/dashboard/projectManagement';
import { toast } from 'react-toastify';
import 'leaflet-rotatedmarker';

const LeafletMapExample = ({ Location }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
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

    useEffect(() => {
      map.invalidateSize();
    }, [config]);

    useEffect(() => {
      // Update marker position when Location prop changes
      if (Location && Location.latitude && Location.longitude) {
        setMarkerPosition([Location.latitude, Location.longitude]);
      }
    }, [Location]); 

    useEffect(() => {
      if (map) {
        if (marker) {
          src/pages/tracking_page/LeafletMapExample.js
          marker.setLatLng(markerPosition);
        } else {
          // Create new marker when none exists
          const newMarker = L.marker(markerPosition).addTo(map);
          setMarker(newMarker);
        }
      }
    }, [map, marker, markerPosition]);

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

    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    function vehicleStatus(marker) {
      return marker.ignition === '1' && Number(marker.speed) === 0
        ? 'idle'
        : marker.ignition !== '1' && Number(marker.speed) === 0
        ? 'stopped'
        : marker.ignition !== '1' && Number(marker.speed)
        ? 'towing'
        : marker.ignition === '1' && Number(marker.speed)
        ? 'running'
        : Number(marker.speed) > 60
        ? 'rashdriving' 
        : 'nonetwork';
    }

    useEffect(() => {
      if (currentVehicle.vehicle && currentVehicle.school) {
        // console.log(currentVehicle.vehicle, currentVehicle.school);
        let imei = currentVehicle.vehicle.slice(2);
        
        let school = null;

        loggedInUser.user.companies.map(comp => {
          comp?.schools.map(sch => {
            if (sch.id == currentVehicle.school) school = sch.name;
          });
        });

        useEffect(() => {
          return () => {
            console.log(Location);
          };
        }, [Location]);

        let ws = new WebSocket(
          `wss://sbmslive.elenageosys.com/?imei=${imei}&school=${school}`
          // `wss://sbmslive.elenageosys.com/?imei=common_channel&school=${school}`
        );
        ws.onopen = () =>
          toast.success('Connected to vehicle: ' + currentVehicle.vrn);
        ws.onmessage = event => {
          const format = [
            'header',
            'vendor_id',
            'firmware_version',
            'packet_type',
            'alert_id',
            'packet_status',
            'imei',
            'vehicle_reg',
            'gnss_fix',
            'date',
            'time',
            'latitude',
            'latitude_direction',
            'longitude',
            'longitude_direction',
            'speed',
            'course',
            'num_satellites',
            'altitude',
            'pdop',
            'hdop',
            'network_op_name',
            'ignition',
            'main_power_status',
            'main_input_v',
            'internal_batt_V',
            'emergency_status',
            'tamper_alert',
            'gsm_signal_strength',
            'mmc',
            'mnc',
            'lac',
            'cell_id',
            'nmr',
            'digital_input_status',
            'digital_output_status',
            'frame_number',
            'checksum'
          ];
          let msg = event.data.slice(1, event.data.length - 1).split(',');
          
          for (let index = 0; index < 38; index++) {
            // 38 is length of frame {AIS 140}
            marker[format[index]] = msg[index];
          }
          // console.table(marker);
          // console.log(marker.latitude, marker.longitude);

          let myIcon = L.icon({
            iconUrl: '/bus-icons/bus-idle-64.png',
            iconSize: [48, 48],
            rotationAngle: 90,
            iconAnchor: [24, 24]
          });

          function setIconMarker(marker) {
            return L.icon({
              iconUrl: `/bus-icons/bus-${vehicleStatus(marker)}-64.png`,
              iconSize: [48, 40],
              rotationAngle: 90,
              iconAnchor: [24, 20]
            });
          }

          if (myPositionMarker) {
            myPositionMarker.setRotationAngle(marker.course);
            myPositionMarker.setLatLng([marker.latitude, marker.longitude]);
            // myPositionMarker
            //   .bindTooltip(L.tooltip({ permanent: true }).setContent('1'))
            //   .openTooltip(); // TODO: use this for waypoints numbering
            myPositionMarker.setIcon(setIconMarker(marker));
            // let fx = new L.PosAnimation();
            // fx.once('end', function () {
            // });
            // fx.run(
            //   myPositionMarker._icon,
            //   map.latLngToLayerPoint(myPositionMarker.getLatLng()),
            //   2
            // );
            map.setView([marker.latitude, marker.longitude]);
          } else {
            myPositionMarker = L.marker([marker.latitude, marker.longitude], {
              icon: myIcon
            })
              .setRotationAngle(marker.course)
              .setIcon(setIconMarker(marker))
              .addTo(map);
            map.setView([marker.latitude, marker.longitude]);
          }

          myPositionMarker.on('click', function () {
            L.popup({
              closeButton: true
              // closeOnClick: false
            })
              .setLatLng([marker.latitude, marker.longitude])
              .setContent(
                `<Popup>
            <h6 className="mb-1">${currentVehicle.vrn}</h6>
            <h6 className="mb-1">driver_name: ph_number</h6>
            <hr />
            <p className="m-0 text-500">
              Speed: ${marker?.speed}kmph <br />
              Heading: ${marker?.course}deg
            </p>
            <p className="m-0 text-500">
              Last Updated:${' '} <br />
              ${
                marker?.time.slice(0, 2) +
                ':' +
                marker?.time.slice(2, 4) +
                ':' +
                marker?.time.slice(4, 6)
              }${' '}
              on${' '}
              ${
                marker?.date.slice(0, 2) +
                '/' +
                marker?.date.slice(2, 4) +
                '/' +
                marker?.date.slice(4, 8)
              }
            </p>
          </Popup>`
              )
              .openOn(map);
          });
        };
        ws.onerror = e => console.error(e);
        ws.onclose = () =>
          toast.error('Disconnected from vehicle: ' + currentVehicle.vrn);
        return () => ws.close();
      }
    }, [currentVehicle]);

    return (
      <>
        <TileLayer
          attribution={null}
          url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
        />
        {/* <MarkerClusterGroup chunkedLoading={true} spiderfyOnMaxZoom={true}> */}
        {/* {marker && (
          <Marker
            position={[marker?.latitude, marker?.longitude]}

            icon={L.icon({
              iconUrl:
                'data:image/png;base64,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'
            })}
          >
            <Popup>
              <h6 className="mb-1">{currentVehicle.vrn}</h6>
              <h6 className="mb-1">{marker?.imei}</h6>
              <p className="m-0 text-500">
                Recieved:{' '}
                {marker?.time.slice(0, 2) +
                  ':' +
                  marker?.time.slice(2, 4) +
                  ':' +
                  marker?.time.slice(4, 6)}{' '}
                on{' '}
                {marker?.date.slice(0, 2) +
                  '/' +
                  marker?.date.slice(2, 4) +
                  '/' +
                  marker?.date.slice(4, 8)}
              </p>
              <hr />
              <p className="m-0 text-500">
                Co-ordinates: {marker?.latitude}
                {marker?.latitude_direction} - {marker?.longitude}
                {marker?.longitude_direction}
              </p>
              <p className="m-0 text-500">Altitude: {marker?.altitude}m</p>
              <p className="m-0 text-500">
                Speed: {marker?.speed}kmph @ {marker?.course}deg
              </p>
              <hr />
              <p className="m-0 text-500">
                GNSS Lock: {marker?.gnss_fix === '1' ? '3D Fix' : 'No Fix'} with{' '}
                {marker?.num_satellites} sats
              </p>
              <p className="m-0 text-500">
                HDOP: {marker?.hdop} - PDOP: {marker?.pdop}
              </p>
              <hr />
              <p className="m-0 text-500">
                Ignition: {marker?.ignition === '1' ? 'ON' : 'OFF'}
              </p>
              <p className="m-0 text-500">
                Main Power Status:{' '}
                {marker?.main_power_status === '1'
                  ? 'ON with ' + marker?.main_input_v + 'V'
                  : 'OFF'}
              </p>
              <p className="m-0 text-500">
                Internal Battery:{' '}
                {(
                  100 -
                  ((4.2 - Number(marker?.internal_batt_V)) * 100) / 1.4
                ).toFixed(2) +
                  '% with ' +
                  marker?.internal_batt_V +
                  'V'}
              </p>
              <hr />
              <p className="m-0 text-500">
                Emergency Status:{' '}
                {marker?.emergency_status === '1' ? 'ON' : 'OFF'}
              </p>
              <p className="m-0 mb-4 text-500">
                Tamper Alert:{' '}
                {marker?.tamper_alert === 'C'
                  ? 'OFF - Cover CLOSED'
                  : 'ON - Cover OPEN'}
              </p>
            </Popup>
          </Marker>
        )} */}
        {/* </MarkerClusterGroup> */}
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
        <LayerComponent />
      </MapContainer>
    );
  }

  return <LeafletMap />;
};

export default LeafletMapExample;

// `<Popup>
//         <h6 className="mb-1">${currentVehicle.vrn}</h6>
//         <h6 className="mb-1">${marker?.imei}</h6>
//         <p className="m-0 text-500">
//           Recieved:${' '}
//           ${
//             marker?.time.slice(0, 2) +
//             ':' +
//             marker?.time.slice(2, 4) +
//             ':' +
//             marker?.time.slice(4, 6)
//           }${' '}
//           on${' '}
//           ${
//             marker?.date.slice(0, 2) +
//             '/' +
//             marker?.date.slice(2, 4) +
//             '/' +
//             marker?.date.slice(4, 8)
//           }
//         </p>
//         <hr />
//         <p className="m-0 text-500">
//           Co-ordinates: ${marker?.latitude}
//           ${marker?.latitude_direction} - ${marker?.longitude}
//           ${marker?.longitude_direction}
//         </p>
//         <p className="m-0 text-500">Altitude: ${marker?.altitude}m</p>
//         <p className="m-0 text-500">
//           Speed: ${marker?.speed}kmph @ ${marker?.course}deg
//         </p>
//         <hr />
//         <p className="m-0 text-500">
//           GNSS Lock: ${
//             marker?.gnss_fix === '1' ? '3D Fix' : 'No Fix'
//           } with${' '}
//           ${marker?.num_satellites} sats
//         </p>
//         <p className="m-0 text-500">
//           HDOP: ${marker?.hdop} - PDOP: ${marker?.pdop}
//         </p>
//         <hr />
//         <p className="m-0 text-500">
//           Ignition: ${marker?.ignition === '1' ? 'ON' : 'OFF'}
//         </p>
//         <p className="m-0 text-500">
//           Main Power Status:${' '}
//           ${
//             marker?.main_power_status === '1'
//               ? 'ON with ' + marker?.main_input_v + 'V'
//               : 'OFF'
//           }
//         </p>
//         <p className="m-0 text-500">
//           Internal Battery:${' '}
//           ${
//             (
//               100 -
//               ((4.2 - Number(marker?.internal_batt_V)) * 100) / 1.4
//             ).toFixed(2) +
//             '% with ' +
//             marker?.internal_batt_V +
//             'V'
//           }
//         </p>
//         <hr />
//         <p className="m-0 text-500">
//           Emergency Status:${' '}
//           ${marker?.emergency_status === '1' ? 'ON' : 'OFF'}
//         </p>
//         <p className="m-0 mb-4 text-500">
//           Tamper Alert:${' '}
//           ${
//             marker?.tamper_alert === 'C'
//               ? 'OFF - Cover CLOSED'
//               : 'ON - Cover OPEN'
//           }
//         </p>
//       </Popup>`;
