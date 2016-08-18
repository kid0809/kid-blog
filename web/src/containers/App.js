import React from 'react'
import { Popover, Icon } from 'antd'


class App extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {}
  }


  render() {
    const content = (
      <div>
        <div style={{ fontSize: '14px' }}><a href="#">内容1</a></div>
        <div style={{ fontSize: '14px' }}><a href="#">内容2</a></div>
      </div>
    )

    return (
      <div>
        <header className="header">
          <div className="logo">
            kid's blog
          </div>
        </header>

        <nav>
          <div className="user-wrap">
            <img src="/images/default.jpg" alt="" className="user-avatar" />
            <div style={{ marginTop: '10px' }}>
              kid
            </div>

            <div style={{ marginTop: '200px' }}>
              <a href="#">所有文章</a>
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

            <div style={{ marginTop: '20px' }}>
              <a href="#"><Icon type="github" style={{ fontSize: '20px', color: '#666' }} /></a>
            </div>
          </div>
        </nav>

      </div>
    )
  }
}

export default App
