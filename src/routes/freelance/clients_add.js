import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addClient } from '../../actions';

class ClientsAdd extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type="text"
                    className="form-control"
                    {...field.input}
                />
                <p className="control-label">{touched ? error : ''}</p>
            </div>
        );
    }
    onSubmit(values) {
        this.props.addClient(values, () => {
            this.props.history.push('/clients');
        });
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <PageHeader>Add client</PageHeader>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Client Name"
                        name="clientName"
                        component={this.renderField}
                    />
                    <Field
                        label="Contact Person"
                        name="contactPerson"
                        component={this.renderField}
                    />
                    <Field
                        label="Contact Email"
                        name="contactEmail"
                        component={this.renderField}
                    />
                    <Field
                        label="Contact Phone Nr."
                        name="contactPhone"
                        component={this.renderField}
                    />
                    <div className="pull-right">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link to="/clients" className="btn btn-danger" style={{marginLeft: 5}}>Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    // Validate inputs
    if(!values.clientName) {
        errors.clientName = "Enter the client name!";
    }
    if(!values.contactPerson) {
        errors.contactPerson = "Enter the contact person's name!";
    }
    if(!values.contactEmail) {
        errors.contactEmail = "Enter the contact person's email!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)) {
        errors.contactEmail = 'Invalid email address'
    }
    if(!values.contactPhone) {
        errors.contactPhone = "Enter the contact person's phone!";
    }

    // if errors is empty, the form is valid and can be submitted
    // if errors has any properties, the form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'ClientsAddForm'
})(
    connect(null, { addClient })(ClientsAdd)
);
