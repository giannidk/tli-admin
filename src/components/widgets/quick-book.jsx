import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Panel,
  Alert,
} from 'react-bootstrap'
import DatePicker from 'react-16-bootstrap-date-picker';
import { Field, reduxForm } from 'redux-form';
import { addQuickbookEntry, fetchTeachers } from '../../store/actions';
import { Spinner } from '../main';

const pickerTimeSlots = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
]



class QuickBook extends Component {

  componentDidMount() {
    this.props.fetchTeachers()
  }

  renderTeachers() {
    const { teachers } = this.props;
    return Object.entries(teachers).map((option) => {
      const id = option[0]
      const teacher = option[1]
      return (
        <option key={id} value={id}>{teacher.first_name} {teacher.last_name} ({teacher.chinese_last_name} {teacher.chinese_name})</option>
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
    const { handleSubmit, loading, error, teachers } = this.props;
    if (loading) {
      return <Spinner />;
    }


    return (<Panel bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Quick book</Panel.Title>
      </Panel.Heading>
      {error && <Alert bsStyle="danger">
        <p>{error}</p>
      </Alert>}
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
            {teachers && this.renderTeachers()}
          </Field>
          <Field
            label="Notes"
            name="notes"
            containerClass="col-sm-12"
            component={this.renderField}
          />
          <div className="pull-right">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="reset" className="btn btn-danger">Cancel</button>
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

function mapStateToProps({ teachers, appData }) {
  return {
    loading: teachers.loading,
    error: teachers.error,
    teachers: teachers.list,
    appData
  };
}

export default reduxForm({
  validate,
  form: 'QuickbookForm',
})(
  connect(mapStateToProps, { addQuickbookEntry, fetchTeachers })(QuickBook)
);