import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Flex from 'components/common/Flex';
import SessionByBrowserChart from './SessionByBrowserChart';
import TableRow from './TableRow';
import { useEffect } from 'react';
import { useFilterContext } from 'context/FilterContext';


const SessionByBrowser = () => {
  const [chartData, setChartData] = useState([]);
  const { selectedFilter } = useFilterContext();
  
  useEffect(() => {
    // fetch('https://sbmsadmin.elenageosys.com/vehicle-management/doughnutchart/', {
    //   headers: {
    //     Authorization: 'token 49deb7cf59acb1ffe4b675584a1617ba9afeca68'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(resp => {
    //     setChartData(resp);
    //     console.log(resp);
    //   })
    //   .catch(err => console.error(err));

    let dashboardData = JSON.parse(sessionStorage.getItem('dashboardData'));
    console.log(selectedFilter)
    let filteredData = dashboardData;
    let totalBusPerCompany = 0;
    let temp = [];
    filteredData.forEach(company => {
        
    
      company.schools.forEach(school => {
        totalBusPerCompany += school.vehicles.length;
      });
      
      temp.push({
        name: company.vehicleCompany_name,
        value: totalBusPerCompany
      });
    });

    if (dashboardData) {
      
    
      
      if (selectedFilter.company) {
        filteredData = filteredData.filter(
          company => company.vehicleCompany_name === selectedFilter.company

        );
      }
    
      
      if (selectedFilter.school) {
        filteredData = filteredData.map(company => ({
          ...company,
          schools: company.schools.filter(
            school => school.school_name === selectedFilter.school
          )
        }));
      }
    
      
      if (selectedFilter.vehicle) {
        filteredData = filteredData.map(company => ({
          ...company,
          schools: company.schools.map(school => ({
            ...school,
            vehicles: school.vehicles.filter(
              vehicle => vehicle.id === selectedFilter.vehicle
            )
          }))
        }));
      }
    
      let temp = [];
      filteredData.forEach(company => {
        company.schools.forEach(school => {
          totalBusPerCompany += school.vehicles.length;
        });
        temp.push({
          name: company.vehicleCompany_name,
          value: totalBusPerCompany
        });
      });
    
      setChartData(temp);
      totalBusPerCompany = 0;
    }
  }, [selectedFilter]);

  return (
    <Card className="h-100">
      <FalconCardHeader
        title="Bus Count Overview"
        titleTag="h5"
        className="py-2 text-center"
        light
      />
      <Card.Body
        as={Flex}
        direction="column"
        justifyContent="between"
        className="py-0 "
      >
        <div className="my-auto py-5 py-md-5">
          <SessionByBrowserChart chartdata={chartData} />
        </div>
        <div className="border-top scrollbar bus-count-overview">
          <Table size="sm" className="mb-0 text-center ">
            <tbody>
              {chartData.map((data, i) => (
                <TableRow key={i} data={data} />
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>

      <Card.Footer className="bg-light py-2"></Card.Footer>
    </Card>
  );
};

// SessionByBrowser.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape(TableRow.propTypes.data)).isRequired
// };

export default SessionByBrowser;
