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
  },

  /*******************************************
   * 获取已发布的文章列表
   *******************************************/
  articlePublishList: (req, res) => {
    Article.find({publish: true}, null, {sort: {createAt: -1}}, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json({data})
    })
  },

  /*******************************************
   * 获取分类并且已发布的文章列表
   *******************************************/
  articleListByCategory: (req, res) => {
    const category = req.params.category

    Article.find({publish: true, category: category}, null, {sort: {createAt: -1}}, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json({data})
    })
  },

  /*******************************************
   * 更新文章
   *******************************************/
  updateArticle: (req, res) => {
    const { role } = req.user

    if (role !== 'admin') {
      return res.status(401).json('该用户没有权限修改文章')
    }
    const id = req.body.id

    Article.update({_id: id}, {
      $set: {
        title: _.trim(req.body.title),
        category: req.body.category,
        content: _.trim(req.body.content),
        updateAt: new Date()
    }}, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json({data})
    })
  },

  /*******************************************
   * 更新发布状态
   *******************************************/
  updatePublish: (req, res) => {
    const { role } = req.user

    if (role !== 'admin') {
      return res.status(401).json('该用户没有权限发布文章')
    }
    const id = req.body.id

    Article.update({_id: id}, {
      $set: {
        publish: req.body.publish,
        updateAt: new Date()
    }}, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json({data})
    })
  },

  /*******************************************
   * 删除文章
   *******************************************/
  removeArticle: (req, res) => {
    const { role } = req.user

    if (role !== 'admin') {
      return res.status(401).json('该用户没有权限删除文章')
    }
    const id = req.body.id

    Article.remove({_id: id}, (err, data) => {
      if(err) return res.json(err)

      res.status(200).json({data})
    })
  }
}
