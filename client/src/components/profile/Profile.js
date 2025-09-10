import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getProfileByID } from '../../actions/profile'

import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({ getProfileByID, profile: { profile, loading }, auth }) => {
	const { id } = useParams()

	useEffect(() => {
		getProfileByID(id)
	}, [getProfileByID, id])

	if (loading || profile === null) {
		return <Spinner />
	}

	return (
		<Fragment>
			<div className='profile-grid my-1'>
				<ProfileTop profile={profile} />
				<ProfileAbout profile={profile} />
			</div>

			<div className='profile-grid my-1'>
				<div className='profile-exp bg-white p-2'>
					<h2 className='text-primary'>Experience</h2>
					{profile.experience.length > 0 ? (
						<Fragment>
							{profile.experience.map((experience) => (
								<ProfileExperience
									key={experience._id}
									experience={experience}
								/>
							))}
						</Fragment>
					) : (
						<h4>No experience credentials</h4>
					)}
				</div>

				<div className='profile-edu bg-white p-2'>
					<h2 className='text-primary'>Education</h2>
					{profile.education.length > 0 ? (
						<Fragment>
							{profile.education.map((education) => (
								<ProfileEducation
									key={education._id}
									education={education}
								/>
							))}
						</Fragment>
					) : (
						<h4>No education credentials</h4>
					)}
				</div>

				{profile.githubusername && (
					<ProfileGithub username={profile.githubusername} />
				)}
			</div>

			{auth.isAuthenticated &&
				!auth.loading &&
				auth.user._id === profile.user._id && (
					<Link
						to='/edit-profile'
						className='btn btn-dark'>
						Edit Profile
					</Link>
				)}

			<Link
				to='/profiles'
				className='btn btn-primary'>
				Back to profiles
			</Link>
		</Fragment>
	)
}

Profile.propTypes = {
	getProfileByID: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
})

export default connect(mapStateToProps, { getProfileByID })(Profile)
