import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './Context/ProductContext'
import api from '../../utils/Instance';
import { Allcustomer } from './Context/CustomerProvider';
import { useNavigate, useParams } from 'react-router-dom';

const Rate = () => {
  const { productData, setproductData } = useContext(MyContext)
  const { id } = useParams();
  const [productid, setproductid] = useState([])
  const [productname, setproductname] = useState([])
  const [rates, setRates] = useState({}) 

  const navigate = useNavigate();
  const updatepage = ()=>{
    

 navigate(`/updaterate/${id}`);
    
    
  }

  const rateproducthandlerid = async () => {
    try {
      const response = await api.get(`/rates/${id}`);
      setproductid(response.data)
    } catch (error) {
      console.error("Error updating rates:", error);
    }
  }

  useEffect(() => {
    rateproducthandlerid();
  }, [])

  useEffect(() => {
    if (productid.length > 0 && productData && productData.length > 0) {
      const matchedData = productid.map((elem) => {
        const item = productData.find((item) => item.id === elem.pid);
        return {
          id: elem.pid,
          name: item?.name,
          customerRate: elem.customerRate || 0, 
        };
      }).filter(item => item.name); 

      setproductname(matchedData);

      const initialRates = {};
      matchedData.forEach(item => {
        initialRates[item.id] = item.customerRate;
      });
      setRates(initialRates);
    }
  }, [productid, productData]);

  const handleRateChange = (productId, newRate) => {
    setRates(prev => ({
      ...prev,
      [productId]: newRate
    }));
  };



  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Item Rates</h1>
        <p className="text-gray-600 text-lg">
          View current rates of all listed products
        </p>
      </div>

      {/* Card Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200 p-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 bg-blue-100 text-blue-800 font-semibold border-b border-blue-200">
                  Item
                </th>
                <th className="text-right py-4 px-6 bg-blue-100 text-blue-800 font-semibold border-b border-blue-200">
                  Rate (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {productname.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-blue-50 border-b border-gray-100"
                >
                  <td className="py-4 px-6 text-gray-700">{item.name}</td>
                  <td className="py-4 px-6 text-right">
                    <input
                      type="number"
                      readOnly
                      value={rates[item.id] || ""}
                      className="w-24 border border-blue-300 rounded-md px-3 py-1 text-right text-sm sm:text-base bg-gray-100 text-gray-800"
                      placeholder="—"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={updatepage}
            className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
          >
            Update Rates
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rate