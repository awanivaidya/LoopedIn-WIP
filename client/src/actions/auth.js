// src/actions/auth.js
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_PROFILE,
} from './types'
import { setAlert } from './alert'

// Load User
export const loadUser = () => async (dispatch) => {
	const token = localStorage.getItem('token')
	if (token) setAuthToken(token)

	try {
		const res = await axios.get('/api/auth') // <-- leading slash
		dispatch({ type: USER_LOADED, payload: res.data })
	} catch (err) {
		// clear default header if invalid/expired token
		setAuthToken(null)
		dispatch({ type: AUTH_ERROR })
	}
}

// Register user
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		try {
			const res = await axios.post(
				'/api/user',
				{ name, email, password },
				{ headers: { 'Content-Type': 'application/json' } }
			)

			dispatch({ type: REGISTER_SUCCESS, payload: res.data }) // expect { token }
			dispatch(loadUser())
		} catch (err) {
			const errors = err?.response?.data?.errors
			if (Array.isArray(errors)) {
				errors.forEach((e) => e?.msg && dispatch(setAlert(e.msg, 'danger')))
			} else {
				const fallback =
					err?.response?.data?.message || err?.message || 'Registration failed'
				dispatch(setAlert(fallback, 'danger'))
			}
			dispatch({ type: REGISTER_FAIL })
		}
	}

// Login user
export const login = (email, password) => async (dispatch) => {
	try {
		const res = await axios.post(
			'/api/auth',
			{ email, password },
			{ headers: { 'Content-Type': 'application/json' } }
		)

		dispatch({ type: LOGIN_SUCCESS, payload: res.data }) // expect { token }
		dispatch(loadUser())
	} catch (err) {
		const errors = err?.response?.data?.errors
		if (Array.isArray(errors)) {
			errors.forEach((e) => e?.msg && dispatch(setAlert(e.msg, 'danger')))
		} else {
			const fallback =
				err?.response?.data?.message || err?.message || 'Login failed'
			dispatch(setAlert(fallback, 'danger'))
		}
		dispatch({ type: LOGIN_FAIL })
	}
}

//LOGOUT, CLEAR PROFILE

export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE })
	dispatch({ type: LOGOUT })
}
