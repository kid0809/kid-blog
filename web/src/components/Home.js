import React from 'react'
import moment from 'moment'
import { article, publishArticle, deleteArticle } from '../actions'
import { Link } from 'react-router'
import { Table, Popconfirm } from 'antd'

/* global API_SERVER */

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(article())
  }

  delete(id) {
    const { dispatch, token } = this.props
    dispatch(deleteArticle(id, token))
  }

  publish(id, publish, event) {
    event.preventDefault()
    const { dispatch, token } = this.props
    const data = {
      id,
      publish: !publish
    }

    dispatch(publishArticle(data, token))
  }

  renderTable() {
    const { list } = this.props.article

    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '日期',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text) => {
        return moment(text).format('YYYY-MM-DD')
      }
    }, {
      title: '操作',
      render: (data) => {
        const publish = data.publish ? '取消发布' : '发布'
        return (
          <div>
            <Link to={{ pathname: `blog/${data._id}`, state: data }}>查看详情</Link>
            <a href="#" onClick={this.publish.bind(this, data._id, data.publish)}> {publish}</a>
            <Link to={{ pathname: `update/${data._id}`, state: data }}> 修改</Link>
            <Popconfirm title="确定要删除这篇文章吗？" onConfirm={this.delete.bind(this, data._id)}>
              <a href="#"> 删除</a>
            </Popconfirm>
          </div>
        )
      }
    }]

    const tableInstance = (
      <Table dataSource={list} columns={columns} />
    )

    return tableInstance
  }

  render() {
    const { list } = this.props.article

    return (
      <div>
        {list.length > 0 ? this.renderTable() : '暂时没有文章'}
      </div>
    )
  }
}


export default Home
