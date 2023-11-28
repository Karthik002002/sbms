import Divider from 'components/common/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import SocialAuthButtons from './SocialAuthButtons';

const LoginForm = ({ hasLabel }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://sbmsadmin.elenageosys.com/api/auth/login/',
        {
          username: e.target[0].value,
          password: e.target[1].value,
          client: 'smbs-webapp'
        }
      );
      window.sessionStorage.setItem(
        'loggedInUser',
        JSON.stringify(response.data)
      );

      toast.success(`Logged in as ${e.target[0].value}`, {
        theme: 'colored'
      });
      console.log(response.data);
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error('Login Error', { theme: 'colored' });
    }
  };
  // Handler
  //  const handleSubmit = e => {
  //     e.preventDefault();
  //     fetch('https://sbmsadmin.elenageosys.com/api/auth/login/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         username: e.target[0].value,
  //         password: e.target[1].value,
  //         client: 'smbs-webapp'
  //       })
  //     })
  //       .then(response => (response = response.json()))
  //       .then(data => {
  //         console.log(data);
  //         if (data.non_field_errors) {
  //           toast.error(data.non_field_errors[0], { theme: 'colored' });
  //           return;
  //         }
  //         toast.suc cess(`Logged in as ${e.target[0].value}`, {
  //           theme: 'colored'
  //         });
  //         // eslint-disable-next-line react/prop-types
  //         window.sessionStorage.setItem('loggedInUser', JSON.stringify(data));
  //         window.location.href = '/dashboard';
  //         console.log('data: ', data);
  //       })
  //       .catch(() => {
  //         // console.error(e);
  //         toast.error('Login Error', { theme: 'colored' });
  //       });
  //   };

  // let service = JSON.parse(sessionStorage.getItem('serviceWorker'));
  // console.log(service.endpoint)
  // async function sendSubscriptionToServer() {
  //   // Send the subscription object to your server
  //   const SERVER_URL =
  //     ' http://sbmsadmin.elenageosys.com:8081/user-management/webpushid/';
  //   // const SERVER_URL = "https://elenageosys.com/webpush/";
  //   const response = await fetch(SERVER_URL, {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: 'superuser',
  //       keys_p256dh: service.keys.p256dh,
  //       keys_auth: service.keys.auth,
  //       end_point: service.endpoint
  //     })
  //   });
  //   return response.json();
  // }
  // sendSubscriptionToServer();

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-4">
        {hasLabel && <Form.Label>Username</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Username' : ''}
          name="username"
          type="username"
          id="loginformusername"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          name="password"
          type="password"
          id="loginformpassword"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input type="checkbox" name="remember" />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        {/* <Col xs="auto">
          <Link className="fs--1 mb-0" to={`/forgot-password`}>
            Forgot Password?
          </Link>
        </Col> */}
      </Row>

      <Form.Group>
        <Button type="submit" color="primary" className="mt-4 w-100">
          Log in
        </Button>
      </Form.Group>

      <Link to={`/contact-us`}>
        <Divider className="mt-5">Contact Elena Geo Systems</Divider>
      </Link>

      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  // layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  props: PropTypes.object
};

LoginForm.defaultProps = {
  // layout: 'simple',
  hasLabel: false,
  props: {}
};

export default LoginForm;
