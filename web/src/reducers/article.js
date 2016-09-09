import Immutable from 'immutable'
import * as Types from '../constants/ActionTypes'

const initialState = Immutable.fromJS({
  isFetching: false,
  list: [],
  statusText: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ARTICLE_REQUEST:
      return state.merge({
        isFetching: true,
        statusText: null
      })


    case Types.ARTICLE_SUCCESS:
      return state.mergeDeep({
        isFetching: false,
        list: action.payload.data,
        statusText: 'You have got article list successfully'
      })


    case Types.ARTICLE_FAILURE:
      return state.merge({
        isFetching: false,
        list: [],
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })


    case Types.PUBLISH_ARTICLE_REQUEST:
      return state.merge({
        isFetching: true,
        statusText: null
      })


    case Types.PUBLISH_ARTICLE_SUCCESS: {
      const list = state.get('list')
      const newList = list.map((data) => {
        if (data.get('_id') === action.payload.id) {
          const _data = data.set('publish', action.payload.publish)
          return _data
        }
        return data
      })

      return state.merge({
        isFetching: false,
        list: newList,
        statusText: 'You have changed article publish successfully'
      })
    }


    case Types.PUBLISH_ARTICLE_FAILURE:
      return state.merge({
        isFetching: false,
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })


    case Types.DELETE_ARTICLE_REQUEST:
      return state.merge({
        isFetching: true,
        statusText: null
      })


    case Types.DELETE_ARTICLE_SUCCESS: {
      const list = state.get('list')
      const newList = list.filter((data) => {
        return data.get('_id') !== action.payload.id
      })

      return state.merge({
        isFetching: false,
        list: newList,
        statusText: 'You have deleted article successfully'
      })
    }


    case Types.DELETE_ARTICLE_FAILURE:
      return state.merge({
        isFetching: false,
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })


    case Types.PUBLISH_REQUEST:
      return state.merge({
        isFetching: true,
        statusText: null
      })


    case Types.PUBLISH_SUCCESS:
      return state.merge({
        isFetching: false,
        list: action.payload.data,
        statusText: 'You have got publish article list successfully'
      })


    case Types.PUBLISH_FAILURE:
      return state.merge({
        isFetching: false,
        list: [],
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })


    case Types.CATEGORY_REQUEST:
      return state.merge({
        isFetching: true,
        statusText: null
      })


    case Types.CATEGORY_SUCCESS:
      return state.merge({
        isFetching: false,
        list: action.payload.data,
        statusText: 'You have got category article list successfully'
      })


    case Types.CATEGORY_FAILURE:
      return state.merge({
        isFetching: false,
        list: [],
        statusText: `Error: ${action.payload.status} ${action.payload.statusText}`
      })


    default:
      return state
  }
}
