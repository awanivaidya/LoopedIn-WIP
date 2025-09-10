import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import PublicRoute from './components/routing/PublicRoute'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import Profiles from './components/profiles/Profiles'
import AddEducation from './components/profile-forms/AddEducation'
import Profile from './components/profile/Profile'
// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './App.css'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className='alert-container'>
					<Alert />
				</div>
				<Routes>
					<Route
						path='/'
						element={<Landing />}
					/>

					<Route
						path='/profiles'
						element={<Profiles />}
					/>
					<Route
						path='/profile/:id'
						element={<Profile />}
					/>

					<Route element={<PublicRoute />}>
						<Route
							path='/register'
							element={<Register />}
						/>
						<Route
							path='/login'
							element={<Login />}
						/>
					</Route>

					<Route element={<PrivateRoute />}>
						<Route
							path='/dashboard'
							element={<Dashboard />}
						/>
						<Route
							path='/create-profile'
							element={<CreateProfile />}
						/>
						<Route
							path='/edit-profile'
							element={<EditProfile />}
						/>
						<Route
							path='/add-experience'
							element={<AddExperience />}
						/>
						<Route
							path='/add-education'
							element={<AddEducation />}
						/>
					</Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
