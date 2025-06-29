import React, { useContext, useState } from 'react'
import { MyContext } from './Context/ProductContext'
import api from '../../utils/Instance'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const Products = () => {
  const {productData , setproductData} = useContext(MyContext)
  const [popup, setpopup] = useState(false)
  const [newproductpopup, setnewproductpopup] = useState(false)
  const [edititem, setedititem] = useState('')
  const [editprice, seteditprice] = useState('')
  const [editname, seteditname] = useState('')
   const [editqty, seteditqty] = useState('')
  const [editdescription, seteditdescription] = useState('')
 


const [formData, setFormData] = useState({
  name: '',
  basePrice: '',
  description: '',
  quantity: ''
});

const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault(); 

  try {
    const response = await api.post('/products', formData); // Send to backend

    setproductData((prev) => [...prev, response.data]); 
    alert("Product Added successfully.");
  } 
  catch (error) {
    console.error('Error:', error);
     alert("Failed to delete product.");
  }

  setnewproductpopup(false); // Close the popup
};

const updateproduct = (idx) => {
  const item = productData.find((item) => item.id === idx);
  if (item) {
    setedititem(item);
    seteditprice(item.basePrice);
    seteditname(item.name);
    seteditdescription(item.description);
    seteditqty(item.quantity)
    setpopup(true);


  }
};

const handleUpdateProduct = async () => {
  try {
    const updatedProduct = {
      name: editname,
      description: editdescription,
      quantity: editqty,
      basePrice: editprice
    };
    const response = await api.put(`/products/${edititem.id}`, updatedProduct);
    
    setproductData((prev) =>
      prev.map((cust) =>
        cust.id === edititem.id ? { ...cust, ...updatedProduct, id: edititem.id } : cust
      )
    );
    
    
    alert("Product update successfully.");
    setpopup(false);
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product.");
  }
};

const handleDeleteProduct = async (id)=>{
 
   api.delete(`/products/${id}`)
    .then(() => {
      alert("Product deleted successfully.");
      setproductData((prev) => prev.filter((item) => item.id !== id));
         
    })

     .catch((error) => {
      console.error("Delete error:", error);
      alert("Failed to delete product.");
    });

}




  return (
    <div>
    <div className="w-full min-h-screen bg-[#E7E9FF] p-8">
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
        <button
          onClick={() => setnewproductpopup(true)}
          className="bg-blue-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData.map((product, id) => (
          <div
            key={id}
            className="bg-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                ₹{product.basePrice}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-600">
                Stock: {product.quantity} units
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => updateproduct(product.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Edit Product
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



  {popup && (
       <div className="fixed inset-0 opac-50 flex items-center justify-center z-50">
  <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-96 transform transition-all hover:scale-[1.02]">
    <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
      Edit Product
    </h3>

    {/* Product Name */}
    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
    <input 
      type="text" 
      value={editname}
      onChange={(e) => seteditname(e.target.value)}
      placeholder="Product Name" 
      className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:border-purple-300 transition-all" 
    />

    {/* Product Description */}
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <textarea 
      placeholder="Description"
      value={editdescription}
      onChange={(e) => seteditdescription(e.target.value)}
      className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:border-purple-300 transition-all min-h-[100px] resize-none"
    ></textarea>

    {/* Product Quantity */}
    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
    <input 
      type="number" 
      value={editqty}
      onChange={(e) => seteditqty(e.target.value)}
      placeholder="Quantity" 
      className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:border-purple-300 transition-all" 
    />

    {/* Product Price */}
    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
    <input 
      type="number"  
      value={editprice}
      onChange={(e) => seteditprice(e.target.value)}
      placeholder="Price" 
      className="w-full border-2 border-gray-200 p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:border-purple-300 transition-all" 
    />

    <div className="flex justify-end gap-4">
      <button 
        onClick={() => setpopup(false)} 
        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 font-medium"
      >
        Cancel
      </button>
      <button 
       onClick={handleUpdateProduct}
        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-medium"
      >
        Save Changes
      </button>
    </div>
  </div>
</div>

      )}


  {newproductpopup && (
        <div className="fixed inset-0 opac-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] w-96 transform transition-all hover:scale-[1.02]">
            <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Add New Product</h3>
            <input 
              type="text" 
               name="name" // important!
               value={formData.name} // bind to state
               onChange={handleChange} 
              placeholder="Enter Product Name" 
              className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm hover:border-emerald-300 transition-all" 
            />
            <textarea 
               name="description"
              value={formData.description}
              onChange={handleChange} 
              placeholder="Enter Product Description"
              className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm hover:border-emerald-300 transition-all min-h-[100px] resize-none"
            ></textarea>
            <input 
                name="basePrice"
               type="number"  
                value={formData.basePrice}
                  onChange={handleChange}
              placeholder="Enter Product Price" 
              className="w-full border-2 border-gray-200 p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm hover:border-emerald-300 transition-all" 
            />
            <input  
             name="quantity"
              type="number"
               value={formData.quantity} 
             onChange={handleChange}
              placeholder="Enter Product Quantity" 
              className="w-full border-2 border-gray-200 p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm hover:border-emerald-300 transition-all" 
            />
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setnewproductpopup(false)} 
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 font-medium"
              >
                Cancel
              </button>
             
              <button 
              onClick={handleSubmit}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-medium"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

























    </div>





  )
}
export default Products