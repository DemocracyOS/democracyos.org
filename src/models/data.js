/**
 * Module Dependencies
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const DataSchema = new Schema({
  payload: {}
})

export default mongoose.model('Data', DataSchema)
