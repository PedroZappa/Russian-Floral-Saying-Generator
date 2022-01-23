// Backend Server Code
const express = require('express')
const path = require('path')
const fs = require('fs')


const app = express()

// Route on which App will react
// function will be called everytime express.js gets a request to this route
// and send to the browser
// res = response / req = request
app.get('/', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html')
    // Returns the content of the file especified above
    // specify absolute path and encoding
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
    // Send content to browser
    res.send(contentFromHtmlFile)
})

// Static files Handling
app.use(express.static(path.resolve(__dirname, '../dist')))

// Start server and listen to port
app.listen(3000, function () {
    console.log('App running on port on http://localhost:3000/');
})
