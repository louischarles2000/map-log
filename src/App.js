import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

import Home from './containers/Home';
import SignIn from './containers/SignIn';
import { getAuth } from './store/actions/entries';
const App = () => {
  const { isAuthenticated } = useSelector(state => state.entriesState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);
  
  let routes = (
    <Switch>
      <Route path="/auth/create-account" render={() => <SignIn isSignup />}/>
      <Route path="/auth" component={SignIn}/>
      <Redirect to="/auth" />
    </Switch>
  );
  if(isAuthenticated){
    routes = (
      <Switch>
        <Route path="/home" component={Home}/>
        <Redirect to="/home" />
      </Switch>
    );
  }
  return routes;
}

export default App;