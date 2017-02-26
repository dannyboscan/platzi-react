import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostBody from '../../posts/containers/PostBody';
import Loading from '../../shared/components/Loading';
import actions from '../../actions';

import PageStyle from './page.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.firstLoad();
    document.title = `Perfil de usuario, ${this.props.user.get('name')}`;
  }

  async firstLoad() {
    const { params } = this.props;
    if (this.props.user) {
      return this.setState({ loading: false });
    }

    await Promise.all([
      this.props.actions.loadUser(+params.id),
      this.props.actions.loadUserPosts(+params.id),
    ]);

    return this.setState({ loading: false });
  }

  render() {
    const { user, posts } = this.props;

    if (this.state.loading) {
      return (<Loading />);
    }

    return (
      <section name="Profile" className={PageStyle.section}>
        <h2>
          <FormattedMessage id="title.profile" values={{ name: user.get('name') }} />
        </h2>

        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          <input type="email" value={user.get('email')} disabled />
        </fieldset>

        {user.get('address') &&
          <fieldset>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {user.get('address').get('street')} <br />
              {user.get('address').get('suite')} <br />
              {user.get('address').get('city')} <br />
              {user.get('address').get('zipcode')} <br />
            </address>
          </fieldset>
        }

        <section className={PageStyle.list}>
          {posts.map(p => <PostBody key={p.get('id')} {...p.toJS()} user={user} />).toArray()}
        </section>
      </section>
    );
  }
}

Profile.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  user: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  posts: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    user: state.get('users').get(+props.params.id) || null,
    posts: state.get('posts').get('entities').filter(p => p.get('userId') === +props.params.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
