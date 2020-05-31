import React from 'react';
import { PageHeader } from 'antd';
import HeaderText from '../HeaderText/HeaderText';

const AppHeader = () => (
    <PageHeader extra={<HeaderText/>}/>
)
    
export default AppHeader;