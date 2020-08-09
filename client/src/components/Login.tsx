import * as React from 'react'; 
import Auth from '../auth/Auth'; 
import { Button } from 'semantic-ui-react';

interface LoginProps {
    auth: Auth, 
}

const Login = (props: LoginProps) => {
    const onLogin = () => {
        props.auth.login(); 
    }

    return (
        <div>
            <h1>Please Log In</h1>

            <Button onClick={() => onLogin} size='huge' color='blue'>
                Log In
            </Button>
        </div>
    )
}; 

export default Login; 