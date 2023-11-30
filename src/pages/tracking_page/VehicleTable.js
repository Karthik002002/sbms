import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React from 'react';

const VehicleTable = () => {
  const tableData = JSON.parse(sessionStorage.getItem('dashboardData'));
  const columns = [
    {
      accessor: 'name',
      Header: 'Vehicle Number',
      headerProps: { className: 'pe-1' },
      cellProps: {
        className: 'py-2'
      },
      Cell: rowData => {
        const { vehicle_reg_num } = rowData.row.original;
        return (
          <Link to="/e-commerce/customer-details">
            <div className="flex-1">
              <h5 className="mb-0 fs--1">{vehicle_reg_num}</h5>
            </div>
          </Link>
        );
      }
    }
  ];
  return (
    <div>
      <AdvanceTableWrapper
        columns={columns}
        data={tableData}
      ></AdvanceTableWrapper>
    </div>
  );
};

export default VehicleTable;
