import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// 컴포넌트
import Download from '../routes/Download';
import Home from '../routes/Home';
import Login from '../routes/Login';
import Register from '../routes/Register';

const Router = ({ loading, isAuthenticated }) => (
	<>
		<Route path="/:username/:flagname" component={Download} />
		{!loading && (
			<>
				{isAuthenticated ? (
					<Switch>
						<Route path="/" exact component={Home} />
						<Redirect from="*" to="/" />
					</Switch>
				) : (
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/register" component={Register} />
						<Redirect from="*" to="/" />
					</Switch>
				)}
			</>
		)}
	</>
);

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated,
	loading: state.userReducer.loading,
});

export default connect(mapStateToProps)(Router);
