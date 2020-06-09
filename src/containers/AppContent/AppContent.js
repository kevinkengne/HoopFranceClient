import React from 'react';
import { Layout } from 'antd';
import AppFooter from '../../components/AppFooter/AppFooter';
import AppHeader from '../../components/AppHeader/AppHeader';
import ScoresContent from '../ScoresContent/ScoresContent';
import StandingContent from '../StandingContent/StandingContent';
import VideoContent from '../VideoContent/VideoContent';
import PlayersContent from '../PlayersContent/PlayersContent';
import TeamsContent from '../TeamsContent/TeamsContent';
import WatchListContent from '../WatchListContent/WatchListContent';
import PlayerDetailContent from '../PlayerDetailContent/PlayerDetailContent';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const { Content } = Layout;

const AppContent = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader/>
            <Content style={{ margin: '24px 16px 0', padding: '0 30px'}}>
                <Route path={ROUTES.HOME} exact component={ScoresContent}/>
                <Route path={ROUTES.SCORES} exact component={ScoresContent}/>
                <Route path={ROUTES.STANDING} component={StandingContent}/>
                <Route path={ROUTES.VIDEO} exact component={VideoContent}/>
                <Route path={ROUTES.PLAYERS} exact component={PlayersContent}/>
                <Route path={ROUTES.TEAMS} exact component={TeamsContent}/>
                <Route path={ROUTES.FOLLOWED} exact component={WatchListContent}/>
                <Route path={ROUTES.PLAYER_DETAIL} component={PlayerDetailContent}/>
            </Content>
            <AppFooter/>
        </Layout>
    );
}

export default AppContent;