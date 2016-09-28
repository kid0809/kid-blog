import React from 'react'
import moment from 'moment'
import marked from 'marked'
import { is } from 'immutable'

class Article extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps || is(this.props, nextProps)) ||
           !(this.state === nextState || is(this.state, nextState))
  }

  render() {
    return (
      <div className="markdown">
        <h2>{this.props.location.state.title}</h2>
        <div>
          <span style={{ color: '#999999' }}>标签：{this.props.location.state.category.toString()}，</span>
          <span style={{ color: '#999999' }}>{moment(this.props.location.state.createAt).format('YYYY-MM-DD')}</span>
        </div>
        <article dangerouslySetInnerHTML={{ __html: marked(this.props.location.state.content) }} />
      </div>
    )
  }
}


export default Article
