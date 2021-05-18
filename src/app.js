require('./models/UserModel')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')

const User = mongoose.model('User')

app.use(cors())
app.use(bodyParser.json())
// app.use(authRoutes)
const mongoUri =
  'mongodb+srv://admin:P@ssword@cluster0.xgnqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err)
})
app.listen('5000', () => {
  console.log('App is listening on port 5000')
})
app.get('/', (req, res) => {
  res.send('Welcome to Vits Garden')
})
app.get('/users', (req, res) => {
  User.find().then((allUsers) => res.status(200).json(allUsers))
})
app.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body
  const user = new User({ email, password, firstName, lastName })
  user
    .save()
    .then(() => {
      res.status(200).send('user was added')
    })
    .catch((err) => console.log(err))
})
app.post('/signin', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email })
    .then((userExists) => {
      // check if email and password is in object
      if (!email || !password) {
        return res
          .status(422)
          .send({ error: 'Must Provide email and password ' })
      }
      // check if email exists in db
      if (!userExists) {
        return res.status(404).send({ error: 'User not found' })
      }
    })
    .catch((err) => console.log(err))
})
