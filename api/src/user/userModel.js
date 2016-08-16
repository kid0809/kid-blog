import mongoose from '../db'

// 创建schema
const userSchema = new mongoose.Schema({
  loginName: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
  email: String,
  gender: String,
  role: { type: String, enum: ['admin', 'member'], default: 'member'},
  permission: Array,
  creatAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

// 创建model
module.exports = mongoose.model('users', userSchema) // users为创建或选中的集合
