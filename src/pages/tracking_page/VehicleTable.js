import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React from 'react';

const VehicleTable = () => {
    const tableData = JSON.parse(sessionStorage.getItem('dashboardData'))
    return (
        <div>
            <AdvanceTableWrapper
            columns={columns}
            data={tableData}
            >

            </AdvanceTableWrapper>
        </div>
    );
}

export default VehicleTable;
