import React from 'react'
import Editor from './Editor'
import { FormControl, Button } from 'react-bootstrap'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      classify: '技术',
      content: ''
    }
    this.titleChange = this.titleChange.bind(this)
    this.classifyChange = this.classifyChange.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.publish = this.publish.bind(this)
  }

  titleChange(event) {
    const title = event.target.value
    this.setState({
      title
    })
  }

  classifyChange(event) {
    const classify = event.target.value
    this.setState({
      classify
    })
  }

  contentChange(content) {
    this.setState({
      content
    })
  }

  publish() {
    const data = {
      title: this.state.title,
      classify: this.state.classify,
      content: this.state.content
    }

    console.log(data)
  }

  render() {
    return (
      <div>
        <h4>文章标题</h4>
        <FormControl type="text" placeholder="文章标题" value={this.state.title} onChange={this.titleChange} />

        <h4 style={{ marginTop: '20px' }}>文章分类</h4>
        <FormControl componentClass="select" onChange={this.classifyChange}>
          <option value="技术">技术</option>
          <option value="心情">心情</option>
          <option value="生活">生活</option>
          <option value="职场">职场</option>
        </FormControl>

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
