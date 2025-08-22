const jwt = require('jsonwebtoken')
const config = require('config')

const payload = { user: { id: '12345' } }
const secret = config.get('jwtSecret')
console.log('Secret:', secret)

const token = jwt.sign(payload, secret, { expiresIn: 360000 })
console.log('Token:', token)
