import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./redux/actions";
import { Grid } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import './scss/app.scss';
import './scss/spinner.scss';
import './scss/toastify/main.scss';

import requireAuth from "./components/hoc/require-auth";
import TopNav from './components/main/topnav'
import Login from './routes/login'
import Signup from './routes/signup'
import LoginAuth from './routes/login-auth'
import Home from './routes/home'
import Dashboard from './routes/dashboard'
import Teachers from './routes/teachers'
import TeacherDetails from './routes/teacher-details'
import Students from './routes/students'


import ClientsList from './routes/freelance/clients_list';
import ClientsAdd from './routes/freelance/clients_add';
import ProjectsList from './routes/freelance/projects_list';
import RegistrationsList from './routes/freelance/registrations_list';
import RegistrationsDetails from './routes/freelance/registrations_details';
import RegistrationsAdd from './routes/freelance/registrations_add';
import RegistrationsEdit from './routes/freelance/registrations_edit';
import ClientsDetails from './routes/freelance/clients_details';
import ProjectsDetails from './routes/freelance/projects_details';
import ProjectsInvoice from './routes/freelance/projects_invoice';
import InvoicesList from './routes/freelance/invoices_list';
import InvoiceDetails from './routes/freelance/invoices_details';

class App extends Component {
  
  componentWillMount() {
    this.props.fetchUser();
  }
  render() {
    return (
        <BrowserRouter>
          <div className="app">
            <TopNav />
            <Grid fluid={false}>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/login-auth" component={LoginAuth} />
                <Route path="/dashboard" component={requireAuth(Dashboard)} />
                <Route path="/teachers/:key" component={TeacherDetails} />
                <Route path="/teachers" component={Teachers} />
                <Route path="/students" component={requireAuth(Students)} />
                <Route path="/clients/add" component={ClientsAdd} />
                <Route path="/clients/:key" component={ClientsDetails} />
                <Route path="/clients" component={ClientsList} />
                <Route path="/projects/:key/invoice" component={ProjectsInvoice} />
                <Route path="/projects/:key" component={ProjectsDetails} />
                <Route path="/projects" component={ProjectsList} />
                <Route path="/registrations/add/:projectID" component={RegistrationsAdd} />
                <Route path="/registrations/add" component={RegistrationsAdd} />
                <Route path="/registrations/edit/:key" component={RegistrationsEdit} />
                <Route path="/registrations/:key" component={RegistrationsDetails} />
                <Route path="/registrations" component={RegistrationsList} />
                <Route path="/invoices/:invoiceKey" component={InvoiceDetails} />
                <Route path="/invoices" component={InvoicesList} />
                <Route path="/" component={Home} />
              </Switch>
            </Grid>
            <ToastContainer />
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
