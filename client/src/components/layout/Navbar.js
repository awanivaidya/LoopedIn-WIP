import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<div className='actions'>
				<Link
					to='/profiles'
					className='nav-link'>
					Developers
				</Link>
				<Link
					to='/dashboard'
					className='nav-link'>
					<i className='fas fa-user-alt' />
					Dashboard
				</Link>
				<a
					href='#!'
					onClick={logout}
					className='btn btn-square btn-outline-purple'>
					<i className='fas fa-sign-out-alt' /> Logout
				</a>
			</div>
		</ul>
	)

	const guestLinks = (
		<ul>
			<div className='actions'>
				<Link
					to='/profiles'
					className='nav-link'>
					Developers
				</Link>
				<Link
					to='/register'
					className='btn btn-square btn-outline-purple'>
					Sign Up
				</Link>
				<Link
					to='/login'
					className='btn btn-square btn-outline-purple'>
					Login
				</Link>
			</div>
		</ul>
	)

	return (
		<nav className='navbar'>
			<div className='container'>
				{/* Left side: Logo (keeps glowing pill) */}
				<div className='nav-left'>
					<h1>
						<Link
							to='/'
							className='logo gradient-frame'>
							<i className='fas fa-code' /> LoopedIn
						</Link>
					</h1>
				</div>

				{/* Right side: Conditional links */}
				{!loading && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				)}
			</div>
		</nav>
	)
}

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
