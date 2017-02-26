import Api from './api';

function setPost(post) {
  return {
    type: 'SET_POST',
    payload: post,
  };
}

function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    payload: comments,
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

function postsNextPage() {
  return async (dispatch, getState) => {
    const state = getState();
    const currentPage = state.get('posts').get('page');
    const posts = await Api.posts.getList(currentPage);
    dispatch(setPost(posts));

    return posts;
  };
}

function loadPost(postId) {
  return async (dispatch) => {
    const post = await Api.posts.getSingle(postId);
    dispatch(setPost([post]));

    return post;
  };
}

function loadUser(userId) {
  return async (dispatch) => {
    const user = await Api.users.getSingle(userId);
    dispatch(setUser(user));

    return user;
  };
}

function loadUserPosts(userId) {
  return async (dispatch) => {
    const posts = await Api.users.getPosts(userId);
    dispatch(setPost(posts));

    return posts;
  };
}

function loadCommentsForPost(postId) {
  return async (dispatch) => {
    const comments = await Api.posts.getComments(postId);
    dispatch(setComments(comments));

    return comments;
  };
}

export default {
  setPost,
  setComments,
  setUser,
  postsNextPage,
  loadPost,
  loadUser,
  loadUserPosts,
  loadCommentsForPost,
};
