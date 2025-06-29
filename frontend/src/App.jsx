import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Customer from '../src/components/Customer'
import Sales from '../src/components/Sales'
import Products from './components/Products'
import Navbar from './components/Navbar'
import Customerrecipt from './components/customer/Customerrecipt'
import { Toaster } from 'react-hot-toast';
import Rate from './components/Rate'
import Upadaterate from './components/Upadaterate'
import Addreceipt from './components/AddReceipt'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Sales" element={<Sales />} />
        <Route path="/recipt/:id" element={<Customerrecipt />} />
        <Route path="/rate/:id" element={<Rate />} />
        <Route path="/updaterate/:id" element={<Upadaterate />} />
        <Route path="/Addreceipt/:id" element={<Addreceipt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App
