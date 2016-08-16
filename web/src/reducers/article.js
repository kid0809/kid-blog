import _ from 'lodash'
import * as Types from '../constants/ActionTypes'

export default (state = {
  isFetching: false,
  list: [],
  statusText: null
}, action) => {
  switch (action.type) {
    case Types.ARTICLE_REQUEST:
      return _.assign({}, state, {
        isFetching: true,
        statusText: null
      })

    case Types.ARTICLE_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        list: action.payload.data,
        statusText: 'You have got article list successfully'
      })

    case Types.ARTICLE_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        list: [],
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })

    default:
      return state
  }
}
