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
          {...post.toJS()}
          user={user}
          comments={comments}
        />

        <section className={PageStyle.list}>
          {
            comments.map(c => <Comment key={c.get('id')} {...c.toJS()} />).toArray()
          }
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  params: PropTypes.object,
};

function mapStateToProps(state, props) {
  const postId = +props.params.id;
  const post = state.get('posts').get('entities').size
    ? state.get('posts').get('entities').get(postId)
    : null;

  return {
    post,
    user: post ? state.get('users').get(post.get('userId')) : null,
    comments: state.get('comments').filter(c => c.get('postId') === postId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
