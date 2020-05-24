import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

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
                   <Menu.Item key="1"><Link to="/scores">Scores</Link></Menu.Item>
                   <Menu.Item key="2"><Link to="/schedule">Schedule</Link></Menu.Item>
                   <Menu.Item key="3"><Link to="/video">Video</Link></Menu.Item>
                   <SubMenu key="sub1" title="Standing">
                        <Menu.Item key="4"><Link to="/standing?conference=east">East</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/standing?conference=west">West</Link></Menu.Item>
                   </SubMenu>
                   <Menu.Item key="6"><Link to="/players">Players</Link></Menu.Item>
                   <Menu.Item key="7"><Link to="teams">Teams</Link></Menu.Item>
                </Menu> 
            </Sider>
        );
    }
}

export default SiderNavigation;