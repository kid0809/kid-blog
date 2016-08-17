'use strict'

import _ from 'lodash'
import Article from './articleModel'
import jwt from 'jsonwebtoken'
import config from '../../../config/config'

module.exports = {
  /*******************************************
   * 创建文章
   *******************************************/
  createArticle: (req, res) => {
    const { displayName, role } = req.user

    if (role !== 'admin') {
      return res.status(401).json('该用户没有权限创建文章')
    }

    const newArticle = {
      author: displayName,
      title: _.trim(req.body.title),
      category: req.body.category,
      content: _.trim(req.body.content)
    }

    Article.create(newArticle, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json('文章创建成功')
    })
  },

  /*******************************************
   * 获取全部文章列表
   *******************************************/
  articleList: (req, res) => {
    Article.find({}, null, {sort: {createAt: -1}}, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json({data})
    })
  }
}
