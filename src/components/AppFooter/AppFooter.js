import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            HoopFrance ©{new Date().getFullYear()} Created by Kevin K.
        </Footer>
    );
}

export default AppFooter;