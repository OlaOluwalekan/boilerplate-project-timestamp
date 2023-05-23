// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
const { daysArr, monthArr } = require('./data')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api', (req, res) => {
  const today = new Date()
  const time = today.getTime()
  res.json({ unix: time, utc: today.toString() })
})

app.get('/api/:date', (req, res) => {
  const { date } = req.params
  let today

  if (date.includes('-')) {
    today = new Date(`${date}`)
  } else {
    today = new Date(Number(date))
  }
  // let strDate = today.toString()
  // strDate = strDate.slice(0, strDate.indexOf('+'))
  const day = today.getDay()
  const month = today.getMonth()
  const dayNo = today.getDate()
  const year = today.getFullYear()
  const hr = today.getHours()
  const min = today.getMinutes()
  const sec = today.getSeconds()
  const dateFomat = `${daysArr[day]}, ${dayNo} ${monthArr[month]} ${year} ${
    hr < 10 ? `0${hr}` : hr
  }:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec} GMT`

  const time = today.getTime()
  res.json({ unix: time, utc: dateFomat })
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 9000, function () {
  console.log(
    'Your app is listening on port ' + /* listener.address().port */ 9000
  )
})
