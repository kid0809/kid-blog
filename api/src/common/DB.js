import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/kid')
const db = mongoose.connection

db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', () => {
  console.log('数据库连接成功')
})

// 创建schema
const classSchema = new mongoose.Schema({
    name: String,
    studentId: Number
})
// 创建model
const classModel = mongoose.model('newClass', classSchema) // newClass为创建或选中的集合

module.exports = classModel
