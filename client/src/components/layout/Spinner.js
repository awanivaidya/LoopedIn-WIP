import React from 'react'
import spinner from './loading.gif' // make sure to add spinner.gif in the same folder

const Spinner = () => (
	<div style={{ textAlign: 'center', marginTop: '4rem' }}>
		<img
			src={spinner}
			style={{ width: '80px' }}
			alt='Loading...'
		/>
	</div>
)

export default Spinner
