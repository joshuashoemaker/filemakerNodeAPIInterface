const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const axios = require('axios')

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS,PATCH')
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with')
  next()
})

app.post('/interface', (req, res) => {
  const data = req.body.data

  if (data.method === 'POST') {
    post(data)
      .then(function (response) {
        res.send(response.data)
      })
      .catch(function (error) {
        res.send(error.response.data)
      })
  } else if (data.method === 'GET') {
    get(data)
      .then(function (response) {
        res.send(response.data)
      })
      .catch(function (error) {
        res.send(error.response.data)
      })
  } else if (data.method === 'PATCH') {
    patch(data)
      .then(function (response) {
        res.send(response.data)
      })
      .catch(function (error) {
        res.send(error.response.data)
      })
  } else {
    res.send('Request not possible. Most likly this error is cause by the "Method" not being set in your request body')
  }
})

const post = data => {
  return axios.post(data.url, data.body, {headers: data.headers})
}

const get = data => {
  return axios.get(data.url, {headers: data.headers})
}

const patch = data => {
  return axios.patch(data.url, data.body, {headers: data.headers})
}

const port = process.env.PORT || 3000

app.listen(port, () => console.log('FM Data API Interface listening on port ' + port))
