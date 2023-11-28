import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';

const SaasRevenue = () => {
  const [totalvehicles, setTotalvehicles] = useState(0);
  useEffect(() => {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    fetch(
      'https://sbmsadmin.elenageosys.com/vehicle-management/vehicles/count/',
      {
        headers: {
          Authorization: 'token ' + loggedInUser.token
        }
      }
    )
      .then(res => res.json())
      .then(data => setTotalvehicles(data))
      .catch(err => console.log(err));
  }, []);

  
  return (
    <Card className="h-100">
      <Card.Body>
        <Row className="flex-between-center">
          <Col className="d-md-flex d-lg-block flex-between-center">
            <h6 className="mb-md-0 mb-lg-2">Total Vehicles</h6>
            <SoftBadge bg="success" pill>
              <FontAwesomeIcon icon="caret-up" /> {totalvehicles.l_m}
            </SoftBadge>
          </Col>
          <Col xs="auto">
            <h4 className="fs-3 fw-normal text-700">
              <CountUp
                start={0}
                end={totalvehicles.count}
                duration={2.75}
                // suffix={'M'}
                // prefix={'$'}
                // decimals={2}
                // decimal="."
              />
            </h4>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SaasRevenue;
