import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import './css/app.scss';
import TopNav from './app/main/topnav'
import Login from './app/pages/login'
import Dashboard from './app/pages/dashboard'
import Teachers from './app/pages/teachers'
import Students from './app/pages/students'


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
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/students" component={Students} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
