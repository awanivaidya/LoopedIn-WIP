import axios from 'axios'
import { setAlert } from './alert'
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	DELETE_ACCOUNT,
	CLEAR_PROFILE,
	GET_PROFILES,
	GET_REPOS,
} from './types'

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me')

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText || err.message,
				status: err.response?.status || 500,
			},
		})
	}
}

// get all profiles

export const getProfiles = () => async (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	})

	try {
		const res = await axios.get('/api/profile')

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText || err.message,
				status: err.response?.status || 500,
			},
		})
	}
}

// get profile by user id
export const getProfileByID = (userID) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userID}`)

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText || err.message,
				status: err.response?.status || 500,
			},
		})
	}
}

// get github repos
export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`)

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText || err.message,
				status: err.response?.status || 500,
			},
		})
	}
}

// Create or update profile
export const createProfile =
	(formData, navigate, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const res = await axios.post('/api/profile', formData, config)

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})

			dispatch(
				setAlert(edit ? 'Profile updated' : 'Profile created', 'success')
			)

			navigate('/dashboard')
		} catch (err) {
			const errors = err?.response?.data?.errors
			if (Array.isArray(errors)) {
				errors.forEach((e) => e?.msg && dispatch(setAlert(e.msg, 'danger')))
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response?.statusText || err.message,
					status: err.response?.status || 500,
				},
			})
		}
	}

// Add experience
export const addExperience = (formData, navigate) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const res = await axios.put('/api/profile/experience', formData, config)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Experience added', 'success'))

		navigate('/dashboard')
	} catch (err) {
		const errors = err?.response?.data?.errors
		if (Array.isArray(errors)) {
			errors.forEach((e) => e?.msg && dispatch(setAlert(e.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText || err.message,
				status: err.response?.status || 500,
			},
		})
	}
}

// Add education
export const addEducation = (formData, navigate) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const res = await axios.put('/api/profile/education', formData, config)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Education added', 'success'))

		navigate('/dashboard')
	} catch (err) {
		const errors = err?.response?.data?.errors
		if (Array.isArray(errors)) {
			errors.forEach((e) => e?.msg && dispatch(setAlert(e.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response?.statusText || err.message,
				status: err.response?.status || 500,
			},
		})
	}
}
//delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`)
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Experience Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}

//delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`)
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		})

		dispatch(setAlert('Education Removed', 'success'))
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
//delete account and profile
export const deleteAccount = (id) => async (dispatch) => {
	if (window.confirm('Are you sure? This cannot be undone!')) {
		try {
			const res = await axios.delete(`/api/profile`)
			dispatch({ type: CLEAR_PROFILE })
			dispatch({ type: DELETE_ACCOUNT })
			dispatch(setAlert('Your account has been permamnently deleted'))
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}
	}
}
