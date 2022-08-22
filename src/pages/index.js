import React from 'react';
import Layout from './Layout';
import HomePage from "../components/Home/index";

const Index = () => {
  document.title = 'WatchTech Blogs - Welcome'
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export default Index
