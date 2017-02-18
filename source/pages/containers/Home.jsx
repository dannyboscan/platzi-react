import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../api';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import actions from '../../actions';

import PageStyle from './page.css';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    const { page, dispatch } = this.props;
    const posts = await Api.posts.getList(page);

    dispatch(actions.setPost(posts));

    this.setState({ loading: false });

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.loading) return null;

    const wrap = document.getElementById('home');
    const contentHeight = wrap.offsetHeight;
    const yOffset = window.pageYOffset;
    const y = yOffset + window.innerHeight;

    if (y < contentHeight) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        const { page, dispatch } = this.props;
        const newPosts = await Api.posts.getList(page);

        dispatch(actions.setPost(newPosts));

        this.setState({ loading: false });
      } catch (e) {
        console.error(e);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { posts } = this.props;

    return (
      <section id="home" name="Home" className={PageStyle.section}>
        <section className={PageStyle.list}>
          {
            posts.map(post => <Post key={post.id} {...post} />)
          }
        </section>

        {this.state.loading &&
          <Loading />
        }
      </section>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {};
// }

export default connect(mapStateToProps)(Home);
