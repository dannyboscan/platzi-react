import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loading from '../../shared/components/Loading';
import Style from './postbody.css';
import actions from '../../actions';

class PostBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    if (this.props.user && this.props.comments.size > 0) {
      return this.setState({ loading: false });
    }

    const { userId, id } = this.props;

    await Promise.all([
      this.props.actions.loadUser(userId),
      this.props.actions.loadCommentsForPost(id),
    ]);

    return this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }

    const { user, comments, id, title, body } = this.props;

    return (
      <article id={`post-${id}`} className={Style.post}>
        <h2 className={Style.title}>
          <Link to={`/post/${id}`}>{title}</Link>
        </h2>
        <p className={Style.body}>
          {body}
        </p>

        <div className={Style.meta}>
          <Link to={`/user/${user.get('id')}`} className={Style.user}>
            {user.get('name')}
          </Link>
          <span className={Style.comments}>
            &nbsp;<FormattedMessage id="post.meta.comments" values={{ amount: comments.size }} />
          </span>
          <Link to={`/post/${id}`}>
            <FormattedMessage id="post.meta.readMore" />
          </Link>
        </div>
      </article>
    );
  }
}

PostBody.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  userId: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    size: PropTypes.number,
    get: PropTypes.func,
  }),
  comments: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
};

function mapStateToProps(state, props) {
  return {
    comments: state.get('comments').filter(c => c.get('postId') === props.id),
    user: state.get('users').get(props.userId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBody);
