import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post';
import Api from '../../api';
import Loading from '../../shared/components/Loading';

import PageStyle from './page.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const [user, posts] = await Promise.all([
      Api.users.getSingle(this.props.params.id),
      Api.users.getPosts(this.props.params.id),
    ]);

    this.setState({
      loading: false,
      user,
      posts,
    });
  }

  render() {
    const { user, posts } = this.state;

    if (this.state.loading) {
      return (<Loading />);
    }

    return (
      <section name="Profile" className={PageStyle.section}>
        <h2>
          <FormattedMessage id="title.profile" values={{ name: user.name }} />
        </h2>

        <fieldset>
          <FormattedMessage id="profile.field.basic" tagName="legend" />
          <input type="email" value={user.email} disabled />
        </fieldset>

        {user.address &&
          <fieldset>
            <FormattedMessage id="profile.field.address" tagName="legend" />
            <address>
              {user.address.street} <br />
              {user.address.suite} <br />
              {user.address.city} <br />
              {user.address.zipcode} <br />
            </address>
          </fieldset>
        }

        <section className={PageStyle.list}>
          {posts.map(p => <Post key={p.id} {...p} user={user} />)}
        </section>
      </section>
    );
  }
}

Profile.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default Profile;
