import { combineReducers } from 'redux';

const initialState = {
  posts: {
    page: 1,
    entities: [],
  },
  comments: [],
  users: {},
};

const SET_POST = 'SET_POST';
const SET_COMMENTS = 'SET_COMMENTS';
const SET_USER = 'SET_USER';

function postPageReducer(state = initialState.posts.page, action = {}) {
  if (action.type === SET_POST) {
    return state + 1;
  }

  return state;
}

function postEntitiesReducer(state = initialState.posts.entities, action = {}) {
  if (action.type === SET_POST) {
    return state.concat(action.payload);
  }

  return state;
}

const postReducer = combineReducers({
  page: postPageReducer,
  entities: postEntitiesReducer,
});

function commentsReducer(state = initialState.comments, action = {}) {
  if (action.type === SET_COMMENTS) {
    return state.concat(action.payload);
  }

  return state;
}

function usersReducer(state = initialState.users, action = {}) {
  if (action.type === SET_USER) {
    return Object.assign({}, state, {
      [action.payload.id]: action.payload,
    });
  }

  return state;
}

const reducer = combineReducers({
  posts: postReducer,
  comments: commentsReducer,
  users: usersReducer,
});

// function reducer(state = initialState, action = {}) {
//   if (action.type === SET_POST) {
//     return Object.assign({}, state, {
//       posts: Object.assign({}, state.posts, {
//         entities: state.posts.entities.concat(action.payload),
//         page: state.posts.page + 1,
//       }),
//     });
//   }

//   return state;
// }

export default reducer;
