/**
 * Initialized Server
 * Potentially Attach Websocket Server
 * Connects to router to mount routes
 * 
 */


const express = require('express')
const app = express()
const port = 3000
const path = require('path')

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello there')
})

//create chat endpoint
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))
