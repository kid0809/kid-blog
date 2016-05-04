import mongoose from 'mongoose'

// 创建schema
const userSchema = new mongoose.Schema({
	loginName: String,
    displayName: String,
    password: String,
    avatar: String,
    gender: String,
    creatAt: Date,
    updateAt: Date
})
// 创建model
module.exports = db.model('users', userSchema) // users为创建或选中的集合
