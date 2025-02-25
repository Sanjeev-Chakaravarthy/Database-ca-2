const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const app = express()
const movieRoutes = require('./routes/movieRoute')
require("dotenv").config()


app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Not connected", error));


app.use('/api/movies',movieRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on the http://localhost:${PORT}`)
})