import React from 'react'
import moment from 'moment'
import marked from 'marked'
import { Link } from 'react-router'

class FrontHome extends React.Component {
  constructor(props) {
    super(props)
  }

  renderArticles() {
    const { list } = this.props.article
    const articles = list.map((data, i) => {
      const content = marked(data.content).split('<a id=\'more\'></a>')
      return (
        <div key={i} className="article-card">
          <div className="article-header">
            <Link to={{ pathname: `/home/blogs/${data._id}` }} className="article-title">{data.title}</Link>
            <span><i className="fa fa-clock-o"></i> {moment(data.createAt).format('YYYY-MM-DD')}</span>
          </div>
          <article className="article-content markdown" dangerouslySetInnerHTML={{ __html: content[0] }}>
          </article>
          <footer className="article-footer">
            分类： {data.category.toString()}
          </footer>
        </div>
      )
    })

    return articles
  }

  render() {
    return (
      <div className="article-wrap">
        {this.renderArticles()}
      </div>
    )
  }
}


export default FrontHome
