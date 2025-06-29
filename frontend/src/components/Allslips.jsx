import { Link } from 'react-router-dom';
import React, { useContext,} from 'react'
import {Allcustomer} from './Context/CustomerProvider'


const Allslips = () => {

const { Customerdata } = useContext(Allcustomer);




  return (
    <div className="w-full min-h-screen bg-[#DBEAFE]  py-10 ">
      <div className="flex justify-center flex-wrap gap-6 max-w-7xl mx-auto">
        {Customerdata.map((customer, index) => (
          <div
            key={index}
            className="bg-white w-full sm:w-[340px] rounded-xl shadow-md p-5 hover:shadow-blue-300 transition-all duration-300"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500 font-medium">
                ID: {customer.id}
              </span>
              <Link
                to={`/rate/${customer.id}`}
                className="px-3 py-1 text-xs bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-md font-semibold transition"
              >
                Set Rates
              </Link>
            </div>

            {/* Info Section */}
            <Link to={`/recipt/${customer.id}`} className="space-y-3 text-sm">
              <div className="flex justify-between bg-blue-50 rounded-md p-2">
                <span className="font-semibold text-blue-700">Name:</span>
                <span className="text-gray-800">{customer.name}</span>
              </div>

              <div className="flex justify-between bg-blue-50 rounded-md p-2">
                <span className="font-semibold text-blue-700">Email:</span>
                <span className="text-gray-800 break-all">
                  {customer.email}
                </span>
              </div>

              <div className="flex justify-between bg-blue-50 rounded-md p-2">
                <span className="font-semibold text-blue-700">Phone:</span>
                <span className="text-gray-800">{customer.contact}</span>
              </div>

              <div className="bg-blue-50 rounded-md p-2">
                <span className="block font-semibold text-blue-700 mb-1">
                  Address:
                </span>
                <span className="text-gray-800 text-sm break-words">
                  {customer.address}
                </span>
              </div>

              <div className="bg-blue-50 rounded-md p-2">
                <span className="block font-semibold text-blue-700 mb-1">
                  Description:
                </span>
                <p className="text-gray-800 text-sm">{customer.description}</p>
              </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-5">
              <Link to={`/Addreceipt/${customer.id}?delivery=true`}>
                <button className="px-4 py-1.5 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-md text-sm font-semibold transition">
                  + Purchase
                </button>
              </Link>
              <Link to={`/Addreceipt/${customer.id}?delivery=false`}>
                <button className="px-4 py-1.5 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-md text-sm font-semibold transition">
                  – Return
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allslips;
