import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
	const Component = props.component;
	const isAuthenticated = props.isAuthenticated;

	return isAuthenticated ? (
		<Component />
	) : (
		<Redirect to={{ pathname: '/signin' }} />
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
