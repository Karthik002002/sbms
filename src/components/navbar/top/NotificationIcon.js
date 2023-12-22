import Dropdowns from 'components/doc-components/Dropdowns';
import React from 'react';
import { useEffect,useState} from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotificationBell from '../../../assets/img/nav-icons/notification_2645897.png';
import Notification from 'components/notification/Notification';

const NotificationIcon = () => {
  //data for the notification dropdown
  const sampleDataNotifcation = [
    {
      id: 1,
      children:
        'Vehicle added successfully',
      time: 'Just Now',
      className: 'rounded-1 border-x-0 border-300 border-bottom-0 p-1',
      to: '#!',
    },
    {
      id: 2,
      children:
        'T09XX0909 Moved out of network',
      time: '15m ago',
      className: 'rounded-1 border-x-0 border-300 border-bottom-0 p-1 ',
      unread: false,
      to: '#!'
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
      <Dropdown.Menu className='dropdown-menu-card dropdown-menu-end dropdown-caret notification-dropdown-menu'>
      <ListGroup
            variant="flush"
            className="fw-normal fs--1 scrollbar"
            style={{ maxHeight: '19rem' }}
          >
          
          <Card className="dropdown-menu-notification dropdown-menu-end shadow-none "
          style={{ maxWidth: '20rem' }}>
            {sampleDataNotifcation && sampleDataNotifcation.map(data => (
              <ListGroup.Item key={data.data} >
                <Notification {...data} flush />
              </ListGroup.Item>
            ))}
          </Card>
          </ListGroup>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationIcon;
