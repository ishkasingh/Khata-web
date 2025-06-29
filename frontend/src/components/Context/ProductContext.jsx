import React, { createContext, useEffect, useState } from 'react';

import api from '../../../utils/Instance';

export const MyContext = createContext();

export const ProductContext = ({ children }) => {
  const [productData, setproductData] = useState([]);

  useEffect(() => {

    const fetchdata = async ()=>{
        try {
            const response = await api.get("/products");
            setproductData(response.data)
            
        } catch (error) {
         console.error("Error fetching products:", error);
            
        }
    }

    fetchdata();
  
  }, [])
  


  return (
    <MyContext.Provider value={{ productData, setproductData }}>
      {children}
    </MyContext.Provider>
  );
};
