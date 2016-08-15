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
    const author = req.user.displayName
    const newArticle = {
      author,
      title: _.trim(req.body.title),
      classify: req.body.classify,
      content: _.trim(req.body.content)
    }

    Article.create(newArticle, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json('文章创建成功')
    })
  }
}
