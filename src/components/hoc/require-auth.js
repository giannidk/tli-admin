import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (this.props.authenticated === null) {
          //this.props.history.push("/")
          return (
            <Redirect to={{
              pathname: '/',
              state: { from: this.props.location }
            }} />
          )
        }
    }
    
    componentWillUpdate(nextProps) {
        if (!nextProps.authenticated) {
            //this.props.history.push("/")
            return (
                <Redirect to={{
                  pathname: '/',
                  state: { from: this.props.location }
                }} />
              )
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return <Redirect to={{
        pathname: '/',
        state: { from: this.props.location }
      }} />;
    }
  }

  function mapStateToProps({auth}) {
    return { authenticated: auth.user };
  }

  return connect(mapStateToProps)(Authentication);
}