const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MongoURI')

const connectDB = async () => {
  try {
    // Use await to ensure the connection is established or fails here
    // The old options are no longer needed with modern Mongoose
    await mongoose.connect(db)
    console.log('MongoDB Connected...')
  } catch (err) {
    // This will now correctly catch any initial connection error
    console.error('Database connection failed:', err.message)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
