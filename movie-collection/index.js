const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000
const app = express()
const movieRoutes = require('./routes/movieRoute')


app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongodn connected"))

app.use('/api/movies',movieRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on the http://localhost:${PORT}`)
})