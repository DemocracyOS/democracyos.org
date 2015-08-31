/**
 * Module Dependencies
 */

import express from 'express'
import { join } from 'path'
import favicon from 'serve-favicon'
import serve from 'serve-static'

/**
 * Constants definition
 */

const app = express()

/**
 * Setup
 */

app.use(serve(join(__dirname, '..', 'static')))
app.use(serve(join(__dirname, '..', 'views'), { extensions: 'html' }))

export default app
