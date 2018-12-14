import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderCheckbox } from '../utils/forms'

class SignupForm extends Component {

  render() {
    const { handleSubmit, handleChange, handleUserTypeChange } = this.props;
    const { userEmail, userPassword, userDisplayName, isTeacher } = this.props.user;
    
    
    return (
      <Panel>
        <Panel.Heading>SIGNUP</Panel.Heading>
        <Panel.Body>
        <form onSubmit={handleSubmit(() => this.props.onRegisterUser(this.props.user))}>
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
        <Field
          label="Display name"
          name="displayname"
          placeholder="Display Name"
          value={userDisplayName}
          onChange={(e) => handleChange('userDisplayName', e)}
          component={renderField}
        />
        <Field
          label="I am a teacher"
          name="isTeacher"
          id="isTeacher"
          type="checkbox"
          value={isTeacher}
          onChange={(e) => handleUserTypeChange(e)}
          component={renderCheckbox}
        />

        <div className="pull-right">
          <Button type="submit" bsStyle="primary">Sign up</Button>
          <Button type="reset" bsStyle="danger" style={{ marginLeft: 5 }} onClick={() => { this.props.reset() }}>Cancel</Button>
        </div>
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
  form: 'signupForm'
})(SignupForm);