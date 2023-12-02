import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import tableLocationMarker from 'assets/img/icons/map-marker.png';
import React from 'react';

const VehicleTable = () => {
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

  const columns = [
    {
      accessor: 'vehicle_reg_num',
      Header: 'Vehicle Number',
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
      Header: 'School Name',
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
          <div className="btn btn-primary btn-sm">
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
        <Card.Body>
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              size: 'sm',
              striped: true,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
        </Card.Body>
      </AdvanceTableWrapper>
    </div>
  );
};

export default VehicleTable;
