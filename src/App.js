import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import './css/app.scss';
import TopNav from './app/components/topnav'
import Login from './app/routes/login'
import Dashboard from './app/routes/dashboard'
import Teachers from './app/routes/teachers'
import Students from './app/routes/students'


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
