import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

class SignupForm extends Component {

  state = {
    userEmail: '',
    userPassword: '',
    userColor: '',
    isTeacher: false,
  }

  changeValue(field, e) {
    this.setState((state) => ({ user: { ...state.user, [field]: e.target.value } }))
  }

  changeUserType(e) {
    this.setState((state) => ({ user: { ...state.user, isTeacher: e.target.checked } }))
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

  renderCheckbox(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
      <input
        type={field.type || 'text'}
        id={field.id}
        className="form-control"
        placeholder={field.placeholder}
        ref={field.ref}
        {...field.input}
        style={{'display':'inline-block', 'width': '26px', 'height': 'auto'}}
      />
      <label htmlFor={field.id} style={{'display':'inline-block'}}>{field.label}</label>
      <p className="control-label">{touched ? error : ''}</p>
    </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { userEmail, userPassword, isTeacher } = this.state;
    
    
    return (
      <Panel>
        <Panel.Heading>SIGNUP</Panel.Heading>
        <Panel.Body>
        <form onSubmit={handleSubmit(() => this.props.onRegisterUser(this.state.user))}>
        <Field
          label="Email"
          name="email"
          placeholder="email"
          value={userEmail}
          onChange={(e) => this.changeValue('email', e)}
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          placeholder="password"
          type="password"
          value={userPassword}
          onChange={(e) => this.changeValue('password', e)}
          component={this.renderField}
        />
        <Field
          label="I am a teacher"
          name="isTeacher"
          id="isTeacher"
          type="checkbox"
          value={isTeacher}
          onChange={(e) => this.changeUserType(e)}
          component={this.renderCheckbox}
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