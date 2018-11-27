import React, { Component } from 'react'
import {
  Panel,
} from 'react-bootstrap'
import DatePicker from 'react-16-bootstrap-date-picker';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';



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

  render() {
    return (<Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Quick book</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        {/* <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> */}
        <form onSubmit={() => console.log('Submitting...')}>
          <Field
            label="Date"
            name="date"
            containerClass="col-sm-4"
            dateFormat="DD-MM-YYYY" //{appData.dateFormat}
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
            name="teacher"
            component={this.renderSelectField}
            defaultValue="02"
            containerClass="col-sm-12"
            label="Teacher">
            <option value="">Please select ...</option>
            {/* this.renderTeachers() */}
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

//export { QuickBook }


export default reduxForm({
  //validate,
  form: 'RegistrationsAddForm', 
})(
  QuickBook
)