// import React, { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import AppContext from 'context/Context';
import dashboardIcon from '../../../assets/img/Navbar icons/dashboard_2328966.png';
const NavbarTopDropDownMenus = () => {
  // const {
  //   config: { navbarCollapsed, showBurgerMenu },
  //   setConfig
  // } = useContext(AppContext);

  // const handleDropdownItemClick = () => {
  //   if (navbarCollapsed) {
  //     setConfig('navbarCollapsed', !navbarCollapsed);
  //   }
  //   if (showBurgerMenu) {
  //     setConfig('showBurgerMenu', !showBurgerMenu);
  //   }
  // };

  return (
    <ul className="navbar-nav ms-3 mb-2 mb-lg-0 mt-1 navbar-font-style">
      <li className="nav-item ">
        <div className="dashboard-fix">
          <Link className="nav-link nav-fonts-styles" to="/dashboard">
            Dashboard
            
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-fonts-styles" to="/bus-tracking">
          Tracking
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-fonts-styles" to="#">
          Report Generation{' '}
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" to="#">
          Resource Management{' '}
        </Link>
      </li> */}
      {/* <li className="nav-item">
        <Link className="nav-link" to="/">
          Login/Sign Up{' '}
        </Link>
      </li> */}
    </ul>
  );
};

export default NavbarTopDropDownMenus;
