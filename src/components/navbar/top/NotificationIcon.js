import Dropdowns from 'components/doc-components/Dropdowns';
import React from 'react';
import { useEffect,useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotificationBell from '../../../assets/img/nav-icons/notification_2645897.png';

const NotificationIcon = () => {
  const sampleDataNotifcation = [
    {
      data: 'sample'
    },
    {
      data: 'sample2'
    },
    {
      data: 'sample3'
    }
  ];

  const [notificationCount, setNotificationCount] = useState(1)
  return (
    <Dropdown className='m-auto'>
      <Dropdown.Toggle 
      bsPrefix="toggle"
      as={Link}
      to="#!"
      className="pe-1 mt-0 m-2 bg-none ps-2 nav-link ">
        
        <img
          src={NotificationBell}
          className="invert-hover"
          style={{
            resizeMode: 'contain',
            height: 25,
            width: 25,
          }}
        />
        <span class=" top-0 start-100 translate-middle badge rounded-pill bg-danger">{notificationCount}</span>
        
      </Dropdown.Toggle>
    </Dropdown>
  );
};

export default NotificationIcon;
