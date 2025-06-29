import React, { createContext, useEffect, useState } from 'react';
import api from '../../../utils/Instance';


export const Allcustomer = createContext();

export const CustomerProvider = ({ children }) => {
  const [Customerdata, setCustomerdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await api.get("/customer");
      
        setCustomerdata(response.data); 
      } catch (error) {
        console.log("Error fetching customer data:", error);
      }
    };

    fetchdata();
  }, []);

  return (
    <Allcustomer.Provider value={{Customerdata , setCustomerdata}}>
      {children}
    </Allcustomer.Provider>
  );
};
