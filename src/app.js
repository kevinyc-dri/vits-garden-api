const express = require('express')
const mongoose = require('mongoose')

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

const app = express() 

app.listen('5000', () => {
  console.log('App is listening on port 5000')
})

app.get('/', (req, res) => {
  res.send('Welcome to Vits Garden')
})