import React from 'react'
import moment from 'moment'
import { article } from '../actions'
import { Link } from 'react-router'
import { Table, DatePicker } from 'antd'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(article())
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
      render: (text) => { return moment(text).format('YYYY-MM-DD') }
    }, {
      title: '操作',
      render: (data) => { return <Link to={{ pathname: `blog/${data._id}`, state: data }}>查看详情</Link> }
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
        <DatePicker />
      </div>
    )
  }
}


export default Home
