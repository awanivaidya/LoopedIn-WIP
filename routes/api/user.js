const express = require('express')
const router = express.Router()
//@desc Register Users
router.post('/', (req, res) => {
  console.log(req.body)
  res.send('User route working')
})

module.exports = router
