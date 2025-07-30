require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 8888;
const host_name = process.env.HOST_NAME || 'localhost';


// Define Routes
app.use("/", userRoutes);
app.use("/", lessonRoutes);
app.use("/", authRoutes);

app.listen(port, host_name, () => {
  console.log(`Example app running on ${host_name}:${port}/`)
});