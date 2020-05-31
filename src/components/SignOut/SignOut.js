import React from 'react';
import { Menu, Dropdown, Button, Avatar } from 'antd';
import { withFirebase } from '../Firebase';


const SignOutMenu = (props) => (
    <Menu>
        <Menu.Item>
            <Button type="link" onClick={props.onClick}>Sign Out</Button>
        </Menu.Item>
    </Menu>
);

const SignOut = (props) => {

    const handleClick = () => props.firebase.doSignOut();
    
    return (
        <div>
            <Avatar src={props.photo}/>
            <Dropdown overlay={<SignOutMenu onClick={handleClick}/>}>
                <Button type="primary" onClick={(e) => e.preventDefault()}>{props.username}</Button>
            </Dropdown>
        </div>
    );
}

export default withFirebase(SignOut);