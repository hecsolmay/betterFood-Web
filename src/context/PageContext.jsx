import React, { createContext, useState } from "react";

export const PreviousPageContext = createContext();

export const PreviousPageProvider = ({ children }) => {
  const [previousPage, setPreviousPage] = useState(null);

  return (
    <PreviousPageContext.Provider value={{ previousPage, setPreviousPage }}>
      {children}
    </PreviousPageContext.Provider>
  );
};
