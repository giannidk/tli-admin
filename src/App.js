import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from 'react-bootstrap'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './app/reducers';

import './scss/app.scss';
import './scss/spinner.scss';
import { TopNav } from './app/components/main'
import Login from './app/routes/login'
import Home from './app/routes/home'
import Dashboard from './app/routes/dashboard'
import Teachers from './app/routes/teachers'
import TeacherDetails from './app/routes/teacher-details'
import Students from './app/routes/students'


import ClientsList from './app/routes/freelance/clients_list';
import ClientsAdd from './app/routes/freelance/clients_add';
import ProjectsList from './app/routes/freelance/projects_list';
import RegistrationsList from './app/routes/freelance/registrations_list';
import RegistrationsDetails from './app/routes/freelance/registrations_details';
import RegistrationsAdd from './app/routes/freelance/registrations_add';
import RegistrationsEdit from './app/routes/freelance/registrations_edit';
import ClientsDetails from './app/routes/freelance/clients_details';
import ProjectsDetails from './app/routes/freelance/projects_details';
import ProjectsInvoice from './app/routes/freelance/projects_invoice';
import InvoicesList from './app/routes/freelance/invoices_list';
import InvoiceDetails from './app/routes/freelance/invoices_details';

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
          <div className="app">
            <TopNav />
            <Grid fluid={false}>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/teachers/:key" component={TeacherDetails} />
                <Route path="/teachers" component={Teachers} />
                <Route path="/students" component={Students} />

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
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
