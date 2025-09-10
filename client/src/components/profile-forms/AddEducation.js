import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation }) => {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	const [toDateDisabled, toggleDisabled] = useState(false)

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onCheck = () => {
		setFormData({ ...formData, current: !current })
		toggleDisabled(!toDateDisabled)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		addEducation(formData, navigate)
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-graduation-cap'></i> Add any school or bootcamp you
				attended
			</p>
			<small>* = required field</small>

			<form
				className='form glass'
				onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School'
						name='school'
						value={school}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						value={degree}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={onChange}
					/>
				</div>
				<div className='form-group check-row'>
					<input
						type='checkbox'
						name='current'
						checked={current}
						onChange={onCheck}
					/>{' '}
					<label htmlFor='current'>Current School</label>
				</div>
				{!current && (
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={onChange}
							disabled={toDateDisabled}
						/>
					</div>
				)}
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Program Description'
						value={description}
						onChange={onChange}></textarea>
				</div>
				<div className='actions'>
					<input
						type='submit'
						className='btn btn-primary btn-pill'
						value='Add Education'
					/>
					<Link
						className='btn btn-light btn-pill'
						to='/dashboard'>
						Go Back
					</Link>
				</div>
			</form>
		</Fragment>
	)
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(AddEducation)
