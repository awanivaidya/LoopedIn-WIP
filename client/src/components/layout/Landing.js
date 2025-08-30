import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return (
			<Navigate
				to='/dashboard/'
				replace
			/>
		)
	}

	return (
		<section className='landing'>
			<div className='landing-inner'>
				<span className='badge-pill gradient-frame'>Introducing ✧</span>

				<h1 className='display'>LoopedIn</h1>

				<p className='lead'>
					Create a developer profile/portfolio, share posts and get help from
					other developers
				</p>

				<div className='cta'>
					<Link
						to='/register'
						className='btn btn-primary btn-pill'>
						Sign Up
					</Link>
					<Link
						to='/login'
						className='btn btn-square btn-outline-purple'>
						Login
					</Link>
				</div>
			</div>
		</section>
	)
}

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
