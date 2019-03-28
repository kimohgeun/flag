import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../routes/Login';
import Register from '../routes/Register';
import Home from '../routes/Home';

const Router = ({ loading, isAuthenticated }) => (
	<BrowserRouter>
		<>
			{!loading && (
				<>
					{!isAuthenticated ? (
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
	</BrowserRouter>
);

export default Router;
