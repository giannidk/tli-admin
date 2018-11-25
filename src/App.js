import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import './scss/app.scss';
import { TopNav } from './app/components/main'
import Login from './app/routes/login'
import Home from './app/routes/home'
import Dashboard from './app/routes/dashboard'
import Teachers from './app/routes/teachers'
import TeacherDetails from './app/routes/teacher-details'
import Students from './app/routes/students'
import { Grid } from 'react-bootstrap'

class App extends Component {
  state = {
    userIsLoggedIn: false
  }
  commponentWillMount() {

  }
  render() {
    const { userIsLoggedIn } = this.state;
    return (
      <div className="App">
        <TopNav />
          <Grid fluid={true}>
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
    );
  }
}

export default App;
