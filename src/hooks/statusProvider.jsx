import { createContext, useState, useContext } from 'react';
import { CustomAlert } from '@UI';

const StatusContext = createContext();

export const useStatus = () => useContext(StatusContext);

export function StatusProvider ({ children }) {
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    severity: ""
  });
  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
      <CustomAlert/>
    </StatusContext.Provider>
  );
}
