import * as React from 'react'; 
import { Router, Route, Switch, Link } from 'react-router-dom'; 
import { Grid, Menu, Segment } from 'semantic-ui-react'; 
import Auth from './auth/Auth'; 
import NotFound from './components/NotFound'; 
import CreateImage from './components/CreateImage'; 
import ImagesList from './components/ImagesList';

export interface AppProps {
  auth: Auth, 
  history: any, 
}

const App = (props: AppProps) => {

  const handleLogin = () => {
    console.log("in")
    props.auth.login(); 
  }; 

  const handleLogout = () => {
    console.log("out")
    props.auth.logout(); 
  };  

  const generateMenu = () => {
    return (
      <Menu>
        <Menu.Item name='home'>
          {/* define path to Homepage */}
          <Link to='/'>Home</Link>
        </Menu.Item>

        {/* define login/logout button */}
        <Menu.Menu position='right'>{logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }; 

  const logInLogOutButton = () => {
    if (props.auth.isAuthenticated()) {
      return (
        <Menu.Item name='logout' onClick={handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name='login' onClick={handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  };

  // define route for each component: 
  const generateCurrentPage = () => {

    // if (!props.auth.isAuthenticated()) {
    //   return <Login auth={props.auth}/>
    // }
    return (
      <Switch>
        {/* Route to Create Image */}
        <Route 
          path="/images/create" 
          exact
          render={props => {
            return <CreateImage {...props}  />
          }}
        />

        {/* Route to display images */}
        <Route 
          path="/images"
          exact
          render={props => {
            return <ImagesList  {...props} />
          }}
        />

        {/* Route to display Not Found */}
        <Route component={NotFound}/>
      </Switch>
    )
  }

  return (
    <div>
      <Segment style={{padding: '8em 0em'}} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={props.history}>
                {generateMenu()}

                {generateCurrentPage()}
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}

export default App;
