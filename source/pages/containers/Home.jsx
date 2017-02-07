import React, { Component } from 'react';

import Api from '../../api';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import PageStyle from './page.css';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      page: 1,
      posts: [],
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    const { page } = this.state;
    const posts = await Api.posts.getList(page);
    this.setState({
      posts,
      loading: false,
      page: page+1,
    });

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
        const { posts, page } = this.state;
        const newPosts = await Api.posts.getList(page);

        this.setState({
          loading: false,
          page: page + 1,
          posts: posts.concat(newPosts),
        });
      } catch (e) {
        console.error(e);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { posts } = this.state;

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

export default Home;
