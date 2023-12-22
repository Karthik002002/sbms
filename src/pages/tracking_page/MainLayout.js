import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';
import NavbarVertical from 'components/navbar/vertical_tracking/NavbarVertical';
// import ProductProvider from 'components/app/e-commerce/ProductProvider';
// import CourseProvider from 'components/app/e-learning/CourseProvider';
import LeafletMapExample from '../tracking_page/Leaflet/LeafletMapOut';
import VehicleTable from './VehicleTable';

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  const [vehicleID, setVehicleID] = useState();
  const [currentVehicle, setCurrentVehicle] = useState('');
  const [liveData, setliveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://192.168.0.30:8000/updated_status/'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        setliveData(result);
        console.log(result);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  const data = JSON.parse(window.sessionStorage.getItem('trackingData'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleTrackClick = imei => {
    setCurrentVehicle(imei);
  };

  return (
    <div className={'container-fluid '}>
      <NavbarVertical />
      {/* <ProductProvider> */}
      {/* <CourseProvider> */}
      <Row className="my-2 mb-0">
        <Col sm={2} md={3} className="">
          <Card className="mb-3 tracking-page-table">
            <VehicleTable data={liveData} onTrackClick={handleTrackClick} />
          </Card>
        </Col>
        <Col sm={10} md={9} className="">
          <div className={classNames('content', { 'pb-0': isKanban })}>
            <div className="tracking-page-map-container">
              <LeafletMapExample imei={869523058096042} />
            </div>
          </div>
        </Col>
      </Row>
      {/* </CourseProvider> */}
      {/* </ProductProvider> */}
    </div>
  );
};

export default MainLayout;
