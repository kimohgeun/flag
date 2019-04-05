import React, { Component } from 'react';
import RegisterPresenter from './RegisterPresenter';
import { connect } from 'react-redux';
import { register } from '../../actions/userAction';
import { clearError } from '../../actions/errorAction';

class RegisterContainer extends Component {
	state = {
		username: '',
		password: '',
		passwordConfirm: '',
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		const { register, clearError } = this.props;
		register(username, password);
		clearError();
	};

	componentDidMount() {
		const { clearError } = this.props;
		clearError();
	}

	render() {
		const { username, password, passwordConfirm } = this.state;
		return (
			<RegisterPresenter
				username={username}
				password={password}
				passwordConfirm={passwordConfirm}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				err={this.props.err}
			/>
		);
	}
}

const mapStateToProps = state => ({
	err: state.errorReducer.err,
});

export default connect(
	mapStateToProps,
	{ register, clearError }
)(RegisterContainer);
