import React from 'react'
import Editor from './Editor'
import Notification from 'rc-notification'
import { checkStatus, parseJSON } from '../utils/fetch'
import { FormControl, Button } from 'react-bootstrap'
import Select, { Option } from 'rc-select'

const notification = Notification.newInstance()

/* global API_SERVER */

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      category: [],
      content: ''
    }
    this.titleChange = this.titleChange.bind(this)
    this.categoryChange = (value) => this.category(value)
    this.contentChange = this.contentChange.bind(this)
    this.publish = this.publish.bind(this)
  }

  titleChange(event) {
    const title = event.target.value
    this.setState({
      title
    })
  }

  category(value) {
    this.setState({
      category: value
    })
  }

  contentChange(content) {
    this.setState({
      content
    })
  }

  publish() {
    const { token } = this.props
    const data = {
      title: this.state.title,
      category: this.state.category,
      content: this.state.content
    }


    fetch(`${API_SERVER}/api/article/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      console.log(res)
      notification.notice({
        content: '文章创建成功'
      })
      this.setState({
        title: '',
        category: [],
        content: ''
      })
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        notification.notice({
          content: '没有权限创建文章'
        })
      } else {
        notification.notice({
          content: '服务器错误'
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h4>文章标题</h4>
        <FormControl type="text" placeholder="文章标题" value={this.state.title} onChange={this.titleChange} />

        <h4 style={{ marginTop: '20px' }}>文章分类</h4>
        <Select
          value={this.state.category}
          animation="slide-up"
          choiceTransitionName="rc-select-selection__choice-zoom"
          style={{ width: '100%' }}
          multiple
          placeholder="选择分类"
          onChange={this.categoryChange}
        >
          <Option key="0" value="技术">技术</Option>
          <Option key="1" value="心情">心情</Option>
          <Option key="2" value="生活">生活</Option>
          <Option key="3" value="职场">职场</Option>
        </Select>


        <h4 style={{ marginTop: '20px' }}>文章内容</h4>
        <Editor content={this.state.content} contentChange={this.contentChange} />

        <Button bsStyle="primary" style={{ marginTop: '20px' }} onClick={this.publish}>
          发表文章
        </Button>
      </div>

    )
  }
}


export default Post
