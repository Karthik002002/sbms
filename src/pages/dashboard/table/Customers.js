import React, { useEffect, useState } from 'react';
// import { Card, Dropdown } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
// import { customersData } from 'data/ecommerce/customersData';
// import CardDropdown from 'components/common/CardDropdown';
import { Link } from 'react-router-dom';
// import Flex from 'components/common/Flex';
// import Avatar from 'components/common/Avatar';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import CustomersTableHeader from './CustomersTableHeader';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import { useFilterContext } from 'context/FilterContext';


const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const {selectedFilter} = useFilterContext()
  //using the data from the local storage
 
  useEffect(() => {
    const data = window.sessionStorage.getItem('dashboardData');
  
    const processDashboardData = (data) => {
      const parsedData = JSON.parse(data);
      setCustomers(parsedData);
  
      if (!selectedFilter || selectedFilter.company === null) {
        
        const newData = parsedData.reduce((acc, company) => {
          company.schools.forEach(school => {
            school.vehicles.forEach(vehicle => {
              acc.push({
                vehicle_reg: vehicle.vehicle_reg,
                school_name: school.school_name,
                driver: vehicle.driver,
                phone: vehicle.phone,
              });
            });
          });
          return acc;
        }, []);
        setTableData(newData);
      } else if (selectedFilter && selectedFilter.company !== null && selectedFilter.school === null) {
        
        const filteredData = parsedData.filter(company => company.vehicleCompany_name === selectedFilter.company);
        const newData = filteredData.reduce((acc, company) => {
          company.schools.forEach(school => {
            school.vehicles.forEach(vehicle => {
              acc.push({
                vehicle_reg: vehicle.vehicle_reg,
                school_name: school.school_name,
                driver: vehicle.driver,
                phone: vehicle.phone,
              });
            });
          });
          return acc;
        }, []);
        setTableData(newData);
      } else if (selectedFilter && selectedFilter.company !== null && selectedFilter.school !== null) {
        const filteredData = parsedData.filter(company => company.vehicleCompany_name === selectedFilter.company);
        const newData = filteredData.reduce((acc, company) => {
          company.schools.forEach(school => {
            if (school.school_name === selectedFilter.school) {
              school.vehicles.forEach(vehicle => {
                acc.push({
                  vehicle_reg: vehicle.vehicle_reg,
                  school_name: school.school_name,
                  driver: vehicle.driver,
                  phone: vehicle.phone,
                });
              });
            }
          });
          return acc;
        }, []);
        setTableData(newData);
      }
    };
  
    if (data) {
      processDashboardData(data);
    }
  }, [selectedFilter]);
  
  
  
 
  


  // // modify this code in need to access from the api 
  // useEffect(() => {
  //   fetch('https://sbmsadmin.elenageosys.com/vehicle-management/table/', {
  //     headers: {
  //       Authorization: 'token 49deb7cf59acb1ffe4b675584a1617ba9afeca68'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => setCustomers(data))
  //     .catch(err => console.error(err));
  // }, []);

  const columns = [
    {
      accessor: 'vehicle_reg',
      Header: 'Vehicle Number',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
      Cell: rowData => {
        const { vehicle_reg } = rowData.row.original;
        return (
          <Link to="/e-commerce/customer-details">
            <div className="flex-1">
              <h5 className="mb-0 fs--1">{vehicle_reg}</h5>
            </div>
          </Link>
        );
      }
    },
    // {
    //   accessor: 'id',
    //   Header: 'Device ID',
    //   Cell: rowData => {
    //     const { device } = rowData.row.original;
    //     return (
    //       <Link to="/e-commerce/customer-details">
    //         <div className="flex-1">
    //           <h5 className="mb-0 fs--1">{device}</h5>
    //         </div>
    //       </Link>
    //     );
    //   }
    // },
    // {
    //   accessor: 'owner',
    //   Header: 'Vehicle Owner',
    //   Cell: rowData => {
    //     const { school_name } = rowData.row.original;
    //     return (
    //       <Link to="/e-commerce/customer-details">
    //         <div className="flex-1">
    //           <h5 className="mb-0 fs--1">{school_name}</h5>
    //         </div>
    //       </Link>
    //     );
    //   }
    // },
    {
      accessor: 'school_name',
      Header: 'School Name',
      Cell: rowData => {
        const { school_name } = rowData.row.original;
        return (
          <Link to="/e-commerce/customer-details">
            <div className="flex-1">
              <h5 className="mb-0 fs--1">{school_name}</h5>
            </div>
          </Link>
        );
      }
    },
    {
      accessor: 'driver',
      Header: 'Driver Name',
      Cell: rowData => {
        const { driver } = rowData.row.original;
        return (
          <Link to="/e-commerce/customer-details">
            <div className="flex-1">
              <h5 className="mb-0 fs--1">{driver}</h5>
            </div>
          </Link>
        );
      }
    },
    {
      accessor: 'phone',
      Header: 'Phone',
      Cell: rowData => {
        const { phone } = rowData.row.original;
        return <a href={`tel:${phone}`}>{phone}</a>;
      }
    }
    // {
    //   accessor: 'name',
    //   Header: 'School',
    //   headerProps: { style: { minWidth: '200px' }, className: 'ps-5' },
    //   cellProps: { className: 'ps-5' }
    // }
    // {
    //   accessor: 'joined',
    //   Header: 'Joined'
    // },
    // {
    //   accessor: 'none',
    //   Header: '',
    //   disableSortBy: true,
    //   cellProps: {
    //     className: 'text-end'
    //   },
    //   Cell: () => {
    //     return (
    //       <CardDropdown>
    //         <div className="py-2">
    //           <Dropdown.Item href="#!">Edit</Dropdown.Item>
    //           <Dropdown.Item href="#!">Delete</Dropdown.Item>
    //         </div>
    //       </CardDropdown>
    //     );
    //   }
    // }
  ];

  return (
    <AdvanceTableWrapper
      columns={columns}
      data={tableData}
      selection
      sortable
      pagination
      perPage={50}
    >
      <Card className="mb-3">
        <Card.Header>
          <CustomersTableHeader table />
        </Card.Header>
        <Card.Body className="p-0">
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
        <Card.Footer>
          <AdvanceTablePagination table />
        </Card.Footer>
      </Card>
    </AdvanceTableWrapper>
  );
};

export default Customers;
