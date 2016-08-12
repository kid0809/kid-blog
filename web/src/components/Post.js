import React from 'react'
import Editor from './Editor'
import { FormControl, Button } from 'react-bootstrap'

class Post extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h4>文章标题</h4>
        <FormControl type="text" placeholder="文章标题" />
        <h4 style={{ marginTop: '20px' }}>文章分类</h4>
        <FormControl componentClass="select" onChange={(event) => console.log(event.target.value)}>
          <option value="技术">技术</option>
          <option value="心情">心情</option>
          <option value="生活">生活</option>
          <option value="职场">职场</option>
        </FormControl>
        <h4 style={{ marginTop: '20px' }}>文章内容</h4>
        <Editor />
        <Button bsStyle="primary" style={{ marginTop: '20px' }}>发表文章</Button>
      </div>

    )
  }
}


export default Post
