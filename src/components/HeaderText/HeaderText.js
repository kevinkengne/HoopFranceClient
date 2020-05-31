import React from 'react';
import SignIn from '../SignIn/SignIn';
import { AuthUserContext } from '../Session';
import SignOut from '../SignOut/SignOut';

const HeaderText = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <SignOut photo={authUser.photo} username={authUser.username}/> : <SignIn/>
        }
      </AuthUserContext.Consumer>
    </div>
  );

export default HeaderText;