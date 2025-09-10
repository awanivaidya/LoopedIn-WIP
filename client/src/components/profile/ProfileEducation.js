import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({
	education: { school, degree, fieldofstudy, current, to, from, description },
}) => (
	<div>
		<h3 className='text-dark'>{school || 'Unknown School'}</h3>
		<p>
			{from ? <Moment format='YYYY/MM/DD'>{from}</Moment> : 'N/A'} -{' '}
			{current ? 'Now' : to ? <Moment format='YYYY/MM/DD'>{to}</Moment> : 'N/A'}
		</p>
		{degree && (
			<p>
				<strong>Degree: </strong> {degree}
			</p>
		)}
		{fieldofstudy && (
			<p>
				<strong>Field Of Study: </strong> {fieldofstudy}
			</p>
		)}
		{description && (
			<p>
				<strong>Description: </strong> {description}
			</p>
		)}
	</div>
)

ProfileEducation.propTypes = {
	education: PropTypes.shape({
		school: PropTypes.string,
		degree: PropTypes.string,
		fieldofstudy: PropTypes.string,
		current: PropTypes.bool,
		from: PropTypes.string,
		to: PropTypes.string,
		description: PropTypes.string,
	}),
}

export default ProfileEducation
