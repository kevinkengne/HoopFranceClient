import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withUser } from '../Session';
import navLogo from './NavigationLogo.jpeg';

const { Sider } = Layout;
const { SubMenu } = Menu;


class SiderNavigation extends React.Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <Sider breakpoint="sm" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} collapsedWidth="0" >
               <div className="logo" />
               <Menu theme="dark" mode="inline">
                   <img src={navLogo} alt="Hoop"/>
                   <Menu.Item key="1"><Link to={ROUTES.SCORES}>Scores</Link></Menu.Item>
                   <Menu.Item key="3"><Link to={ROUTES.VIDEO}>Video</Link></Menu.Item>
                   <SubMenu key="sub1" title="Standing">
                        <Menu.Item key="4"><Link to={ROUTES.STANDING_EAST}>East</Link></Menu.Item>
                        <Menu.Item key="5"><Link to={ROUTES.STANDING_WEST}>West</Link></Menu.Item>
                   </SubMenu>
                   <Menu.Item key="6"><Link to={`${ROUTES.PLAYERS}?team=1`}>Players</Link></Menu.Item>
                   <Menu.Item key="7"><Link to={ROUTES.TEAMS}>Teams</Link></Menu.Item>
                   {
                       this.props.user && (<Menu.Item key="8"><Link to={ROUTES.FOLLOWED}>Watchlist</Link></Menu.Item>)
                   }
                </Menu> 
            </Sider>
        );
    }
}

export default withUser(SiderNavigation);