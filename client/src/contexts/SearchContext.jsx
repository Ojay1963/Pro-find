import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    location: '',
    type: 'All Types',
    status: 'Buy',
    beds: '',
    min: '',
    max: ''
  });

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
