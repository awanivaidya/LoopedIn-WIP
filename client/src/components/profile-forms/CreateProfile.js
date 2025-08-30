import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createProfile } from '../../actions/profile'

const CreateProfile = ({ createProfile }) => {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
	})

	const [displaySocialInputs, toggleSocialInputs] = useState(false)

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		createProfile(formData, navigate) // ✅ correct state
	}

	return (
		<section className='container'>
			<div className='form glass'>
				<h1 className='large text-primary'>Create Your Profile</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Let&apos;s get some information to
					make your profile stand out!
				</p>
				<small className='text-muted'>* = required field</small>

				<form
					className='form-content'
					onSubmit={onSubmit}>
					{/* Status */}
					<div className='form-group'>
						<label htmlFor='status'>Professional Status *</label>
						<select
							name='status'
							value={status}
							onChange={onChange}
							required>
							<option value='0'>Select Professional Status</option>
							<option value='Developer'>Developer</option>
							<option value='Junior Developer'>Junior Developer</option>
							<option value='Senior Developer'>Senior Developer</option>
							<option value='Manager'>Manager</option>
							<option value='Student or Learning'>Student or Learning</option>
							<option value='Instructor'>Instructor or Teacher</option>
							<option value='Intern'>Intern</option>
							<option value='Other'>Other</option>
						</select>
					</div>

					{/* Company */}
					<div className='form-group'>
						<label htmlFor='company'>Company</label>
						<input
							type='text'
							placeholder='Company'
							name='company'
							value={company}
							onChange={onChange}
						/>
					</div>

					{/* Website */}
					<div className='form-group'>
						<label htmlFor='website'>Website</label>
						<input
							type='text'
							placeholder='Website'
							name='website'
							value={website}
							onChange={onChange}
						/>
					</div>

					{/* Location */}
					<div className='form-group'>
						<label htmlFor='location'>Location</label>
						<input
							type='text'
							placeholder='City & State (eg. Boston, MA)'
							name='location'
							value={location}
							onChange={onChange}
						/>
					</div>

					{/* Skills */}
					<div className='form-group'>
						<label htmlFor='skills'>Skills *</label>
						<input
							type='text'
							placeholder='HTML, CSS, JavaScript'
							name='skills'
							value={skills}
							onChange={onChange}
						/>
						<small className='form-text'>
							Comma separated values (eg. HTML,CSS,JavaScript)
						</small>
					</div>

					{/* Github */}
					<div className='form-group'>
						<label htmlFor='githubusername'>Github Username</label>
						<input
							type='text'
							placeholder='Github Username'
							name='githubusername'
							value={githubusername}
							onChange={onChange}
						/>
					</div>

					{/* Bio */}
					<div className='form-group'>
						<label htmlFor='bio'>Bio</label>
						<textarea
							placeholder='A short bio of yourself'
							name='bio'
							value={bio}
							onChange={onChange}
						/>
					</div>

					{/* Toggle Social Links */}
					<div className='my-2 d-flex align-items-center gap-2'>
						<button
							type='button'
							className='btn btn-outline-purple btn-pill'
							onClick={() => toggleSocialInputs(!displaySocialInputs)}>
							{displaySocialInputs
								? 'Hide Social Network Links'
								: 'Add Social Network Links'}
						</button>
						<span className='text-muted'>Optional</span>
					</div>

					{/* Social Inputs */}
					{displaySocialInputs && (
						<div className='social-inputs'>
							<div className='form-group social-input'>
								<i className='fab fa-twitter'></i>
								<input
									type='text'
									placeholder='Twitter URL'
									name='twitter'
									value={twitter}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-facebook'></i>
								<input
									type='text'
									placeholder='Facebook URL'
									name='facebook'
									value={facebook}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-youtube'></i>
								<input
									type='text'
									placeholder='YouTube URL'
									name='youtube'
									value={youtube}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-linkedin'></i>
								<input
									type='text'
									placeholder='LinkedIn URL'
									name='linkedin'
									value={linkedin}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-instagram'></i>
								<input
									type='text'
									placeholder='Instagram URL'
									name='instagram'
									value={instagram}
									onChange={onChange}
								/>
							</div>
						</div>
					)}

					{/* Submit + Back */}
					<div className='actions'>
						<input
							type='submit'
							className='btn btn-primary btn-pill'
							value='Submit'
						/>
						<Link
							className='btn btn-light btn-pill'
							to='/dashboard'>
							Go Back
						</Link>
					</div>
				</form>
			</div>
		</section>
	)
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(CreateProfile)
