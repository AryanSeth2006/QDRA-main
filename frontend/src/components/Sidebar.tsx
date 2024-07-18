import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './sidebar.css';

const Sidebar: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setIsAuthenticated(false);
    }
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleMenuItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const clickedItem = e.currentTarget;
    // Toggle active class on clicked menu item
    clickedItem.classList.toggle('active');
    // Toggle visibility of submenu
    const submenu = clickedItem.querySelector('ul');
    if (submenu) {
      submenu.classList.toggle('active');
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''} bg-[#850F8D] text-[#fff]`}>
      <div className={`sidebar ${isActive ? 'active' : ''}`}>
        <div className="menu-btn" onClick={toggleSidebar}>
          <i className={`ri-arrow-${isActive ? 'left' : 'right'}-fill`}></i>
        </div>
        <div className="head">
          <div className="user-img">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTUzMjAyMTh8&ixlib=rb-4.0.3&q=85" alt="" />
          </div>
          <div className="user-details">
            <p className="title">QUDRA Community</p>
            {isAuthenticated ? (
              <p className='text-md text-white'>{user?.username}</p>
            ) : (
              <p className='text-sm'>Please log in</p>
            )}
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title">Main</p>
            <ul>
              <li onClick={handleMenuItemClick}><a href="/mission"><i className="icon ph-bold ph-house-simple"></i><span className="text">Mission</span></a></li>
              <li onClick={handleMenuItemClick}><a href="/upgrade"><i className="icon ph-bold ph-user"></i><span className="text">Upgrade</span><i className="arrow ph-bold ph-caret-down"></i></a>
                <ul className="sub-menu">
                  <li><a href="#"><span className="text">Users</span></a></li>
                  <li><a href="#"><span className="text">Subscribers</span></a></li>
                </ul>
              </li>
              <li onClick={handleMenuItemClick}><a href="/referral"><i className="icon ph-bold ph-calendar-blank"></i><span className="text">Referral</span></a></li>
              <li onClick={handleMenuItemClick}><a href="/roadmap"><i className="icon ph-bold ph-chart-bar"></i><span className="text">Roadmap</span><i className="arrow ph-bold ph-caret-down"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
