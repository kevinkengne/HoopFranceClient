import React from 'react';
import { Layout } from 'antd';
import AppFooter from '../../components/AppFooter/AppFooter';
import AppHeader from '../../components/AppHeader/AppHeader';
import ScoresContent from '../ScoresContent/ScoresContent';
import ScheduleContent from '../ScheduleContent/ScheduleContent';
import StandingContent from '../StandingContent/StandingContent';
import VideoContent from '../VideoContent/VideoContent';
import PlayersContent from '../PlayersContent/PlayersContent';
import TeamsContent from '../TeamsContent/TeamsContent';
import { Route } from 'react-router-dom';

const {  Content } = Layout;

const AppContent = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader/>
            <Content style={{ margin: '24px 16px 0', padding: '0 30px'}}>
                <Route path="/" exact component={ScoresContent}/>
                <Route path="/scores" exact component={ScoresContent}/>
                <Route path="/standing" component={StandingContent}/>
                <Route path="/schedule" exact component={ScheduleContent}/>
                <Route path="/video" exact component={VideoContent}/>
                <Route path="/players" exact component={PlayersContent}/>
                <Route path="/teams" exact component={TeamsContent}/>
            </Content>
            <AppFooter/>
        </Layout>
    );
}

export default AppContent;