import React, { Component } from 'react';
import { PageHeader, Alert, Table, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registrationDetails, registrationDelete } from '../../redux/actions';
import { Spinner } from '../../components/main';

class RegistrationsDetails extends Component {

    componentWillMount(){
        //if(!this.props.registrations){ 
            const { key } = this.props.match.params;
            this.props.registrationDetails(key);
        //}
    }
    onDeleteClick() {
        const { key } = this.props.match.params;
        const { project } = this.props.registration;
        console.log(this.props.registration.project);
        this.props.registrationDelete(key, project, ( () => {
            this.props.history.push('/registrations');
        }));
    }
    render() {
        const { registration, error } = this.props;
        if( error ) {
            return (
                <div>
                    <PageHeader>Registration Details</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        if (!registration) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{registration.name} <small>details</small></PageHeader>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th colSpan="2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-sm-2">Project</td>
                            <td className="col-sm-10">{registration.project}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{registration.description}</td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td>{registration.shortDate}</td>
                        </tr>
                        <tr>
                            <td>Time:</td>
                            <td>{registration.hours}:{registration.minutes}</td>
                        </tr>
                        <tr>
                            <td>Price per hour:</td>
                            <td>{registration.price}</td>
                        </tr>
                        <tr>
                            <td>Total (DKK):</td>
                            <td>{registration.total}</td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>
                                 <Label bsStyle={(registration.status === 'open' ? 'warning' : 'success')}>
                                    {registration.status}
                                </Label>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <hr />                
                <Link to="/registrations" className="btn btn-primary">Back to Registrations</Link>
                <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger pull-right" style={{marginLeft: '5px'}}
                >Delete</button>
                <Link to={`/registrations/edit/${this.props.match.params.key}`} className="btn btn-primary pull-right">Edit Registration</Link>      
            </div>
        );  
    }
}

function mapStateToProps({registrations}, ownProps) {
    return {
        loading: registrations.loading,
        error: registrations.error, 
        registration: registrations[ownProps.match.params.key],
    }
}

export default connect(mapStateToProps, { registrationDetails, registrationDelete })(RegistrationsDetails);
