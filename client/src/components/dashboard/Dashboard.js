import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'

const Dashboard = ({
	getCurrentProfile,
	auth,
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])

	if (loading && profile === null) {
		return <Spinner />
	}

	return (
		<Fragment>
			<section className='dashboard container'>
				<h1 className='large text-primary'>Dashboard</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Welcome, {auth.user && auth.user.name}
					!
				</p>

				{profile !== null ? (
					<Fragment>
						<DashboardActions />
					</Fragment>
				) : (
					<Fragment>
						<div className='glass card no-profile'>
							<p>You have not yet set up a profile. Create a profile now!</p>
							<Link
								to='/create-profile'
								className='btn btn-primary btn-pill my-1'>
								Create Profile
							</Link>
						</div>
					</Fragment>
				)}
			</section>
		</Fragment>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
