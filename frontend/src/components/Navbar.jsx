import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/Instance"; // Must be Axios instance with `withCredentials: true`

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("auth");

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true }); // important: send cookies
      localStorage.removeItem("auth");
      alert("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <div className="bg-[#DBEAFE] shadow-md">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-[20px] font-medium text-[#193CB8] hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/Customer"
              className="text-[20px] font-medium text-[#193CB8] hover:text-black"
            >
              Customer
            </Link>
            <Link
              to="/Products"
              className="text-[20px] font-medium text-[#193CB8] hover:text-black"
            >
              Product
            </Link>
            <Link
              to="/Sales"
              className="text-[20px] font-medium text-[#193CB8] hover:text-black"
            >
              Sales
            </Link>
          </div>

          {/* Auth Button */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-[#E5000B] hover:bg-black transition text-white px-5 py-2 rounded-md text-sm font-medium shadow"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-[#193CB8] hover:bg-black transition text-white px-5 py-2 rounded-md text-sm font-medium shadow"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
