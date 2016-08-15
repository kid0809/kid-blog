import mongoose from '../db'

// 创建schema
const articleSchema = new mongoose.Schema({
  author: String,
  title: String,
  classify: Array,
  content: String,
  publish: { type: Boolean, default: false },
  creatAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

// 创建model
module.exports = mongoose.model('articles', articleSchema) // users为创建或选中的集合