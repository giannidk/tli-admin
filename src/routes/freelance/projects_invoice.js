import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Alert, Panel, Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectDetails, saveInvoice } from '../../redux/actions';
import { Spinner } from '../../components/main';
import { makeGross } from '../../helpers';

class ProjectsDetails extends Component {
    componentWillMount(){
        if(!this.props.projects){ 
            const { key } = this.props.match.params;
            this.props.projectDetails(key);
        }
    }
    renderRegistrations() {
      const { project, appData } = this.props;
      return _.map(project.registrations, (registration, key) => {
        if (registration.status === 'open') {
          return(
              <tr key={key}>
                  <td><Link to={`/registrations/${key}`}>{registration.name}</Link></td>
                  <td>{registration.total}</td>
                  <td>
                    {this.props.appData.VAT} %
                  </td>                 
                  <td>{makeGross(registration.total, appData.VAT)}</td>
              </tr>
          );
        }
      });
    }
    renderToInvoiceNet(){
      const { registrations } = this.props.project;
      let toInvoice = 0;  
      for (let reg in registrations) {
        if (registrations[reg].status === 'open') {
            toInvoice += parseFloat(registrations[reg].total)
        }
      }  
      return toInvoice;
    }
    renderToInvoiceTotal(){
      const { appData } = this.props;
      const { registrations } = this.props.project;
      let toInvoice = 0;  
      let toInvoiceTotal = 0;
      for (let reg in registrations) {
          if (registrations[reg].status === 'open') {
              toInvoice += parseFloat(registrations[reg].total)
          }
      }  
        toInvoiceTotal = makeGross(toInvoice, appData.VAT);
      return toInvoiceTotal;
    }

    onButtonPress(){
      const { registrations } = this.props.project;
      const filteredRegs = {};

      for( let key in registrations ){
        if(registrations[key].status !== 'invoiced'){
          filteredRegs[key] = registrations[key];
        }
      }

         _.map(filteredRegs, (registration, key) => {            
            registration.status = 'invoiced';            
        });  
      
        let invoice = {
        name: 'Invo name',
        project: this.props.match.params.key,
        registrations: filteredRegs
      }
      this.props.saveInvoice(invoice, () => {
        this.props.history.push('/invoices');
      });
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
                <PageHeader>{project.projectName} <small>Invoice</small></PageHeader>

                 <Panel>
                   <h4>Invoicing: {project.projectName}</h4>


                   <Table responsive>
                      <thead>                      
                      </thead>
                      <tbody>                    
                         <tr>
                           <td className="col-sm-6">
                             <div><strong>{appData.companyName}</strong></div>
                             <div>{appData.companyAddress}</div>
                             <div><strong>CVR nr.:</strong> {appData.companyCVR}</div>
                           </td>
                           <td className="col-sm-6">
                             <div><strong>{project.client}</strong></div>
                             <div>...</div>
                             <div><strong>CVR nr.:</strong>...</div>
                           </td>
                      </tr>                          
                      </tbody>
                      
                  </Table> 
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Net</th>
                        <th>VAT</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>                    
                    {this.renderRegistrations()}                              
                    </tbody>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{this.renderToInvoiceNet()}</th>
                        <th></th>
                        <th className="text-success">{this.renderToInvoiceTotal()}</th>
                      </tr>
                    </thead>
                </Table>                  
                </Panel>
                <Button bsStyle="success" className="pull-right" style={{marginLeft: '5px'}} onClick={this.onButtonPress.bind(this)}>Save Invoice</Button>
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

export default connect(mapStateToProps, { projectDetails, saveInvoice })(ProjectsDetails);
