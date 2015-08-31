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
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/democracyos-website'

/**
 * Setup
 */

mongoose.connect(mongoUrl)
app.use(serve(join(__dirname, '..', 'static')))
app.use(serve(join(__dirname, '..', 'views'), { extensions: 'html' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/form', (req, res) => {
  const { body } = req;
  const data = new Data({payload: body})
  data.save((err, data) => {
    if (err) {
      log(`❌  Error while saving data: %j`, err)
      const errorCode = 500
      return res.status(errorCode).send({
        msg: err.message,
        code: errorCode,
        err: err
      })
    }

    const successCode = 200
    log(`✅  Data ${data.id} saved successfully`)
    res.status(successCode).send({ msg: 'ok', code: successCode })
  })
})

export default app
