import mongoose from '../db'

// 创建schema
const articleSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: Array, required: true },
  content: { type: String, required: true },
  publish: { type: Boolean, default: false },
  creatAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

// 创建model
module.exports = mongoose.model('articles', articleSchema) // users为创建或选中的集合