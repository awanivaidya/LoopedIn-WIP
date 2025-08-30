import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PublicRoute = ({ auth: { isAuthenticated, loading } }) => {
	if (loading) return <div>Loading...</div>

	return isAuthenticated ? (
		<Navigate
			to='/dashboard'
			replace
		/>
	) : (
		<Outlet />
	)
}

PublicRoute.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(PublicRoute)
