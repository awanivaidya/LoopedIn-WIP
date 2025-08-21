const connectDB = require('./config/db')
const express = require('express')

const app = express()

connectDB()

app.use(express.json()) // <-- this must come BEFORE routes

app.get('/', (req, res) => res.send('API Running'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
