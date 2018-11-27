import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Panel,
} from 'react-bootstrap'
import DatePicker from 'react-16-bootstrap-date-picker';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { addQuickbookEntry, fetchTeachers } from '../../actions';

const teachers = [
  {
    id: 1,
    name: 'Ciccio Bombo',
  },
  {
    id: 2,
    name: 'Mariano comense',
  },
];

const pickerTimeSlots = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
]



class QuickBook extends Component {

  componentDidMount() {
    // initializing default values for the form
    //const { initialize, appData } = this.props;
    //console.log(appData);
    /*  initialize({
            hours: '0',
            minutes: '15',
            date: new Date().toISOString(),              
          });  */
          //this.props.fetchTeachers()
  }

  renderTeachers() {
    //const { projects } = this.props;   
    //const teachers = this.props.fetchTeachers() 
    
    return teachers.map(teacher => {
      return (
        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
      );
    });
  }

  renderPickerTimeSLots() {
    return pickerTimeSlots.map(timeSlot => <option key={timeSlot} value={timeSlot}>{timeSlot}</option>)
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `${field.containerClass} form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type={field.type || 'text'}
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

  renderSelectField(field) {
    const { meta: { touched, error } } = field;
    const className = `${field.containerClass} form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <div>
          <select className="form-control" {...field.input}>
            {field.children}
          </select>
          <p className="control-label">{touched ? error : ''}</p>
        </div>
      </div>
    );
  }

  renderDatepicker(field) {
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
    this.props.addQuickbookEntry(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (<Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Quick book</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Date"
            name="date"
            containerClass="col-sm-6"
            dateFormat="DD-MM-YYYY" //{appData.dateFormat}
            component={this.renderDatepicker}
          />
          <Field
            name="time"
            component={this.renderSelectField}
            defaultValue="02"
            containerClass="col-sm-6"
            label="Time">
            <option value="">Please select ...</option>
            {this.renderPickerTimeSLots()}
          </Field>
          <Field
            name="teacher"
            component={this.renderSelectField}
            defaultValue="02"
            containerClass="col-sm-12"
            label="Teacher">
            <option value="">Please select ...</option>
            {this.renderTeachers()}
          </Field>
          <Field
            label="Notes"
            name="notes"
            containerClass="col-sm-12"
            component={this.renderField}
          />
          <div className="pull-right">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/registrations" className="btn btn-danger" style={{ marginLeft: 5 }}>Cancel</Link>
          </div>
        </form>
      </Panel.Body>
      <Panel.Footer><a href="/calendar">View all in calendar</a></Panel.Footer>
    </Panel>)
  }
}



function validate(values) {
  const errors = {};
  // Validate inputs  
  if (!values.date) {
    errors.date = "Select a date!";
  }
  if (!values.time) {
    errors.time = "Select a time!";
  }
  if (!values.teacher) {
    errors.teacher = "Select a teacher!";
  }
  if (!values.notes) {
    errors.notes = "Enter some fucking note dude!";
  }
  return errors;
}


/* export default reduxForm({
  validate,
  form: 'QuickbookForm',
})(
  QuickBook
) */

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
  form: 'QuickbookForm',
})(
  connect(mapStateToProps, { addQuickbookEntry, fetchTeachers })(QuickBook)
);