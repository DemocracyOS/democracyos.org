/**
 * Module Dependencies
 */

import bodyParser from 'body-parser'
import debug from 'debug'
import express from 'express'
import { join } from 'path'
import mongoose from 'mongoose'
import serve from 'serve-static'
import { Data } from 'src/models'

/**
 * Constants definition
 */

const app = express()
const log = debug('democracyos.org:boot')
const mongoUrl =  process.env.MONGOLAB_URI ||
                  process.env.MONGO_URL ||
                  'mongodb://localhost/democracyos-website'

/**
 * Setup
 */

mongoose.connect(mongoUrl)
app.set('view engine', 'ejs')
app.set('views', join(__dirname, '..', 'views'))
app.use(serve(join(__dirname, '..', 'static')))
// app.use(serve(join(__dirname, '..', 'views'), { extensions: 'html' }))
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Static pages
 */

app.get('/', (req, res) => res.render('index.ejs'))
app.get('/about-us', (req, res) => res.render('about-us.ejs'))
app.get('/democracies', (req, res) => res.render('democracies.ejs'))
app.get('/blog', (req, res) => res.render('blog.ejs'))

/**
 * Form submit
 */

app.post('/api/form', (req, res) => {
  const { body } = req;
  const data = new Data({payload: body})
  data.save()
    .then((data) => {
      const successCode = 200

      log(`✅  Data ${data.id} saved successfully`)
      send(res, successCode, {
        msg: 'ok',
        code: successCode
      })
    })
    .onReject((err) => {
      const errorCode = 500

      log(`❌  Error while saving data: %j`, err)
      send(res, errorCode, {
        msg: err.message,
        code: errorCode
      })
    })
})

function send(res, status, payload) {
  res.status(status).send(payload)
}

export default app
