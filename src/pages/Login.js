import React from 'react';
import Layout from './Layout';
import LoginPage from '../components/Login/index';

const Login = () => {
  document.title = 'Login - WatchTech Blog'

  return (
    <Layout>
        <LoginPage />
    </Layout>
  )
}

export default Login