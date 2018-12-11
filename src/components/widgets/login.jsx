import React, { Component } from 'react';
import { Panel, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../utils/forms'

class LoginForm extends Component {

  render() {
    const { handleSubmit, handleChange } = this.props;
    const { userEmail , userPassword } = this.props.user;
    
    return (
      <Panel>
        <Panel.Heading>Login</Panel.Heading>
        <Panel.Body>
          <form onSubmit={handleSubmit(() => this.props.onLoginUser())}>
            <Field
              label="Email"
              name="email"
              placeholder="email"
              value={userEmail}
              onChange={(e) => handleChange('userEmail', e)}
              component={renderField}
            />
            <Field
              label="Password"
              name="password"
              placeholder="password"
              type="password"
              value={userPassword}
              onChange={(e) => handleChange('userPassword', e)}
              component={renderField}
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

export default reduxForm({
  validate,
  form: 'loginForm'
})(LoginForm);