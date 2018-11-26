import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from 'react-bootstrap'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './app/reducers';

import './scss/app.scss';
import { TopNav } from './app/components/main'
import Login from './app/routes/login'
import Home from './app/routes/home'
import Dashboard from './app/routes/dashboard'
import Teachers from './app/routes/teachers'
import TeacherDetails from './app/routes/teacher-details'
import Students from './app/routes/students'

class App extends Component {
  state = {
    userIsLoggedIn: false
  }
  commponentWillMount() {

  }
  render() {
    const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div className="App">
            <TopNav />
            <Grid fluid={false}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/teachers/:key" component={TeacherDetails} />
                <Route path="/teachers" component={Teachers} />
                <Route path="/students" component={Students} />
                <Route path="/" component={Home} />
              </Switch>
            </Grid>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
