import React, { Component } from 'react';
import HomePresenter from './HomePresenter';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';

class HomeContainer extends Component {
	state = {
		disabled: false,
		flag: '',
	};

	displayName = () => {
		document.querySelector('#file_name').value = document.querySelector('#file_input').value;
		this.setState({
			disabled: true,
		});
	};

	onChange = e => {
		this.setState({
			flag: e.target.value,
		});
	};

	render() {
		const { disabled, flag } = this.state;
		const { logout } = this.props;
		return (
			<HomePresenter
				disabled={disabled}
				flag={flag}
				onChange={this.onChange}
				displayName={this.displayName}
				logout={logout}
			/>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ logout }
)(HomeContainer);
