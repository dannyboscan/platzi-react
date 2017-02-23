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
    const currentPage = state.posts.page;

    const posts = await Api.posts.getList(currentPage);
    dispatch(setPost(posts));

    return posts;
  };
}

function loadUser(userId) {
  return async (dispatch) => {
    const user = await Api.users.getSingle(userId);
    dispatch(setUser(user));

    return user;
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
  loadUser,
  loadCommentsForPost,
};
