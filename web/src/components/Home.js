import React from 'react'
import moment from 'moment'
import { article } from '../actions'


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

    const articles = list.map((data, i) => {
      return (
        <div key={i}>
          <h2 >{data.title}</h2>
          <span style={{ color: '#999999' }}>{data.category.toString()}，</span>
          <span style={{ color: '#999999' }}>{moment(data.creatAt).format('YYYY-MM-DD')}</span>
        </div>
        
      )
    })

    return (
      <div>
        {articles}
      </div>
    )
  }
}


export default Home
