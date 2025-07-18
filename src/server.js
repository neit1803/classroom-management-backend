require('dotenv').config();
const express = require('express');
const instrutorRoutes = require('./routes/instructorRoutes');

const app = express();
const port = process.env.PORT || 8888;
const host_name = process.env.HOST_NAME || 'localhost';


// Define Routes
app.use("/", instrutorRoutes);

app.listen(port, host_name, () => {
  console.log(`Example app running on ${host_name}:${port}/`)
});