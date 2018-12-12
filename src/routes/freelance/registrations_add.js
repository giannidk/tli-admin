import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import DatePicker from 'react-16-bootstrap-date-picker';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects, addRegistration } from '../../store/actions';
import { Spinner } from '../../components/main';

class RegistrationsAdd extends Component {    

    componentWillMount(){
        this.props.fetchProjects();
    }

    componentDidMount() {
      // initializing default values for the form
      const { initialize, appData } = this.props;
      console.log(appData);
       initialize({
              hours: '0',
              minutes: '15',
              project: this.props.match.params.projectID || '',
              date: new Date().toISOString(),              
            }); 
    }

    renderProjects() {           
        const { projects } = this.props;
        return _.map(projects, (project, key) => {
            return(                
                <option key={key} value={key}>{project.projectName}</option>
            );
        });
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `${field.containerClass} form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={ field.type || 'text'}
                    className="form-control"
                    step={field.step}
                    max={field.max}
                    min={field.min}
                    {...field.input}
                />
                <p className="control-label">{touched ? error : ''}</p>
            </div>
        );
    }

    renderSelectField(field){       
        const { meta: { touched, error } } = field;
        const className = `${field.containerClass} form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
            <label>{field.label}</label>
            <div>
            <select  className="form-control" {...field.input}>
                {field.children}
            </select>
            <p className="control-label">{touched ? error : ''}</p>
            </div>
        </div>
        );
    }

    renderDatepicker(field){
         const { meta: { touched, error } } = field;
        const className = `${field.containerClass} form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
                 <label>{field.label}</label>
                    <DatePicker 
                        {...field.input}
                        showTodayButton
                        id="date-datepicker"
                    />
                    {touched && error && <p className="control-label">{touched ? error : ''}</p>}
            </div>
        );
    }

    onSubmit(values) {
        this.props.addRegistration(values, () => {
            this.props.history.push('/registrations');
        });
    }

    render() {
        const { appData, handleSubmit, loading } = this.props;
         if( loading ) {
            return <Spinner />;
        }
        return (
            <div>
                <PageHeader>Add Registration</PageHeader>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                       <Field 
                        label="Date"
                        name="date"
                        containerClass="col-sm-4"
                        dateFormat={appData.dateFormat}
                        component={this.renderDatepicker}
                    />   
                     <Field
                        label="Hours"
                        name="hours"
                        type="number"
                        min="0"                        
                        containerClass="col-sm-3"
                        component={this.renderField}
                    />                     
                      <Field
                        label="Minutes"
                        name="minutes"
                        type="number"
                        step="15"
                        min="0"                        
                        max="45"   
                        containerClass="col-sm-3"
                        component={this.renderField}
                    />                       
                    <Field
                        label="Price (hour)"
                        name="price"
                        type="number"
                        min="0"
                        containerClass="col-sm-2"
                        component={this.renderField}
                    />
                    <Field 
                        name="project" 
                        component={this.renderSelectField} 
                        defaultValue="02"
                        containerClass="col-sm-12"
                        label="Project">
                        <option value="">Please select ...</option>
                        {this.renderProjects()}
                    </Field>
                    <Field
                        label="Name"
                        name="name"
                        containerClass="col-sm-12"
                        component={this.renderField}
                    />
                    <Field
                        label="Description"
                        name="description"
                        containerClass="col-sm-12"
                        component={this.renderField}
                    />
                    <div className="pull-right">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/registrations" className="btn btn-danger" style={{marginLeft: 5}}>Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    // Validate inputs
    if(!values.name) {
        errors.name = "Enter a valid registration name!";
    }
    if(!values.description) {
        errors.description = "Enter a small description";
    }
    
    if(!values.project) {
        errors.project = "Enter the project!";
    } 
    if(!values.date) {
        errors.date = "Enter the date!";
    }
      if(!values.price) {
        errors.price = "Enter value!";
    }  
    return errors;
}
function mapStateToProps({ projects, appData }) {
    return { 
        loading: projects.loading,
        error: projects.error,
        projects: projects.list,
        appData
    };
}

export default reduxForm({
    validate,
    form: 'RegistrationsAddForm', 
})(
    connect(mapStateToProps, { addRegistration, fetchProjects })(RegistrationsAdd)
);
