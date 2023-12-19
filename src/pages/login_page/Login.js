import React from 'react';
// import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';
import { useEffect } from 'react';
import AuthCardLayout from 'layouts/AuthCardLayout';
import datas from "../../sampleData/data.json"



const Login = props => {
  useEffect(() => {
    window.sessionStorage.setItem('dashboardData', JSON.stringify(datas));
  }, []);

  return (
    <AuthCardLayout>
      <h3>Login</h3>
      <LoginForm layout="card" hasLabel props={props} />
    </AuthCardLayout>
  );
};

export default Login;
