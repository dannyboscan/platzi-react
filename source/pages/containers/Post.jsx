import React, { Component } from 'react';

import Api from '../../api';
import Loading from '../../shared/components/Loading.jsx';
import PostBody from '../../posts/containers/Post.jsx';
import Comment from '../../comments/components/Comment.jsx';

import PageStyle from './page.css';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      post: {},
      user: {},
      comments: [],
    };
  }

  async componentDidMount() {
    const { params } = this.props;

    const [post, comments] = await Promise.all([
      Api.posts.getSingle(params.id),
      Api.posts.getComments(params.id),
    ]);

    const user = await Api.users.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });
  }

  render() {
    const { post, user, comments } = this.state;

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

export default Post;
