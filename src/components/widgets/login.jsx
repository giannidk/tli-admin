import firebase from 'firebase';
import React, { Component } from 'react';
import { Panel, Alert, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../redux/actions';
import { Spinner } from '../main'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.        
        this.setState({
          user: user
        })
        // ...
      } else {
        this.setState({ userIsLogged: false, user: null })
        // User is signed out.
        // ...
      }
      this.setState({ loading: false })
    });
  }

  logoutUser() {
    firebase.auth().signOut()
  }

  onEmailChange(text) {
    this.props.emailChanged(text.target.value);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
  }


  onSubmit() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password },
      () => { 
        this.props.history.push("/dashboard");
      }
    );
  }


  renderErrorAlert() {
    const { error } = this.props;
    if (error) {
      return (
        <div>
          <Alert bsStyle="danger">
            <p>{error}</p>
          </Alert>
        </div>
      );
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type={field.type || 'text'}
          className="form-control"
          placeholder={field.placeholder}
          ref={field.ref}
          {...field.input}
        />
        <p className="control-label">{touched ? error : ''}</p>
      </div>
    );
  }

  render() {
    const { handleSubmit, userEmail, userPassword } = this.props;
    if (this.state.loading) {
      return <Spinner />
    }
    if (this.state.user) {
      return <Button onClick={() => this.logoutUser()}>Logout</Button>
    }
    return (
      <Panel>
        <Panel.Heading>Login</Panel.Heading>
        {this.renderErrorAlert()}
        <Panel.Body>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email"
              name="email"
              placeholder="email"
              value={userEmail}
              onChange={this.onEmailChange.bind(this)}
              component={this.renderField}
            />
            <Field
              label="Password"
              name="password"
              placeholder="password"
              type="password"
              value={userPassword}
              onChange={this.onPasswordChange.bind(this)}
              component={this.renderField}
            />
            <p><Link to={`/signup`}>Not a member yet? Sign up here</Link></p>
            <ButtonGroup className="pull-right">
              <Button
                bsStyle="primary"
                type="submit"
              >
                <Glyphicon glyph="log-in" /> Log in
              </Button>
              <Button
                bsStyle="danger"
                type="reset"
                onClick={() => { this.props.reset() }}
                style={{ marginLeft: 5 }}
              >
                <Glyphicon glyph="remove" /> Cancel
              </Button>
            </ButtonGroup>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

function validate(values) {
  const errors = {};
  // Validate inputs
  if (!values.password) {
    errors.password = "Password is required!";
  }
  if (!values.email) {
    errors.email = "Enter you email address!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  // if errors is empty, the form is valid and can be submitted
  // if errors has any properties, the form is invalid
  return errors;
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;
  return { email, password, error, loading, user };
};


export default withRouter(reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)));