import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Menu = () => {

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout", { withCredentials: true });
      setIsProfileDropdownOpen(false); // close dropdow
      const loginURL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/login"    // local frontend
        : "https://stock-sense-frontend-ten.vercel.app"; // deployed frontend

      window.location.href = loginURL;
 // full redirect to login app
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  const menuClass = "menu";
  const activeMenuClass = "menu selected";


  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">MK</div>
          <p className="username">USERID</p>
        </div>
        

        {isProfileDropdownOpen && (
          <div className="dropdown">
            <p className="dropdown-item">Settings &nbsp; &nbsp;
              <i class="fa fa-cog icons" aria-hidden="true"></i>
            </p>
            <p className="dropdown-item">My Profile &nbsp;
              <i class="fa fa-id-badge icons" aria-hidden="true"></i>
            </p>
            <button onClick={handleLogout} className="dropdown-item logout-btn">Logout &nbsp;
              <i class="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
