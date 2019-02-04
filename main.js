'use strict'

const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const serveStatic = require('serve-static')
const errorHandler = require('errorhandler')
const expressErrorHandler = require('express-error-handler')
const cors = require('cors')
const expressSession = require('express-session')

const app = express()
const router = express.Router()

app.set('port', process.env.PORT || 80)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/public', serveStatic(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))

router.route('/').get((req, res) => {
  console.log(req.ip + ' : portal')
  res.end("Hello World")
})

app.use('/', router)

const errorhandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
})

app.use(expressErrorHandler.httpError(404))
app.use(errorhandler)

http.createServer(app).listen(app.get('port'), () => {
  console.log('Server on : ' + app.get('port'))
})
