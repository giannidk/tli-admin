import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Alert, Table, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectDetails } from '../../actions';
import { Spinner } from '../../components/main';
import { makeGross } from '../../helpers';

class ProjectsDetails extends Component {
    componentWillMount(){
        if(!this.props.pojects){ 
            const { key } = this.props.match.params;
            this.props.projectDetails(key);
        }
    }
    renderRegistrations() {
        const { appData, project } = this.props;
        return _.map(project.registrations, (registration, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/registrations/${key}`}>{registration.name}</Link></td>
                    <td>{registration.total}</td>
                    <td>{makeGross(registration.total, appData.VAT)}</td>
                    <td>
                      <Label bsStyle={(registration.status === 'open' ? 'warning' : 'success')}>
                          {registration.status}
                      </Label>
                    </td>
                </tr>
            );
        });
    }
    renderTotalStatus(){
      const { appData} = this.props;
      const { registrations } = this.props.project;
      let invoiced = 0; 
      let toInvoice = 0;   
      for (let reg in registrations) {
          if (registrations[reg].status === 'open') {
              toInvoice += parseFloat(registrations[reg].total)
          } else {
              invoiced += parseFloat(registrations[reg].total)
          }
      }  
      return(
        <div>
          <div className="text-success">{`Total invoiced: ${invoiced}`}</div>
          <div className="text-warning">{`Total to invoice: ${toInvoice} (${makeGross(toInvoice, appData.VAT)} gross)`}</div>
        </div>
      );
    }
    render() {
        const { appData, project, error } = this.props;
        if( error ) {
            return (
                <div>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        if (!project) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{project.projectName} </PageHeader>
                <h4>Project description:</h4>
                <div>{project.projectDescription}</div>
                <hr />
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Registrations for this project</th>
                        <th>Net ({appData.currency})</th>
                        <th>Total ({appData.currency})</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>                    
                    {this.renderRegistrations()}                              
                    </tbody>
                </Table>
                <hr />
                {this.renderTotalStatus()}
                <hr />
                <Link to="/projects" className="btn btn-primary">Projects list</Link>                
                <Link to={`/projects/${this.props.match.params.key}/invoice`} className="btn btn-success pull-right" style={{marginLeft: '5px'}}>Invoice Open Registrations</Link>                
                <Link to={`/registrations/add/${this.props.match.params.key}`} className="btn btn-primary pull-right">
                  Add Registration
                </Link>                
            </div>
        );
    }
}

function mapStateToProps({ projects, appData }, ownProps) {
    return { 
        project: projects[ownProps.match.params.key],
        error: projects.error, 
        appData
    };
}

export default connect(mapStateToProps, { projectDetails })(ProjectsDetails);
