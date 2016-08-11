import config  from '../../config/config'
import mongoose from 'mongoose'

const uri = `mongodb://localhost/${config.db}`
mongoose.connect(uri)

module.exports = mongoose
