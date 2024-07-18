import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set isAuthenticated to true if the token exists
  }, []);

  const handleLogin = () => {
    // Navigate to the login page
    window.location.href = '/login';
  };

  const handleSignUp = () => {
    // Navigate to the sign-up page
    window.location.href = '/register';
  };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Update isAuthenticated state
    setIsAuthenticated(false);
    // Redirect to home or any other desired route after logout
    window.location.href = '/';
  };

  return (
    <div className="main border-solid-black rounded-md flex flex-wrap items-center justify-between bg-[#FFF5E1] w-full h-20 p-2">
      <div className="flex items-center">
        <img
          className="h-16 w-20"
          src="../../logo.png"
          alt="QDRA Logo"
        />
        <h2 className="text-xl mx-[-16px] text-[#32012F] font-semibold">QDRA</h2>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="h-10 text-[#FFC700] w-24 rounded-lg text-sm font-semibold border-solid"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="h-10 text-[#FFBF00] bg-white w-24 rounded-lg text-sm font-semibold border-solid shadow-md"
            >
              Log In
            </button>
            <button
              onClick={handleSignUp}
              className="h-10 text-white w-24 rounded-lg bg-[#FFBF00] text-sm font-semibold border-solid shadow-lg"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
