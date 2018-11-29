import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../redux/actions';
import { Spinner } from '../../components/main';

class ProjectsList extends Component {
    
    componentWillMount() {    
        this.props.fetchProjects();
    }

    renderList() {
        const { projects } = this.props;
        return _.map(projects, (project, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/projects/${key}`}>{project.projectName}</Link></td>
                    <td>{project.projectDescription}</td>
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
                    <PageHeader>Projects List</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        return (
            <div>
            <PageHeader>Projects</PageHeader>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th className="col-sm-4">Project Name</th>
                    <th className="col-sm-8">Project Description</th>
                </tr>
                </thead>
                <tbody>                    
                {this.renderList()}                              
                </tbody>
            </Table>
            </div>
        );
    }
}

function mapStateToProps({ projects }) {
    return { 
        loading: projects.loading,
        error: projects.error,
        projects: projects.list
    };
}

export default connect(mapStateToProps, { fetchProjects })(ProjectsList);
