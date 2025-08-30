// src/components/routing/PrivateRoute.js
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
	if (loading) {
		return <div>Loading...</div> // Or spinner
	}

	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			replace
		/>
	)
}

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
