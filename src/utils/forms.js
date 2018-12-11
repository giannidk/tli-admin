import React from 'react'

export function renderField(field) {
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

  export function renderCheckbox(field) {
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