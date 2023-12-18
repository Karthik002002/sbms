import React, { createContext, useState, useContext, useEffect } from 'react';

const FilterContext = createContext();

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    company: null,
    school: null,
    vehicle: null,
    status: null
  });
  useEffect(()=>{
    console.log("Data updated")
    console.log(selectedFilter)
  },[selectedFilter])

  const updateFilter = (filterData) => {
    setSelectedFilter(filterData);
  };

  return (
    <FilterContext.Provider value={{ selectedFilter, updateFilter ,setSelectedFilter}}>
      {children}
    </FilterContext.Provider>
  );
};
