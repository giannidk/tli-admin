import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClients } from '../../store/actions';
import { Spinner } from '../../components/main';

class ClientsList extends Component {
    
    componentWillMount() {    
        this.props.fetchClients();
    }

    renderList() {
        const { clients } = this.props;
            return _.map(clients, (client, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/clients/${key}`}>{client.clientName}</Link></td>
                    <td>{client.contactPerson}</td>
                    <td>{client.contactEmail}</td>
                    <td>{client.contactPhone}</td>
                </tr>
            );
        });
    }

    render() {   
        const { loading, error } = this.props;
        if( loading ) {
            return <Spinner />;
        }
        if( error ) {
            return (
                <div>
                    <PageHeader>Clients</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        return (
            <div>
            <PageHeader>Clients List</PageHeader>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Contact Person</th>
                    <th>Contact Email</th>
                    <th>Contact Phone</th>
                </tr>
                </thead>
                <tbody>                    
                {this.renderList()}                              
                </tbody>
            </Table>
            <hr />
                <Link to="/clients/add" className="btn btn-primary pull-right">Add Client</Link>
            </div>
        );
    }
}

function mapStateToProps({ clients }) {
    return { 
        loading: clients.loading,
        error: clients.error,
        clients: clients.list
    };
}

export default connect(mapStateToProps, { fetchClients })(ClientsList);
