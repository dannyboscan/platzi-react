import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loading from '../../shared/components/Loading';
import PostBody from '../../posts/containers/PostBody';
import Comment from '../../comments/components/Comment';
import actions from '../../actions';

import PageStyle from './page.css';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    if (this.props.post) {
      return this.setState({ loading: false });
    }

    await this.props.actions.loadPost(this.props.params.id);

    return this.setState({ loading: false });
  }

  render() {
    const { post, user, comments } = this.props;

    if (this.state.loading) {
      return (<Loading />);
    }

    return (
      <section name="Post" className={PageStyle.section}>
        <PostBody
          {...post}
          user={user}
          comments={comments}
        />

        <section className={PageStyle.list}>
          {comments.map(c => <Comment key={c.id} {...c} />)}
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.objectOf(PropTypes.func),
  params: PropTypes.object,
};

function mapStateToProps(state, props) {
  const postId = +props.params.id;
  const post = state.posts.entities.length
    ? state.posts.entities.find(p => p && p.id === postId)
    : null;

  return {
    post,
    user: post ? state.users[post.userId] : null,
    comments: state.comments.filter(c => c.postId === postId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
