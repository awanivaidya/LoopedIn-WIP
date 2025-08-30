import { Link } from 'react-router-dom'
import React from 'react'

const DashboardActions = () => {
	return (
		<div className='dashboard-actions card glass'>
			<div className='actions-grid'>
				<Link
					to='/edit-profile'
					className='btn btn-outline-purple btn-square'>
					<i className='fas fa-user-circle'></i>
					<span>Edit Profile</span>
				</Link>

				<Link
					to='/add-experience'
					className='btn btn-outline-purple btn-square'>
					<i className='fab fa-black-tie'></i>
					<span>Add Experience</span>
				</Link>

				<Link
					to='/add-education'
					className='btn btn-outline-purple btn-square'>
					<i className='fas fa-graduation-cap'></i>
					<span>Add Education</span>
				</Link>
			</div>
		</div>
	)
}

export default DashboardActions
