import React from 'react'
import moment from 'moment'
import fetch from 'isomorphic-fetch'
import { message } from 'antd'
import marked from 'marked'
import { checkStatus, parseJSON } from '../utils/fetch'

/* global API_SERVER */

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: ''
    }
  }

  componentWillMount() {
    const id = this.props.params.id

    fetch(`${API_SERVER}/api/article/id/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        this.setState({
          article: res.data
        })
      })
      .catch((error) => {
        console.log(error)
        message.error('服务器错误')
      })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.article !== nextState.article
  }

  render() {
    let data = null
    if (this.state.article !== '') {
      data = (
        <div className="markdown">
          <h2>{this.state.article.title}</h2>
          <div>
            <span style={{ color: '#999999' }}>分类：{this.state.article.category.toString()}</span>
            <span style={{ color: '#999999', marginLeft: '30px' }}>
              <i className="fa fa-clock-o" /> {moment(this.state.article.createAt).format('YYYY-MM-DD')}
            </span>
          </div>
          <article dangerouslySetInnerHTML={{ __html: marked(this.state.article.content) }} style={{ marginTop: '40px' }} />
        </div>
      )
    }
    return (
      <div>
        {data}
      </div>
    )
  }
}

export default Blog
