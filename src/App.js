import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { withLocalize } from 'react-localize-redux'
import { connect } from "react-redux"
import { fetchUser } from "./store/actions"
import { Grid, Alert } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import './scss/app.scss'
import './scss/spinner.scss'
import './scss/toastify/main.scss'

import requireAuth from "./components/hoc/require-auth"
import TopNav from './components/main/topnav'
import Login from './routes/login'
import Signup from './routes/signup'
import LoginAuth from './routes/login-auth'
import Home from './routes/home'
import Dashboard from './routes/dashboard'
import Teachers from './routes/teachers'
import TeacherDetails from './routes/teacher-details'
import Students from './routes/students'

import globalTranslations from "./translations/global.json"
import { renderToStaticMarkup } from "react-dom/server"

class App extends Component {

  constructor(props) {
    super(props)

    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Italian", code: "it" }
      ],
      translation: globalTranslations,
      options: { 
        renderToStaticMarkup,
        renderInnerHtml: true,
        defaultLanguage: "en"
      }
    })
  }
  
  componentDidMount() {
    this.props.fetchUser()
    const activeLanguage = localStorage.getItem('language')
    activeLanguage && this.props.setActiveLanguage(localStorage.getItem('language'))
  }

  render() {
    return (
        <BrowserRouter>
          <div className="app">
            <TopNav />
            <Alert bsStyle="warning">You still need to activate your email. Didin't receive the activartion email? <strong>Send it again</strong></Alert>
            <Grid fluid={false} className="page-container">
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/login-auth" component={LoginAuth} />
                <Route path="/dashboard" component={requireAuth(Dashboard)} />
                <Route path="/teachers/:key" component={TeacherDetails} />
                <Route path="/teachers" component={Teachers} />
                <Route path="/students" component={requireAuth(Students)} />
                <Route path="/" component={Home} />
              </Switch>
            </Grid>
            <ToastContainer />
          </div>
        </BrowserRouter>
    )
  }
}

export default withLocalize(connect(null, { fetchUser })(App))
