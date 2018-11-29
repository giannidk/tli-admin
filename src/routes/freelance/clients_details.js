import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clientDetails, clientDelete } from '../../redux/actions';
import { Spinner } from '../../components/main';

class ClientsDetails extends Component {
    componentWillMount(){
        if(!this.props.clients){ 
            const { key } = this.props.match.params;
            this.props.clientDetails(key);
        }
    }
    onDeleteClick() {
        const { key } = this.props.match.params;
        this.props.clientDelete(key, ( () => {
            this.props.history.push('/clients');
        }));
    }
    renderProjects(){
        const { projects } = this.props.client;
          return _.map(projects, (project, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/projects/${key}`}>{project.projectName}</Link></td>
                </tr>
            );
        });  
    }
    render() {
        const { client, error } = this.props;
        //console.log(client);
        if( error ) {
            return (
                <div>
                    <PageHeader>Projects List</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        if (!client) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{this.props.client.clientName} </PageHeader>
                <h4>{client.contactPerson}</h4>
                <div><strong>@:</strong> {client.contactEmail}</div>
                <div><strong>Tlf.:</strong> {client.contactPhone}</div>                
                <hr />
                    <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Projects</th>
                </tr>
                </thead>
                <tbody>   
                 {this.renderProjects()}                               
                </tbody>
            </Table>
                <hr />
                <Link to="/clients" className="btn btn-primary">Clients list</Link>
                <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger"
                >Delete</button>
            </div>
        );
    }
}

function mapStateToProps({ clients }, ownProps) {
    return { 
        client: clients[ownProps.match.params.key],
        error: clients.error, 
    };
}

export default connect(mapStateToProps, { clientDetails, clientDelete })(ClientsDetails);
