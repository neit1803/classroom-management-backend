const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 8888
const host_name = process.env.HOST_NAME || 'localhost'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, host_name, () => {
  console.log(`Example app running on ${host_name}:${port}/`)
})