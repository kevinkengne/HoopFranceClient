import React from 'react';
import SiderNavigation from './components/SiderNavigation/SiderNavigation';
import AppContent from './containers/AppContent/AppContent';
import { withAuthentication } from './components/Session';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <SiderNavigation/>
        <AppContent/>
      </Layout>
    </BrowserRouter>
  );
}

export default withAuthentication(App);
