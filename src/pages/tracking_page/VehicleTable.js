import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import tableLocationMarker from 'assets/img/icons/map-marker.png';
import React from 'react';

const VehicleTable = ({ onTrackClick }) => {
  const responseData = JSON.parse(sessionStorage.getItem('dashboardData'));

  const tableData = responseData.reduce((acc, curr) => {
    curr.schools.forEach(school => {
      school.vehicles.forEach(vehicle => {
        acc.push({
          vehicle_reg_num: vehicle.vehicle_reg,
          school_name: school.school_name,
          latitude: vehicle.latitude,
          longitude: vehicle.longitude
        });
      });
    });
    return acc;
  }, []);

  const handleTrackClick = (latitude, longitude) => {
    onTrackClick(latitude, longitude);
  };

  const columns = [
    {
      accessor: 'vehicle_reg_num',
      Header: 'Vehicle',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
      Cell: rowData => {
        return (
          <div className="flex-1">
            <h5 className="mb-0 fs--1">{rowData.value}</h5>
          </div>
        );
      }
    },
    {
      accessor: 'school_name', // Add a new column for school name
      Header: 'School ',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
      Cell: rowData => {
        return (
          <div className="flex-1">
            <h5 className="mb-0 fs--1">{rowData.value}</h5>
          </div>
        );
      }
    },
    {
      Header: 'Track',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
      Cell: rowData => {
        const { latitude, longitude } = rowData.row.original;
        return (
          <div
            className="btn btn-primary border-0 btn-sm bg-light"
            onClick={() => handleTrackClick(latitude, longitude)}
          >
            <img
              src={tableLocationMarker}
              alt="marker"
              height={15}
              width={15}
            />
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <AdvanceTableWrapper columns={columns} data={tableData}>
        <Card.Header>
          <Row className="flex-center">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
              <h6 className="fs-0 mb-0 text-nowrap py-2 py-xl-0 ms-2 text-center p-2">
                Vehicle List
              </h6>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle text-* text-wrap white-space-wrap"
            tableProps={{
              size: 'sm',
              striped: true,
              className: 'fs--1 mb-0 overflow-auto'
            }}
          />
        </Card.Body>
      </AdvanceTableWrapper>
    </div>
  );
};

export default VehicleTable;
