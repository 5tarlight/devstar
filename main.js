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

app.set('port', process.env.PORT || 80)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/public', static(path.join(__dirname), 'public'))
app.use(cookieParser())
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))