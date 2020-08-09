import * as React from 'react'; 
import Auth from '../auth/Auth'; 
import { Segment, Label, Button } from 'semantic-ui-react';

interface LoginProps {
    auth: Auth, 
}

const Login = (props: LoginProps) => {
    const onLogin = () => {
        props.auth.login(); 
    }

    return (
        <div>
            <Segment>
                <Label ribbon color="blue" size="large">Introduction</Label>
                <Segment basic textAlign={"center"}>
                    <h3 style={{textAlign:"center"}}>Welcome to Dogram,
                        In order to use the app, please click the "Log In" button at the right-hand corner
                    </h3>
                    {/* <Button style={{textAlign: "center"}} onClick={() => onLogin} size='huge' center color='blue'>
                        Log In
                    </Button> */}
                </Segment>
            </Segment>

            
        </div>
    )
}; 

export default Login; 