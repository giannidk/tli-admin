import React, { Component } from 'react';
import './css/app.scss';
import TopNav from'./app/main/topnav'
import Login from'./app/pages/login'
import Dashboard from'./app/pages/dashboard'


class App extends Component {
  render() {
    return (
      <div className="App">
      <TopNav />
      <Login />
      <Dashboard />
       
      </div>
    );
  }
}

export default App;
