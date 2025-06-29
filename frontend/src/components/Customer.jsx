import React, { useContext, useState } from 'react';
import { Allcustomer } from './Context/CustomerProvider';
import api from '../../utils/Instance';

const Customer = () => {
const { Customerdata, setCustomerdata } = useContext(Allcustomer);

   const [popup, setpopup] = useState(false);
   const [addcustomerpopup, setaddcustomerpopup] = useState(false);
  const [customerId, setCustomerId] = useState('');
   const [Name, setName] = useState('')
   const [Address, setAddress] = useState('');
   const [Description, setDescription] = useState('');
   const [Contact, setContact] = useState('');
   const [Email, setEmail] = useState('');


const editHandler = (id)=>{
  setpopup(true);

  const customer = Customerdata.find((customer) => customer.id === id);
  if(customer) {
    setCustomerId(customer.id);
    setName(customer.name);
    setAddress(customer.address);
    setDescription(customer.description);
    setContact(customer.contact);
    setEmail(customer.email);
  }

 
}
const SubmitHandler = async(e) =>{
  e.preventDefault();

  try {
  const customerdataupdate = {
    name: Name,
    email: Email,
    address: Address,
    description: Description,
    contact: Contact,
    
  }
  const response = await api.put(`/customer/${customerId}`, customerdataupdate);

  alert("Product updated successfully!");
    setpopup(false); 

    
  } catch (error) {
    console.error("Error updating customer:", error);
    alert("Failed to update customer.");
  }

}



const CustomerDeleteHandler = (id)=>{
  
  api.delete(`/customer/${id}`)
    .then(() => {
      alert("customer deleted successfully.");
       setCustomerdata((prev) => prev.filter((customer) => customer.id !== id));
    })

    .catch((error) => {
      console.error("Delete error:", error);
      alert("Failed to delete customer.");
    });

}



const [cusname, setcusname] = useState('')
const [cusemail, setcusemail] = useState('')
const [cusaddress, setcusaddress] = useState('')  
const [cusdescription, setcusdescription] = useState('')
const [cuscontact, setcuscontact] = useState('')



const customerSubmitHandler = async ()=>{
try {
  const newCustomer = {
    name: cusname,
    email: cusemail,
    address: cusaddress,  
    description: cusdescription,
    contact: cuscontact,  
  }

  const response = await api.post('/customer', newCustomer);
 
  alert("Customer added successfully!");

  setCustomerdata((prev) => [...prev, response.data]); 
   

} catch (error) {
  console.error("Error adding customer:", error);
  alert("Failed to add customer.");
  
}


  setaddcustomerpopup(false);
}


  return (
    <div>
      <div className="w-full min-h-screen bg-[#DBEAFE]  p-6">
        <div className='flex items-center justify-between py-4 px-6'>
          <h2 className="text-2xl font-bold mb-6 text-blue-800">
            Customer List
          </h2>
          <button
            onClick={() => setaddcustomerpopup(true)}
            className="px-6 py-2 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Add Customer
          </button>
        </div>

        <div className="space-y-4">
          {Customerdata && Customerdata.length > 0 ? (
            Customerdata.map((customer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white shadow rounded-lg px-6 py-4"
              >
                <div className="flex flex-row gap-8 flex-wrap w-full">
                  <div>
                    <span className="font-semibold text-blue-700">Name: </span>
                    <span className="text-gray-800">{customer.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Email: </span>
                    <span className="text-gray-800">{customer.email}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">
                      Description:{" "}
                    </span>
                    <span className="text-gray-800">
                      {customer.description}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">
                      Address:{" "}
                    </span>
                    <span className="text-gray-800">{customer.address}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editHandler(customer.id)}
                    className="px-8 py-1.5 text-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      CustomerDeleteHandler(customer.id);
                    }}
                    className="px-8 py-1.5 text-md bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No customers found.</p>
          )}
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-[1px]">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Edit Customer
            </h3>
            <form onSubmit={SubmitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="editName"
                  className="block text-blue-700 font-semibold mb-1"
                >
                  Name
                </label>
                <input
                  name="name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  id="editName"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editAddress"
                  className="block text-blue-700 font-semibold mb-1"
                >
                  Address
                </label>
                <input
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  id="editAddress"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter address"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editDescription"
                  className="block text-blue-700 font-semibold mb-1"
                >
                  Description
                </label>
                <input
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  id="editDescription"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter description"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editContact"
                  className="block text-blue-700 font-semibold mb-1"
                >
                  Contact
                </label>
                <input
                  value={Contact}
                  onChange={(e) => setContact(e.target.value)}
                  name="contact"
                  id="editDescription"
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Number"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editemail"
                  className="block text-blue-700 font-semibold mb-1"
                >
                  email
                </label>
                <input
                  name="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="editemail"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="you@you.com"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setpopup(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addcustomerpopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/30  flex items-center justify-center z-50">
          <form
            onSubmit={customerSubmitHandler}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Add a customer
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={cusname}
                onChange={(e) => setcusname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                value={cusemail}
                onChange={(e) => setcusemail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter your address"
                value={cusaddress}
                onChange={(e) => setcusaddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Write something..."
                value={cusdescription}
                onChange={(e) => setcusdescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="number"
                value={cuscontact}
                onChange={(e) => setcuscontact(e.target.value)}
                placeholder="Enter contact number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setaddcustomerpopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Customer;
