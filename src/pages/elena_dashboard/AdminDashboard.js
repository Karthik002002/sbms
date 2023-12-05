import { React, lazy, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

// import { realTimeUsers, sessionByBrowser } from './analytics';
// import { lmsStatistics, Stats } from './lms';
// import { activeUser } from './saas';
import * as _default from './default';
import axios from 'axios';

const RealTimeUsers = lazy(() => import('./RealTimeUsers'));
const SessionByBrowser = lazy(() => import('./SessionByBrowser'));

const CrmStats = lazy(() => import('./CrmStats'));
const DealStorageFunnel = lazy(() => import('./DealStorageFunnel'));
const LmsStats = lazy(() => import('./LmsStats'));
const SaasActiveUser = lazy(() => import('./SaasActiveUser'));
const SaasConversion = lazy(() => import('./SaasConversion'));
const SaasRevenue = lazy(() => import('./SaasRevenue'));

const TotalSales = lazy(() => import('./TotalSales'));
const DoughnutRoundedChart = lazy(() => import('./DoughnutRoundedChart'));
const GradientBarChart = lazy(() => import('./GradientBarChart'));
const StackedHorizontalChart = lazy(() => import('./StackedHorizontalChart'));
const CandlestickMixedChart = lazy(() => import('./CandlestickMixedChart'));
const RaceChart = lazy(() => import('./RaceChart'));

const Customers = lazy(() => import('pages/dashboard/table/Customers'));
const UsersByCountry = lazy(() => import('./UsersByCountry'));
import { countryData } from 'data/countryData';

import { sessionByCountry } from 'data/dashboard/analytics';

const AdminDashboard = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await axios.get(
          'http://sbmsadmin.elenageosys.com:8081/report-management/userbased/?username=superuser'
        );
        window.sessionStorage.setItem(
          'dashboardData',
          JSON.stringify(dashboardData.data)
        );
        console.log(dashboardData.data);
      } catch (err) {
        console.log('Dashboard data error', err.message);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="container mt-5 ">
      <Row className="my-3">
        <Col md={6} className="mb-5">
          <RealTimeUsers />
        </Col>
        <Col md={6} className="mb-5">
          <SessionByBrowser />
        </Col>
      </Row>

      {/* <Row className="g-3 my-3">
        <CrmStats />
      </Row> */}

      {/* <Row className="g-3 my-3">
        <DealStorageFunnel />
      </Row> */}

      <Row className="mb-5">
       
          <DoughnutRoundedChart />
        {/* <Col md={6} className="mb-5">
          <GradientBarChart />
        </Col>
        <Col md={6} className="mb-5">
          <CandlestickMixedChart />
        </Col>
        <Col md={6} className="mb-5">
          <RaceChart />
        </Col> */}
      </Row>
      <Row className="mb-5">
        <StackedHorizontalChart />
      </Row>
      <Row className="mb-5">
        <TotalSales data={_default.totalSales} />
      </Row>
      {/* <Row className="g-3 mb-5">
        <UsersByCountry chartData={sessionByCountry} mapData={countryData} />
      </Row> */}
      {/* <Row className="g-3 mb-5">
        <LmsStats />
      </Row> */}

      {/* <Row className="g-3 mb-5">
        <Col md={4}>
          <SaasActiveUser />
        </Col>
        <Col md={4}>
          <SaasRevenue />
        </Col>
        <Col md={4}>
          <SaasConversion />
        </Col>
      </Row> */}

      <Row className="g-3 my-3">
        <Customers />
      </Row>
    </div>
  );
};

export default AdminDashboard;
