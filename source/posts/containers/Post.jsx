import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Api from '../../api';
import Loading from '../../shared/components/Loading';
import Style from './post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  async componentDidMount() {
    if (!!this.state.user && !!this.state.comments) {
      return this.setState({ loading: false });
    }

    const { userId, id } = this.props;
    const [user, comments] = await Promise.all([
      !this.props.user
        ? Api.users.getSingle(userId)
        : Promise.resolve(this.props.user),
      !this.props.comments
        ? Api.posts.getComments(id)
        : Promise.resolve(this.props.comments),
    ]);

    return this.setState({ loading: false, user, comments });
  }

  render() {
    const { user, comments } = this.state;

    if (this.state.loading) {
      return (<Loading />);
    }

    const { id, title, body } = this.props;

    return (
      <article id={`post-${id}`} className={Style.post}>
        <h2 className={Style.title}>
          <Link to={`/post/${id}`}>{title}</Link>
        </h2>
        <p className={Style.body}>
          {body}
        </p>

        <div className={Style.meta}>
          <Link to={`/user/${user.id}`} className={Style.user}>
            {user.name}
          </Link>
          <span className={Style.comments}>
            &nbsp;Hay {comments.length}
            comentarios
          </span>
        </div>
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default Post;
