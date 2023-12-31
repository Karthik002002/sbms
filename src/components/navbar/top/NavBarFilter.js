import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import IconButton from 'components/common/IconButton';
import { useFilterContext } from 'context/FilterContext';

const NavBarFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const data = JSON.parse(sessionStorage.getItem('dashboardData'));

  const { setSelectedFilter } = useFilterContext();

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {

    const filterData = {
      company: selectedCompany || null,
      school: selectedSchool || null,
      vehicle: selectedVehicle || null,
    };

    setSelectedFilter(filterData);

    setShowModal(false);
    setSelectedCompany(null);
    setSelectedSchool(null);
    setSelectedVehicle(null); 
  };
  const handleCompanyChange = companyName => {
    setSelectedCompany(companyName);
    // setSelectedSchool(null);
    setSelectedVehicle(null);
  };

  const handleSchoolChange = schoolName => {
    setSelectedSchool(schoolName);
    setSelectedVehicle(null);
  };

  const handleVehicleChange = vehicleId => {
    setSelectedVehicle(vehicleId);
  };

  return (
    <>
      <IconButton
        variant="falcon-default"
        size="sm"
        icon="filter"
        transform="shrink-3"
        className="mx-2"
        onClick={handleShowModal}
      >
        <span className="d-none d-sm-inline-block ms-1">Filter</span>
      </IconButton>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center m-0">Filter </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center- align-items-center flex-column bg-light p-4">
          <div>
            <select
              value={selectedCompany}
              onChange={e => handleCompanyChange(e.target.value)}
              className="border-0 m-1 mt-4 rounded bg-light"
            >
              <option value="">Select Company</option>
              {data &&
                data.length > 0 &&
                data.map(company => (
                  <option
                    key={company.vehicleCompany_id}
                    value={company.vehicleCompany_name}
                  >
                    {company.vehicleCompany_name}
                  </option>
                ))}
            </select>
          </div>
          {selectedCompany && (
            <div>
              <select
                value={selectedSchool}
                onChange={e => handleSchoolChange(e.target.value)}
                className="border-0 m-2 text-center word-wrap bg-light"
              >
                <option value="">Select School</option>
                {data
                  .find(
                    company => company.vehicleCompany_name === selectedCompany
                  )
                  ?.schools.map(school => (
                    <option key={school.school_id} value={school.school_name}>
                      {school.school_name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {selectedSchool && (
            <div>
              
              <select
                value={selectedVehicle}
                onChange={e => handleVehicleChange(e.target.value)}
                className="border-0 m-2 text-center bg-light"
              >
                <option value="">Select Vehicle</option>
                {data
                  .find(
                    company => company.vehicleCompany_name === selectedCompany
                  )
                  ?.schools.find(
                    school => school.school_name === selectedSchool
                  )
                  ?.vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.vehicle_reg}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Apply Filter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBarFilter;
