import firebase from 'firebase';
import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import { Panel, Alert, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions';
import { Spinner } from '../components/main/spinner'

class SignupForm extends Component {

  state = {
    //userIsLogged: false,
    userEmail: '',
    userPassword: '',
    userColor: '',
    isTeacher: false,
  }



  /*  logoutUser(){
     firebase.auth().signOut()
   }

   } 
   */




  changeValue(field, e) {
    this.setState((state) => ({ user: { ...state.user, [field]: e.target.value } }))
  }

  changeUserType(e) {
    this.setState((state) => ({ user: { ...state.user, isTeacher: e.target.checked } }))
  }


  registerUser() {
    const { email, password } = this.state.user
    console.log('USER TO REGISTER: ', this.state.user)
    this.props.signupUser({email, password})
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
    const { handleSubmit, error, loading } = this.props;
    const { userEmail, userPassword, userColor, isTeacher } = this.state;
    /* if (this.state.userIsLogged) {
      this.updateUserData()
      return <Button onClick={() => this.logoutUser()}>Logout</Button>
    } */
    if (loading) {
      return <Spinner />
    }
    return (
      <Panel>
        <Panel.Heading>SIGNUP</Panel.Heading>
        {this.renderErrorAlert()}
        <Panel.Body>
        <form onSubmit={handleSubmit(() => this.registerUser())}>
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
          label="Favorite color"
          name="color"
          placeholder="favorite color"
          value={userColor}
          onChange={(e) => this.changeValue('color', e)}
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
          <button type="submit" className="btn btn-primary">Sign up</button>
          <button type="reset" className="btn btn-danger" style={{ marginLeft: 5 }} onClick={() => { this.props.reset() }}>Cancel</button>
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

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;
  return { error, loading };
};


export default reduxForm({
  validate,
  form: 'signupForm'
})(connect(mapStateToProps, { signupUser })(SignupForm));