import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
// import CartNotification from 'components/navbar/top/CartNotification';
// import NotificationDropdown from 'components/navbar/top/NotificationDropdown';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import AppContext from 'context/Context';
import React, { useContext, useState } from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import NineDotMenu from './NineDotMenu';
// import { Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import NotificationIcon from './NotificationIcon';
import NotificationDropdown from 'pages/dashboard/navbar-top/NotificationDropdown';
import NavBarFilter from './NavBarFilter';

const TopNavRightSideNavItem = () => {
  const {
    config: { isDark, isRTL },
    setConfig
  } = useContext(AppContext);

  const [company, setCompany] = useState('All Companies');
  const [school, setSchool] = useState('All Schools');

  var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      {/* <Flex>
        <Form.Select
          size="sm"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="me-2"
        >
          <option value={'All Companies'}>All Companies</option>
          {loggedInUser.user.companies.map((company, i) => (
            <option value={i} key={company.id}>
              {company.company_name}
            </option>
          ))}
        </Form.Select>
      </Flex> */}

      {/* {company != 'All Companies' &&
      loggedInUser.user.companies[company].schools.length > 0 ? (
        <Flex>
          <Form.Select
            size="sm"
            value={school}
            onChange={e => setSchool(e.target.value)}
            className="me-2"
          >
            <option value={'All Schools'}>All Schools</option>
            {loggedInUser.user.companies[company].schools?.map(sch => (
              <option value={sch.id} key={sch.id}>
                {sch.name}
              </option>
            ))}
          </Form.Select>
        </Flex>
      ) : null} */}


      <NavBarFilter />

      <Nav.Item as={'li'}>
        <Nav.Link
          className="px-2 theme-control-toggle"
          onClick={() => setConfig('isDark', !isDark)}
        >
          <OverlayTrigger
            key="left"
            placement={isRTL ? 'bottom' : 'left'}
            overlay={
              <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              </Tooltip>
            }
          >
            <div className="theme-control-toggle-label">
              <FontAwesomeIcon
                icon={isDark ? 'sun' : 'moon'}
                className="fs-0"
              />
            </div>
          </OverlayTrigger>
        </Nav.Link>
      </Nav.Item>

      {/* <CartNotification /> */}
      {/* <NotificationDropdown /> */}
      {/* <NineDotMenu /> */}
      <ProfileDropdown />
      <NotificationIcon />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
