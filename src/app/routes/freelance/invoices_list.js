import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchInvoices } from '../../actions';
import { Spinner } from '../../components/main';

class InvoicesList extends Component {
    componentWillMount() {
        this.props.fetchInvoices();
    }
    renderList() {
        const { invoices } = this.props;
        return _.map( invoices, (invoice, key) => {
            return (
                <tr key={key}>
                    <td><Link to={`/invoices/${key}`}>{key}</Link></td>
                </tr>
            );
        } ) 
            
    }
    render() {
        const { loading, error } = this.props;
        if( loading ) {
            return <Spinner />;
        }
        if( error ) {
            return (
                <div>
                    <PageHeader>Invoices</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
          
        return (
            <div>
                <PageHeader>Invoices</PageHeader>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
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

function mapStateToProps ({ invoices }) {
   return {
        invoices: invoices.list,
        loading: invoices.loading,
        error: invoices.error,
   }
}
export default connect (mapStateToProps, { fetchInvoices })(InvoicesList);
