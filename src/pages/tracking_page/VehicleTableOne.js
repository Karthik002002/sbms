import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import {
  Card,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import tableLocationMarker from 'assets/img/icons/map-marker.png';
import React, { useEffect, useState } from 'react';
import historyLogo from '../../assets/img/icons/history-logo.png';
import { useFilterContext } from 'context/FilterContext';

const VehicleTable = ({ onTrackClick, data }) => {
  const { selectedFilter } = useFilterContext();
  const [trackingTableData, setTrackingTableData] = useState(data);
  const [customers, setCustomers] = useState([]);
  const [updatedTableData, setUpdatedTableData] = useState([]);

  useEffect(() => {
    console.log(data);
    if (
      Array.isArray(trackingTableData) &&
      selectedFilter &&
      selectedFilter.company === null
    ) {
      const newData = trackingTableData.reduce((acc, company) => {
        company.schools.forEach(school => {
          school.vehicles.forEach(vehicle => {
            acc.push({
              vehicle_reg: vehicle.vehicle_reg,
              school_code: school.school_code,
              latitude: vehicle.latitude,
              longitude: vehicle.longitude
            });
          });
        });
        return acc;
      }, []);
      if (newData.length > 0) {
        setUpdatedTableData(newData);
      }
    }
  }, [updatedTableData, selectedFilter, data]);

  // useEffect(() => {
  //   const data = window.sessionStorage.getItem('dashboardData');

  //   const processDashboardData = data => {
  //     const parsedData = JSON.parse(data);
  //     setCustomers(parsedData);

  //     if (selectedFilter && selectedFilter.company === null) {
  //       const newData = parsedData.reduce((acc, company) => {
  //         company.schools.forEach(school => {
  //           school.vehicles.forEach(vehicle => {
  //             acc.push({
  //               vehicle_reg: vehicle.vehicle_reg,
  //               school_code: school.school_code,
  //               latitude: vehicle.latitude,
  //               longitude: vehicle.longitude
  //             });
  //           });
  //         });
  //         return acc;
  //       }, []);
  //       setUpdatedTableData(newData);
  //       setTrackingTableData(newData);
  //     }
  //   };

  //   if (data !== null) {
  //     processDashboardData(data);
  //   }

  //   if (trackingTableData !== null){
  //     setUpdatedTableData(trackingTableData)
  //   }
  // }, [selectedFilter]);

  // else if (
  //   selectedFilter &&
  //   selectedFilter.company !== null &&
  //   selectedFilter.school === null
  // ) {
  //   const filteredData = parsedData.filter(
  //     company => company.vehicleCompany_name === selectedFilter.company
  //   );
  //   const newData = filteredData.reduce((acc, company) => {
  //     company.schools.forEach(school => {
  //       school.vehicles.forEach(vehicle => {
  //         acc.push({
  //           vehicle_reg: vehicle.vehicle_reg,
  //           school_code: school.school_code,
  //           latitude: vehicle.latitude,
  //           longitude: vehicle.longitude
  //         });
  //       });
  //     });
  //     return acc;
  //   }, []);
  //   setTrackingTableData(newData);
  // } else if (
  //   selectedFilter &&
  //   selectedFilter.company !== null &&
  //   selectedFilter.school !== null
  // ) {
  //   const filteredData = parsedData.filter(
  //     company => company.vehicleCompany_name === selectedFilter.company
  //   );
  //   const newData = filteredData.reduce((acc, company) => {
  //     company.schools.forEach(school => {
  //       if (school.school_name === selectedFilter.school) {
  //         school.vehicles.forEach(vehicle => {
  //           acc.push({
  //             vehicle_reg: vehicle.vehicle_reg,
  //             school_code: school.school_code,
  //             latitude: vehicle.latitude,
  //             longitude: vehicle.longitude
  //           });
  //         });
  //       }
  //     });
  //     return acc;
  //   }, []);
  //   console.log(newData)
  //   setTrackingTableData(newData);
  // }

  // useEffect(() => {
  //   const responseData = JSON.parse(sessionStorage.getItem('dashboardData'));
  //   setTableData(responseData)
  // }, []);

  // rendering with the condition changes dynmaically

  // useEffect(() => {
  //   const data = window.sessionStorage.getItem('dashboardData');

  //   const processDashboardData = (data) => {
  //     const parsedData = JSON.parse(data);

  //     if (!selectedFilter || selectedFilter.company === null) {
  //       const newData = parsedData.flatMap(company =>
  //         company.schools.flatMap(school =>
  //           school.vehicles.map(vehicle => ({
  //             vehicle_reg: vehicle.vehicle_reg,
  //             school_name: school.school_name,
  //             driver: vehicle.driver,
  //             phone: vehicle.phone,
  //           }))
  //         )
  //       );
  //       setTableData(newData);
  //     } else {
  //       const filteredData = parsedData.filter(company => company.vehicleCompany_name === selectedFilter.company);

  //       if (selectedFilter.school === null) {
  //         const newData = filteredData.flatMap(company =>
  //           company.schools.flatMap(school =>
  //             school.vehicles.map(vehicle => ({
  //               vehicle_reg: vehicle.vehicle_reg,
  //               school_name: school.school_name,
  //               driver: vehicle.driver,
  //               phone: vehicle.phone,
  //             }))
  //           )
  //         );
  //         setTableData(newData);
  //       } else {
  //         const newData = filteredData.flatMap(company =>
  //           company.schools
  //             .filter(school => school.school_name === selectedFilter.school)
  //             .flatMap(school =>
  //               school.vehicles.map(vehicle => ({
  //                 vehicle_reg: vehicle.vehicle_reg,
  //                 school_name: school.school_name,
  //                 driver: vehicle.driver,
  //                 phone: vehicle.phone,
  //               }))
  //             )
  //         );
  //         setTableData(newData);
  //       }
  //     }
  //   };

  //   if (data) {
  //     processDashboardData(data);
  //   }
  // }, [selectedFilter]);

  console.log(updatedTableData);
  const handleTrackClick = (latitude, longitude) => {
    onTrackClick(latitude, longitude);
  };

  const columns = [
    {
      accessor: 'vehicle_reg',
      Header: 'Vehicle',
      headerProps: { className: '' },
      cellProps: {
        className: 'p-0'
      },
      Cell: rowData => {
        return (
          <div className="flex-1">
            <td className="mb-0 fs--2">{rowData.value}</td>
          </div>
        );
      }
    },
    {
      accessor: 'school_code',
      Header: 'School',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'p-0'
      },
      Cell: rowData => {
        return (
          <div className="flex-1 text-center justify-center ">
            <td className="mb-0 p-0  fs--2">{rowData.value}</td>
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
                className="bg-white border-0  h-auto"
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
                placement="top"
                overlay={
                  <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                    History
                  </Tooltip>
                }
              >
                <Button type="button" className=" bg-white border-0   h-auto">
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
      <AdvanceTableWrapper columns={columns} data={updatedTableData}>
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
            headerClassName="bg-200 text-900 text-wrap align-middle text-center "
            rowClassName="align-middle justify-content-center text-*  text-wrap white-space-wrap"
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
