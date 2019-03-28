import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';

class HomeContainer extends Component {
	render() {
		const { logout } = this.props;
		return <HomePresenter logout={logout} />;
	}
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ logout }
)(HomeContainer);
