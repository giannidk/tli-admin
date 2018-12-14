import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Alert } from 'react-bootstrap'
import { fetchTeachers } from '../store/actions';
import { Spinner } from '../components/main';
import { Card, ViewTypeSwitch } from '../components'
import { viewTypes } from '../constants/'


class Teachers extends Component {

	state = {
		viewType: 'cards'
	}

	componentWillMount() {
		this.props.fetchTeachers()
	}

	changeViewType(viewType){
		this.setState({viewType})

	}

	renderTeachers() {
		const { teachers } = this.props;
		const options = Object.entries(teachers).map((element, key) => {
			if (this.state.viewType === viewTypes.cards) {
				return (<Col key={key} xs={12} sm={6} md={3}>
					<Card data={{ ...element[1], id: element[0] }} />
				</Col>)
			} else {
				const teacher = { ...element[1], id: element[0] }
				return (<ListGroupItem key={key} header={`${teacher.first_name} ${teacher.last_name}`} href={`/teachers/${teacher.id}`}>
					{teacher.chinese_last_name} {teacher.chinese_name}
				</ListGroupItem>)
			}
		})
		return this.state.viewType === viewTypes.cards
			? options
			: <ListGroup>{options}</ListGroup>
	}

	render() {
		const { loading, error, teachers } = this.props
		if (loading) {
			return <Spinner />;
		}

		return (
			<Fragment>
				<Row>
					<Col xs={12}>
					<ViewTypeSwitch 
						onClick={(viewType) => this.changeViewType(viewType)}
						currentSelectedView={this.state.viewType}
					/>
					</Col>
				</Row>
				<Row>
				<Col xs={12}>
					{error && <Alert bsStyle="danger">
						<p>{error}</p>
					</Alert>}
					{teachers && this.renderTeachers()}
					</Col>
				</Row>
			</Fragment>
		)
	}
}


function mapStateToProps({ teachers }) {
	return {
		loading: teachers.loading,
		error: teachers.error,
		teachers: teachers.list,
	};
}

export default connect(mapStateToProps, { fetchTeachers })(Teachers);