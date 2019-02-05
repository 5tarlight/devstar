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
const loader = require('./lib/routeloader')

const app = express()
const router = express.Router()

app.set('port', process.env.PORT || 80)
app.set('views', path.join(__dirname, 'lib/routes/views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/public', serveStatic(path.join(__dirname, 'lib/public')))
app.use(cookieParser())
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))

loader.init(app, router)

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
