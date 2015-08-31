/**
 * Module Dependencies
 */

import debug from 'debug'
import app from 'src/boot'

/**
 * Constants definition
 */

const log = debug('democracyos.org')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  log(`🚀  App started on port ${PORT}`)
})
