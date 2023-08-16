import React, { createContext, useContext, useState } from 'react';

// Context oluşturuluyor
const FiltersContext = createContext();

// ParamsProvider bileşeni
export default function FiltersProvider({ children }) {
  const [filters, setFilters] = useState([]);

  const updateFilters = (paramsObj) => {
    const newParams = Object.keys(paramsObj).filter(key => paramsObj[key]);
    setFilters(newParams);
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFiltersContext = () => useContext(FiltersContext);
