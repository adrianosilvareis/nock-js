const { HttpClient } = require('./http')
const express = require('express');
const app = express();

HttpClient.start('https://jsonplaceholder.typicode.com')

app.get('/', async (req, res) => {
  try {
    const response = await HttpClient.get('/todos/1')
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

module.exports = app