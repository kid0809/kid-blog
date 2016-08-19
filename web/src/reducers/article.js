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

    case Types.PUBLISH_ARTICLE_REQUEST:
      return _.assign({}, state, {
        isFetching: true,
        statusText: null
      })

    case Types.PUBLISH_ARTICLE_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        list: state.list.map((data) => {
          if (data._id === action.payload.id) {
            data.publish = action.payload.publish
            return data
          }
          return data
        }),
        statusText: 'You have changed article publish successfully'
      })

    case Types.PUBLISH_ARTICLE_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })

    case Types.DELETE_ARTICLE_REQUEST:
      return _.assign({}, state, {
        isFetching: true,
        statusText: null
      })

    case Types.DELETE_ARTICLE_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        list: state.list.filter((data) => {
          return data._id !== action.payload.id
        }),
        statusText: 'You have deleted article successfully'
      })

    case Types.DELETE_ARTICLE_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })

    case Types.PUBLISH_REQUEST:
      return _.assign({}, state, {
        isFetching: true,
        statusText: null
      })

    case Types.PUBLISH_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        list: action.payload.data,
        statusText: 'You have got publish article list successfully'
      })

    case Types.PUBLISH_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        list: [],
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })

    case Types.CATEGORY_REQUEST:
      return _.assign({}, state, {
        isFetching: true,
        statusText: null
      })

    case Types.CATEGORY_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        list: action.payload.data,
        statusText: 'You have got category article list successfully'
      })

    case Types.CATEGORY_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        list: [],
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })

    default:
      return state
  }
}
