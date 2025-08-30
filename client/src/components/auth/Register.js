import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})
	const [mismatch, setMismatch] = useState(false)

	const { name, email, password, password2 } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = async (e) => {
		e.preventDefault()
		if (password !== password2) {
			setMismatch(true)
			setAlert('Passwords do not match!', 'danger')
			return
		}
		setMismatch(false)
		register({ name, email, password })
	}

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />
	}
	return (
		<Fragment>
			<section className='container'>
				<h1 className='large text-primary'>Sign Up</h1>
				<p className='lead'>
					<i className='fas fa-user' /> Create Your Account
				</p>

				<form
					className='form'
					onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Name'
							name='name'
							value={name}
							onChange={onChange}
							//required
						/>
					</div>

					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={onChange}
							//required
						/>
						<small className='form-text'>
							This site uses Gravatar—use a Gravatar email for a profile image.
						</small>
					</div>

					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							//minLength='8'
							value={password}
							onChange={(e) => onChange(e)}
							//required
							className={mismatch ? 'is-invalid' : ''}
						/>
					</div>

					<div className='form-group'>
						<input
							type='password'
							placeholder='Confirm Password'
							name='password2'
							//minLength='8'
							value={password2}
							onChange={(e) => onChange(e)}
							//required
							className={mismatch ? 'is-invalid' : ''}
						/>
						{mismatch && (
							<div className='error-text'>Passwords do not match.</div>
						)}
					</div>

					<div className='actions'>
						<input
							type='submit'
							className='btn btn-primary'
							value='Register'
						/>
					</div>
				</form>

				<p className='my-1'>
					Already have an account?{' '}
					<Link
						to='/login'
						className='link-purple'>
						Sign In
					</Link>
				</p>
			</section>
		</Fragment>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setAlert, register })(Register)
