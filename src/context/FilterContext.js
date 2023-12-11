import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for managing the filter data
const FilterContext = createContext();

// Create a custom hook to access the context
export const useFilterContext = () => useContext(FilterContext);

// Create a Provider component to wrap your app
export const FilterProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState({
    company: null,
    school: null,
    vehicle: null,
  });
  useEffect(()=>{
    console.log("Data updated")
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
