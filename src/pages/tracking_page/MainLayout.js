import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';
import NavbarVertical from 'components/navbar/vertical_tracking/NavbarVertical';
// import ProductProvider from 'components/app/e-commerce/ProductProvider';
// import CourseProvider from 'components/app/e-learning/CourseProvider';
import LeafletMapExample from './LeafletMapExampleOne';
import VehicleTable from './VehicleTable';

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [ datas, setDatas] = useState([])
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.30:8000/updated_status/'); 
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        setDatas(result); 
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    setInterval(() => {
      fetchData()
    }, 5 * 1000);
    
  },[])
  
  useEffect(()=>{
    console.log(datas)
  },[datas])

  // useEffect(()=>{
  //   console.log(currentLocation)
  // }),[currentLocation]
  // const isChat = pathname.includes('chat');


  const data = JSON.parse(window.sessionStorage.getItem('trackingData'));
  
  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleTrackClick = (latitude, longitude) => {
    setCurrentLocation({ latitude, longitude });
  };

  return (
    <div className={'container-fluid '}>
      <NavbarVertical />
      {/* <ProductProvider> */}
      {/* <CourseProvider> */}
      <Row className="my-3">
        <Col sm={2}md={3} className="">
          <Card className="mb-3">
            <VehicleTable data={datas} onTrackClick={handleTrackClick} />
          </Card>
        </Col>
        <Col sm={10} md={9} className="">
          <div className={classNames('content', { 'pb-0': isKanban })}>
            <div className="">
              <LeafletMapExample Location={currentLocation} />
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
