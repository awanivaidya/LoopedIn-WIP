const connectDB = require('./config/db')
const express = require('express')

const app = express()

connectDB()

app.use(express.json({ extended: false })) // <-- this must come BEFORE routes

app.get('/', (req, res) => res.send('API Running'))

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
