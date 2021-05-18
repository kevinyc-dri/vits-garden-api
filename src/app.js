require('./models/UserModel')
const express = require('express')
const mongoose = require('mongoose')
const app = express() 
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')

const User = mongoose.model('User')

app.use(bodyParser.json())
// app.use(authRoutes)

const mongoUri = 'mongodb+srv://admin:Wx6QDK9GxIb5WMxX@cluster0.xgnqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {} )

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo')
})

mongoose.connection.on('error', (err) => {
  console.log('Error connection to mongo', err)
})


app.listen('5000', () => {
  console.log('App is listening on port 5000')
})

app.get('/', (req, res) => {
  res.send('Welcome to Vits Garden')
})

app.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const user = new User({ email, password, firstName, lastName })

  user
    .save()
    .then(() => {
      res.status(200).send('user was added')
      console.log('user was saved in db')
  }).catch(err => console.log(err))
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body
  
  User
    .findOne({ email: email })
    .then(userExists => {
      // check if email exists in db
      if(!userExists){
        return res.status(400).send({error: 'User not found'})
      } 
      // check if email and password is in object
      if(!email || !password)
      return res.status(422).send({error: 'Must Provide email and password'})
    })
    .catch(err => console.log(err))

})