import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Popover, Icon } from 'antd'
import { publish, catagoryArticle } from '../actions'


class App extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {}
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(publish())
  }

  allArticle() {
    const { dispatch } = this.props
    dispatch(publish())
  }

  catagory(catagory) {
    const { dispatch } = this.props
    dispatch(catagoryArticle(catagory))
  }

  render() {
    const { dispatch, article } = this.props
    const content = (
      <div>
        <div style={{ fontSize: '14px' }}><a onClick={this.catagory.bind(this, '技术')}>技术</a></div>
        <div style={{ fontSize: '14px' }}><a onClick={this.catagory.bind(this, '心情')}>心情</a></div>
        <div style={{ fontSize: '14px' }}><a onClick={this.catagory.bind(this, '生活')}>生活</a></div>
        <div style={{ fontSize: '14px' }}><a onClick={this.catagory.bind(this, '职场')}>职场</a></div>
      </div>
    )

    const qrcode = <img src="/images/kid-qrcode.jpg" alt="博主的微信二维码" width="200" />

    return (
      <div>
        <header className="header">
          <div className="logo">
            <Link to={{ pathname: '/' }} style={{ color: '#fff' }}>kid's blog</Link>
          </div>
        </header>

        <nav>
          <div className="user-wrap">
            <img src="/images/default.jpg" alt="" className="user-avatar" />
            <div style={{ marginTop: '10px' }}>
              kid
            </div>

            <div style={{ marginTop: '200px' }}>
              <a onClick={this.allArticle.bind(this)}>所有文章</a>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Popover content={content} trigger="hover" placement="right">
                <a href="#">
                  分类
                </a>
              </Popover>
            </div>

            <div style={{ marginTop: '20px' }}>
              <a href="#">关于我</a>
            </div>

            <div style={{ marginTop: '100px' }}>
              <a href="https://github.com/kid0809" target="_blank"><Icon type="github" style={{ fontSize: '20px', color: '#666' }} /></a>
              <Popover content={qrcode} trigger="hover" placement="right">
                <a href="#"><i className="fa fa-weixin" style={{ fontSize: '20px', color: '#666', marginLeft: '5px' }} /></a>
              </Popover>
            </div>
          </div>
        </nav>

        <div className="main-wrapper nav-left">
          {this.props.children && React.cloneElement(this.props.children, {
            dispatch,
            article
          })}
        </div>
      </div>
    )
  }
}

// Redux 回传值
function mapStateToProps(state) {
  const { article } = state

  return { article }
}

export default connect(mapStateToProps)(App)
