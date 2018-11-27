import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRegistrations } from '../../actions';
import { Spinner } from '../../components/main';
import { makeGross } from '../../helpers';

class RegistrationsList extends Component {
    componentWillMount() {
      this.props.fetchRegistrations();
    }
    renderRegistrations(project){
      const { appData } = this.props;        
      return _.map(project, (registration, key) => {
          if(registration){
            return (
          <tr key={key}>
            <td className="col-sm-4">
              <Link to={`/registrations/${key}`}> {registration.name} </Link>
            </td>            
            <td className="col-sm-4">{registration.shortDate}</td>
            <td className="col-sm-1">{registration.hours}:{registration.minutes}</td>
            <td className="col-sm-1">{registration.total}</td>
            <td className="col-sm-1">{makeGross(registration.total, appData.VAT)}</td>
            <td  className="col-sm-1">
              <Label bsStyle={(registration.status === 'open' ? 'warning' : 'success')}>
                  {registration.status}
              </Label>
            </td>
          </tr>                    
        );
          }
      });
    }
    renderList() {
      const { registrations } = this.props;        
        return _.map( registrations, (project, key) => {
          return (
              <Table striped bordered hover responsive key={key}>
              <thead>
                  <tr><th colSpan="6">{key}</th></tr>
                    <tr style={{background: '#FFF'}}>
                      <th className="col-sm-4">name</th>
                      <th className="col-sm-4">date</th>
                      <th className="col-sm-1">time</th>
                      <th className="col-sm-1">net</th>
                      <th className="col-sm-1">total</th>
                      <th className="col-sm-1">status</th>
                    </tr>
              </thead>
              <tbody>
                {this.renderRegistrations(project)} 
              </tbody>
          </Table>
          );
        }) 
            
    }
    render() {
        const { loading, error } = this.props;
        if( loading ) {
            return <Spinner />;
        }
        if( error ) {
            return (
                <div>
                    <PageHeader>Registrations</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        return (
            <div>
                <PageHeader>Registrations</PageHeader>
               <div>
                 {this.renderList()}
               </div>
                <hr />
                <Link to="/registrations/add" className="btn btn-primary pull-right">Add Registration</Link>
            </div>
        );
    }
}

function mapStateToProps ({ registrations, appData }) {
   return {
        registrations: registrations.list,
        loading: registrations.loading,
        error: registrations.error,
        appData
   }
}
export default connect (mapStateToProps, { fetchRegistrations })(RegistrationsList);
