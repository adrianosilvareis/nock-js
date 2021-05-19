const { HttpClient } = require('./http')
const { logger } = require('./logger')
const express = require('express');
const app = express();

HttpClient.start('https://jsonplaceholder.typicode.com')

app.get('/', async (req, res) => {
  try {
    const response = await HttpClient.get('/todos/1')
    await HttpClient.get('/todos/2')
    await HttpClient.get('/todos/3')
    await HttpClient.get('/todos/4')
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
      name: error.name,
      status_code: 500
    })
  }
})

module.exports = app