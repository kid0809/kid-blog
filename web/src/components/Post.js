import React from 'react'
import { Editor, EditorState } from 'draft-js'
import Immutable from 'immutable'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({ editorState })
    this.log = () => { console.log(this.state.editorState.getCurrentContent().getBlockMap().toJS()); console.log(this.state.editorState) }
  }


  render() {
    const { editorState } = this.state
    const map1 = Immutable.Map({ a: 1, b: 2, c: 3 })
    const map2 = map1.set('b', 50)

    console.log(map1.toJS())
    console.log(map2)
    
    return (
      <div>
        这是post页
        <Editor editorState={editorState} onChange={this.onChange} />
        <button onClick={this.log}>log</button>
      </div>
    )
  }
}


export default Post
