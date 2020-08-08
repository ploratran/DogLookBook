import * as React from 'react'; 
import { Router, Route, Switch, Link } from 'react-router-dom'; 
import { Grid, Menu, Segment } from 'semantic-ui-react'; 
import Auth from './auth/Auth'; 
import NotFound from './components/NotFound'; 

export interface AppProps {
  auth: Auth, 
  history: any, 
}

const App = (props: AppProps) => {

  const handleLogin = () => {
    props.auth.login(); 
  }; 

  const handleLogout = () => {
    props.auth.logout(); 
  };  

  const generateMenu = () => {
    return (
      <Menu>
        <Menu.Item name='home'>
          <Link to='/'>Home</Link>
        </Menu.Item>

        <Menu.Menu position='right'>{logInLogOutButton}</Menu.Menu>
      </Menu>
    )
  }; 

  // define route for each component: 
  const generateCurrentPage = () => {
    return (
      <Switch>
        <Route component={NotFound}/>
      </Switch>
    )
  }

  const logInLogOutButton = () => {
    if (props.auth.isAuthenticated()) {
      return (
        <Menu.Item name='logout' onClick={() => handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name='login' onClick={() => handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  };

  return (
    <div>
      <Segment style={{padding: '8em 0em'}} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={props.history}>
                {generateMenu}

                {generateCurrentPage}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );

}

export default App;
