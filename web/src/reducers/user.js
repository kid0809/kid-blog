import _ from 'lodash'
import * as Types from '../constants/ActionTypes'

export default (state = { islogin: false }, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return _.assign({}, state, { islogin: true })

    case Types.LOGOUT:
      return _.assign({}, state, { islogin: false })

    default:
      return state
  }
}
