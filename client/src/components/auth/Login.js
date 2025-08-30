// src/components/auth/Login.js
import React, { Fragment, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated, loading }) => {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const { email, password } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })
	const onSubmit = (e) => {
		e.preventDefault()
		login(email, password)
	}

	// ✅ redirect only after loading finishes
	if (!loading && isAuthenticated) {
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		)
	}

	return (
		<Fragment>
			<section className='container'>
				<h1 className='large text-primary'>Sign In</h1>
				<p className='lead'>
					<i className='fas fa-user' /> Sign Into Your Account
				</p>

				<form
					className='form'
					onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							minLength='8'
							value={password}
							onChange={onChange}
							required
						/>
					</div>
					<div className='actions'>
						<input
							type='submit'
							className='btn btn-primary'
							value='Login'
						/>
					</div>
				</form>

				<p className='my-1'>
					Don&apos;t have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</section>
		</Fragment>
	)
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
})

export default connect(mapStateToProps, { login })(Login)
