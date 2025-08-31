import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience }) => {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	const { company, title, location, from, to, current, description } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onCheck = () => setFormData({ ...formData, current: !current, to: '' }) // clear "to" when current job is selected

	const onSubmit = (e) => {
		e.preventDefault()
		addExperience(formData, navigate) // ✅ redirect after add
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>

			<form
				className='form glass'
				onSubmit={onSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						value={title}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						value={company}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
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
					<label htmlFor='current'>Current Job</label>
				</div>

				{/* Only show "To Date" if NOT current */}
				{!current && (
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={onChange}
						/>
					</div>
				)}

				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={onChange}></textarea>
				</div>

				<div className='actions'>
					<input
						type='submit'
						className='btn btn-primary btn-pill'
						value='Add Experience'
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

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(AddExperience)
