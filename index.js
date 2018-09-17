const express = require('express')
const cors = require('cors')
const parser = require('body-parser')

const profiles = require('./controllers/profiles')

const app = express()

app.use(parser.urlencoded({extended: true}))
app.use(parser.json())

const port = process.env.PORT || 3000

app.use(cors())
app.use('/profiles', profiles)

app.listen(port, () => {
  console.log(`Application is running on ${port}`)
})