import axios from 'axios'
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR } from './types'

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
