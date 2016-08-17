import React from 'react'
import moment from 'moment'
import { article } from '../actions'
import { Link } from 'react-router'


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(article())
  }

  render() {
    const { list } = this.props.article
    let articles

    if (list.length > 0) {
      articles = list.map((data, i) => {
        return (
          <div key={i}>
            <h2><Link to={{ pathname: `blog/${data._id}`, state: data }}>{data.title}</Link></h2>
            <span style={{ color: '#999999' }}>{data.category.toString()}，</span>
            <span style={{ color: '#999999' }}>{moment(data.creatAte).format('YYYY-MM-DD')}</span>
          </div>
          
        )
      })
    } else {
      articles = '暂时没有文章'
    }

    return (
      <div>
        {articles}
      </div>
    )
  }
}


export default Home
