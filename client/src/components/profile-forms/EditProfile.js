import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
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

	// Load current profile and prefill form
	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])

	useEffect(() => {
		if (!loading && profile) {
			setFormData({
				company: profile.company || '',
				website: profile.website || '',
				location: profile.location || '',
				status: profile.status || '',
				skills: profile.skills ? profile.skills.join(', ') : '',
				githubusername: profile.githubusername || '',
				bio: profile.bio || '',
				twitter: profile.social?.twitter || '',
				facebook: profile.social?.facebook || '',
				linkedin: profile.social?.linkedin || '',
				youtube: profile.social?.youtube || '',
				instagram: profile.social?.instagram || '',
			})
		}
	}, [loading, profile])

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		createProfile(formData, navigate, true)
	}

	return (
		<section className='container'>
			<div className='form glass'>
				<h1 className='large text-primary'>Edit Your Profile</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Update your profile information
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
							value={formData.status}
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
							value={formData.company}
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
							value={formData.website}
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
							value={formData.location}
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
							value={formData.skills}
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
							value={formData.githubusername}
							onChange={onChange}
						/>
					</div>

					{/* Bio */}
					<div className='form-group'>
						<label htmlFor='bio'>Bio</label>
						<textarea
							placeholder='A short bio of yourself'
							name='bio'
							value={formData.bio}
							onChange={onChange}
						/>
					</div>

					{/* Toggle Social Links */}
					<div className='toggle-social'>
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
								<i className='fa-brands fa-x-twitter'></i>
								<input
									type='text'
									placeholder='X (formerly Twitter) URL'
									name='twitter'
									value={formData.twitter}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-facebook'></i>
								<input
									type='text'
									placeholder='Facebook URL'
									name='facebook'
									value={formData.facebook}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-youtube'></i>
								<input
									type='text'
									placeholder='YouTube URL'
									name='youtube'
									value={formData.youtube}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-linkedin'></i>
								<input
									type='text'
									placeholder='LinkedIn URL'
									name='linkedin'
									value={formData.linkedin}
									onChange={onChange}
								/>
							</div>
							<div className='form-group social-input'>
								<i className='fab fa-instagram'></i>
								<input
									type='text'
									placeholder='Instagram URL'
									name='instagram'
									value={formData.instagram}
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
							value='Save Changes'
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

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	EditProfile
)
