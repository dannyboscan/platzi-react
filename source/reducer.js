import { combineReducers } from 'redux-immutable';
import { fromJS, Map as map } from 'immutable';

const initialState = fromJS({
  posts: {
    page: 1,
    entities: {},
  },
  comments: {},
  users: {},
});

const SET_POST = 'SET_POST';
const SET_COMMENTS = 'SET_COMMENTS';
const SET_USER = 'SET_USER';

function postPageReducer(state = initialState.get('posts').get('page'), action = {}) {
  if (action.type === SET_POST) {
    return state + 1;
  }

  return state;
}

function postEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}) {
  if (action.type === SET_POST) {
    return action.payload
      .reduce((posts, post) => posts.set(post.id, map(post)), state);
    // return state.concat(action.payload);
  }

  return state;
}

const postReducer = combineReducers({
  page: postPageReducer,
  entities: postEntitiesReducer,
});

function commentsReducer(state = initialState.get('comments'), action = {}) {
  if (action.type === SET_COMMENTS) {
    return action.payload
      .reduce((comments, comment) => comments.set(comment.id, map(comment)), state);
    // return state.concat(action.payload);
  }

  return state;
}

function usersReducer(state = initialState.get('users'), action = {}) {
  if (action.type === SET_USER) {
    return state.set(action.payload.id, action.payload);
    // return Object.assign({}, state, {
    //   [action.payload.id]: action.payload,
    // });
  }

  return state;
}

const reducer = combineReducers({
  posts: postReducer,
  comments: commentsReducer,
  users: usersReducer,
});

export default reducer;
