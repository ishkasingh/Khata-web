import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../../utils/Instance';

const CustomerReceipt = () => {
  const { id } = useParams();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/receipt/user/${id}`);
        setReceipts(response.data);
      } catch (error) {
        console.error("Error fetching receipt:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {receipts && receipts.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-6">
          {receipts.map((elem, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-6 mb-6 w-[400px]">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-blue-700">Receipt <span className='text-red-100'>#{elem.receiptId}</span> </h2>
                <p className="text-gray-800 font-medium">Customer: {elem.cusName}</p>
                <p className="text-gray-700">
                  Delivery: <span className="font-semibold">{elem.delivery ? 'Yes' : 'No'}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Created At: {new Date(elem.createdAt).toLocaleString()}
                </p>
              </div>

              <table className="min-w-full bg-gray-50 rounded overflow-hidden text-sm">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-right">Quantity</th>
                    <th className="px-4 py-2 text-right">Rate</th>
                    <th className="px-4 py-2 text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {elem.itemLists.map((item, itemIdx) => (
                    <tr key={itemIdx} className="border-t">
                      <td className="px-4 py-2">{item.product}</td>
                      <td className="px-4 py-2 text-right">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">₹{item.rate}</td>
                      <td className="px-4 py-2 text-right">₹{item.totalPrice}</td>
                    </tr>
                    
                  ))}
                   <tr className="border-t ">
                     <td colSpan="3" className="px-4 py-2 text-right font-medium">Total Amount:</td>
                     <td className="px-4 py-2 text-right font-medium">₹{elem.totalAmount}</td>
                   </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No receipts found.</p>
      )}
    </div>
  );
};

export default CustomerReceipt;
