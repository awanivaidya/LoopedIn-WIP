const connectDB = require('./config/db')
const express = require('express')
const cors = require('cors')

const app = express()

connectDB()

app.use(express.json()) // no need for { extended: false } for JSON

// CORS for your React app on 3000
app.use(
	cors({
		origin: 'http://localhost:3000',
		// credentials: true, // enable if you use cookies/sessions
	})
)

// optional: explicitly handle preflight (cors() already does this, but this is fine)
app.options(
	'*',
	cors({
		origin: 'http://localhost:3000',
		// credentials: true,
	})
)

app.get('/', (req, res) => res.send('API Running'))

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
