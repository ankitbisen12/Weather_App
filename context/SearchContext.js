import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchShow: false,
  setSearchShow: () => {},
});

export const SearchProvider = ({ children }) => {
  const [searchShow, setSearchShow] = useState(false);

  return (
    <SearchContext.Provider value={{ searchShow, setSearchShow }}>
      {children}
    </SearchContext.Provider>
  );
};
