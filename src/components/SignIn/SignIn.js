import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Button } from 'antd';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

const SignIn = () => <SignInButton/>;

class SignInButtonBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    handleSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        uid: socialAuthUser.user.uid,
                        photo: socialAuthUser.user.photoURL
                    });

                this.props.history.push(ROUTES.TEAMS);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { error } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <Button 
                    htmlType="submit"
                    type="primary">
                    Sign In
                </Button>
                {error && <p>{error.message}</p>}
            </form>
            
        );
    };
    
}

const SignInButton = compose(
    withRouter, 
    withFirebase,
)(SignInButtonBase);

export default SignIn;