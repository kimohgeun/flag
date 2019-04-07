import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// 컴포넌트
import Download from '../routes/Download';
import Home from '../routes/Home';
import Login from '../routes/Login';
import Register from '../routes/Register';
import NotFound from './NotFound';

const Router = ({ loading, isAuthenticated }) => (
	<BrowserRouter>
		<Switch>
			{!loading && (
				<>
					{isAuthenticated ? (
						<Switch>
							<Route path="/" exact component={Home} />
							<Redirect form="/login" to="/" />
							<Redirect form="/register" to="/" />
						</Switch>
					) : (
						<Switch>
							<Route path="/" exact component={Login} />
							<Route path="/login" exact component={Login} />
							<Route path="/register" component={Register} />
						</Switch>
					)}
				</>
			)}
			<Route path="/" exact to="/" />
			<Route path="/login" to="/" />
			<Route path="/register" to="/" />
			<Route path="/:username/:flagname" exact component={Download} />
			<Route path="*" component={NotFound} />
		</Switch>
	</BrowserRouter>
);

const mapStateToProps = state => ({
	isAuthenticated: state.userReducer.isAuthenticated,
	loading: state.userReducer.loading,
});

export default connect(mapStateToProps)(Router);
