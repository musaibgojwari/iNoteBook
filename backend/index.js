const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')

connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())  // middleware

// Available Routes
app.get("/",(req,res ) => {
  res.send("This is a GET request, the URL being '/' ")
})
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))


app.listen(port, () => {
  console.log(`Working on Port:${port}`)
})