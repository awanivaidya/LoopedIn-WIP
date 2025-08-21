const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MongoURI')

const connectDB = async () => {
  try {
    // Do NOT await here → prevents Express from hanging
    mongoose.connect(db, {
      // optional (not needed in latest drivers but safe)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB Connection Attempt Started...')

    // Event listeners for clarity
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB Connected')
    })

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`)
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
