import React from 'react';
import Sidebar from './Sidebar.js';
import Navbar from './navbar.js';
import Clock from './clock.js';
import Footer from './footer.js';
const Home: React.FC = () => {
  return (
   
      <div className="flex ">
        <Sidebar />
        <div className=" flex">
          <Clock />
        </div>
       
      </div>
    
  );
};

export default Home;
