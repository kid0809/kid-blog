import mongoose from '../db'

// 创建schema
const userSchema = new mongoose.Schema({
  loginName: String,
  displayName: String,
  password: String,
  avatar: String,
  email: String,
  gender: String,
  creatAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

// 创建model
module.exports = mongoose.model('users', userSchema) // users为创建或选中的集合
