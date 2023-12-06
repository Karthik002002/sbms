import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Card, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import tableLocationMarker from 'assets/img/icons/map-marker.png';
import React from 'react';
import historyLogo from '../../assets/img/icons/history-logo.png';

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
      headerProps: { className: '' },
      cellProps: {
        className: 'p-0'
      },
      Cell: rowData => {
        return (
          <div className="flex-1">
            <td className="mb-0">{rowData.value}</td>
          </div>
        );
      }
    },
    {
      accessor: 'school_name', // Add a new column for school name
      Header: 'School ',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'p-0'
      },
      Cell: rowData => {
        return (
          <div className="flex-1">
            <td className="mb-0 ">{rowData.value}</td>
          </div>
        );
      }
    },
    {
      Header: 'Track',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'p-0'
      },
      Cell: rowData => {
        const { latitude, longitude } = rowData.row.original;
        return (
          <div className="d-flex justify-content-center  border-0 btn-sm bg-white track-btn-button pt-1 p-0">
            <div className="d-flex">
              <Button
                type="button"
                onClick={() => handleTrackClick(latitude, longitude)}
                className="bg-white border-0 m-1 h-auto"
              >
                <img
                  src={tableLocationMarker}
                  alt="marker"
                  height={15}
                  width={15}
                />
              </Button>
            </div>
            <div className="d-flex">
            <OverlayTrigger
            key="left"
            placement='top'
            overlay={
              <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                History
              </Tooltip>
            }
          >
              <Button
                type="button"
                className="p-auto bg-white border-0 m-1  h-auto"
              >
                <img src={historyLogo} alt="Logo" height={15} width={15} />
              </Button>
              </OverlayTrigger>
            </div>
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
            <Col
              xs={4}
              sm="auto"
              className="d-flex align-items-center justify-content-center pe-0"
            >
              <h6 className="fs-0 mb-0 text-nowrap py-2 py-xl-0 m-auto text-center p-2">
                Vehicle List
              </h6>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-wrap align-middle text-center"
            rowClassName="align-middle justify-content-center text-* text-wrap white-space-wrap"
            tableProps={{
              size: 'sm',
              striped: true,
              className: ' mb-0 overflow-auto'
            }}
          />
        </Card.Body>
      </AdvanceTableWrapper>
    </div>
  );
};

export default VehicleTable;
