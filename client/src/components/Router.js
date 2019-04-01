import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// 컴포넌트
import Download from '../routes/Download';
import Home from '../routes/Home';
import Login from '../routes/Login';
import Register from '../routes/Register';

const Router = ({ loading, isAuthenticated }) => (
	<BrowserRouter>
		<Route path="/:username/:flagname" exact component={Download} />
		{!loading && (
			<>
				{' '}
				{isAuthenticated ? (
					<Switch>
						<Route path="/" exact component={Home} />
						<Redirect from="*" to="/" />
					</Switch>
				) : (
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Redirect from="*" to="/" />
					</Switch>
				)}
			</>
		)}
	</BrowserRouter>
);

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated,
	loading: state.userReducer.loading,
});

export default connect(mapStateToProps)(Router);
