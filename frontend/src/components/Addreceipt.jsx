import React, { useContext, useState } from "react";
import { MyContext, ProductContext } from "./Context/ProductContext";
import { useParams, useLocation } from "react-router-dom";
import api from "../../utils/Instance";

const Addreceipt = () => {
  const { productData } = useContext(MyContext);
  const [inputValues, setInputValues] = useState({});
  const [inputId, setInputId] = useState([]);

const { id } = useParams();
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const delivery = queryParams.get("delivery");


   console.log("ppppp" + delivery)
  //console.log("products are: ", productData);

  const handleChange = (e, itemName) => {
    const value = e.target.value;
    const id1 = id;

    //for id loop in it
    setInputId((prev2) => ({ ...prev2, [value]: value }));
    console.log("id : value content ", id1);
    setInputValues((prev) => ({ ...prev, [itemName]: value }));
    console.log("Item:", itemName, "Value:", value);
  };

  const handlereceipt = async () => {
    // Step 1: Filter out empty values
    const itemsWithValues = Object.entries(inputValues)
      .filter(([name, value]) => value && value.trim() !== "")
      .map(([name, value]) => ({ name, value: Number(value) })); // Ensure number

    console.log("Items with values:", itemsWithValues);

    // Step 2: Map product names to IDs using productData from context
    const payload = itemsWithValues
      .map(({ name, value }) => {
        const product = productData.find((p) => p.name === name);
        return {
          pId: product?.id,
          quantity: value,
        };
      })
      .filter((item) => item.pId); // remove any that don't have a valid pid

    console.log("Payload to send:", payload);

    if (payload.length === 0) {
      alert("Please enter at least one valid value");
      return;
    }

    updateproducthandlerid(payload);
  };

 const updateproducthandlerid = async (payload) => {
   try {
     // Replace `id` with `cusId` if that's what your variable represents
     const response = await api.post(
       `/receipt/user/${id}?delivery=${delivery}`,
       payload
     );

     console.log("Receipt added successfully");
     alert("Receipt added successfully ✅");
   } catch (error) {
     console.error("Error adding receipt:", error);
     alert("Error adding receipt ❌");
   }
 };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Add Receipt</h1>
        <p className="text-gray-600 text-lg">
          Enter product quantities to add a new receipt for this customer.
        </p>
      </div>

      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200 p-6">
        {/* Submit Button on Top */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handlereceipt}
            className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
          >
            Submit Receipt
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 bg-blue-100 text-blue-800 font-semibold border-b border-blue-200">
                  Product Name
                </th>
                <th className="text-left py-4 px-6 bg-blue-100 text-blue-800 font-semibold border-b border-blue-200">
                  Quantity
                </th>
              </tr>
            </thead>

            {productData && productData.length > 0 ? (
              <tbody>
                {productData.map((elem, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 border-b border-gray-100"
                  >
                    <td className="py-4 px-6 text-gray-700">{elem.name}</td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        value={inputValues[elem.name] || ""}
                        onChange={(e) => handleChange(e, elem.name)}
                        className="w-full border border-blue-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter quantity"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-10 text-blue-600 font-medium"
                  >
                    Loading product data...
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Addreceipt;
