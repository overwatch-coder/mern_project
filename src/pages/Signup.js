import React from 'react';
import Layout from './Layout';
import SignupPage from '../components/Signup/index';

const Signup = () => {
  document.title = 'Signup - WatchTech Blog'

  return (
    <Layout>
        <SignupPage />
    </Layout>
  )
}

export default Signup