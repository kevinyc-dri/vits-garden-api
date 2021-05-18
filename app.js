const express = require('express')

const app = express() 

app.listen('5000', () => {
  console.log('App is listening on port 5000')
})

app.get('/', (req, res) => {
  res.send('Welcome to Vits Garden')
})