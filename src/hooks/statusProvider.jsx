import { createContext, useState, useContext } from 'react';

const StatusContext = createContext();

export const useStatus = () => useContext(StatusContext);

export function StatusProvider ({ children }) {
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    severity: ""
  });
  const [todos, setTodos] = useState([])
  return (
    <StatusContext.Provider value={{ status, setStatus, todos, setTodos }}>
      {children}
    </StatusContext.Provider>
  );
}
