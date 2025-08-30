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

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './App.css'

// Set auth token for axios if it exists
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
					{/* Public landing page */}
					<Route
						path='/'
						element={<Landing />}
					/>

					{/* Auth pages only for guests */}
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

					{/* Private routes only for logged-in users */}
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
					</Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
