import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import {
  Card,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import tableLocationMarker from 'assets/img/icons/map-marker.png';
import { getColor } from 'helpers/utils';
import React, { useEffect, useState } from 'react';
import historyLogo from '../../assets/img/icons/history-logo.png';
import { useFilterContext } from 'context/FilterContext';
const VehicleTable = ({ onTrackClick , data}) => {
  // const responseData = JSON.parse(sessionStorage.getItem('dashboardData'));
  
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {setSelectedFilter} = useFilterContext()
  const transformData = (data) => {
    return data.map((item) => ({
      vehicle_reg_num: item.reg_no,
      latitude: item.lat,
      longitude: item.lon,      
      degree : item.heading,
      imei: item.imei
    }));
  };
  const [selectedStatus, setSelectedStatus] = useState("")  
  const selectedData = {status : selectedStatus}

  const handleStatusChange = status =>{
    setSelectedStatus(status)
    setSelectedFilter(selectedStatus)
  }
  useEffect(()=>{
    const FirstData = transformData(data)
    if(data !== null){
      setIsLoading(false)
    }
    setTableData(FirstData)
  },[data])

  // const tableData = responseData.reduce((acc, curr) => {
  //   curr.schools.forEach(school => {
  //     school.vehicles.forEach(vehicle => {
  //       acc.push({
  //         vehicle_reg_num: vehicle.vehicle_reg,
  //         school_name: school.school_name,
  //         school_code: school.school_code,
  //         latitude: vehicle.latitude,
  //         longitude: vehicle.longitude
  //       });
  //     });
  //   });
  //   return acc;
  // }, []);

  

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
            <td className="mb-0 fs--2">{rowData.value}</td>
          </div>
        );
      }
    },
    // {
    //   accessor: 'school_code', // Add a new column for school name
    //   Header: 'School',
    //   headerProps: { className: 'pe-1' },
    //   cellProps: {
    //     className: 'p-0'
    //   },
    //   Cell: rowData => {
    //     return (
    //       <div className="flex-1 text-center justify-center ">
    //         <td className="mb-0 p-0  fs--2">{rowData.value}</td>
    //       </div>
    //     );
    //   }
    // },
    {
      Header: 'Track',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'p-0'
      },
      Cell: rowData => {
        const { imei} = rowData.row.original;
        return (
          <div className="d-flex justify-content-center  border-0 btn-sm bg-white track-btn-button pt-1 p-0">
            <div className="d-flex">
            <OverlayTrigger
                key="left"
                placement="top"
                overlay={
                  <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                    Track
                  </Tooltip>
                }
              >
              <Button
                type="button"
                onClick={() => onTrackClick(imei)}
                className="bg-white border-0  h-auto"
              >
                <img
                  src={tableLocationMarker}
                  alt="marker"
                  height={15}
                  width={15}
                />
              </Button>
              </OverlayTrigger>
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

            <Col>
            <div className="d-flex justify-content-center " >
              <select className="border-0 rounded text-wrap h-50" onChange={e =>handleStatusChange(e.target.value)}>
                <option value="" key="" className="fs--1">Select status</option>
                <option value="Running" key="running" className="text-center">Running</option>
                <option value="Idle" key="Idle" className="text-center">Idle</option>
                <option value="Stopped" key="Stopped"  className="text-center">Stopped</option>
                <option value="Towing" key="Towing" className="text-center">Towing</option>
                <option value="Parked" key="Parked" className="text-center">Parked</option>
                <option value="NoNetwork" key="No network" className="text-center">NoNetwork</option>
                <option value="InActive" key="InActive" className="text-center">InActive</option>
              </select>
            </div>

            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {isLoading ? <div>Loading the data</div>:<AdvanceTable
            table
            headerClassName="bg-200 text-900 text-wrap align-middle text-center "
            rowClassName="align-middle justify-content-center text-*  text-wrap white-space-wrap"
            tableProps={{
              size: 'sm',
              striped: true,
              className: ' mb-0 overflow-auto'
            }}
          />}
        </Card.Body>
      </AdvanceTableWrapper>
    </div>
  );
};

export default VehicleTable;
