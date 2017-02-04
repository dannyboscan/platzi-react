import React, { Component } from 'react';
import { Link } from 'react-router';

import Post from '../../posts/containers/Post.jsx';
import Api from '../../api.js';
import Loading from '../../shared/components/Loading.jsx';

import PageStyle from './page.css';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			posts: [],
			loading: true
		};
	}

	async componentDidMount() {
		const [user, posts] = await Promise.all([
			Api.users.getSingle(this.props.params.id),
			Api.users.getPosts(this.props.params.id)
		]);

		this.setState({
			loading: false,
			user,
			posts
		});
	}

	render() {
		const { user, posts } = this.state;

		if (this.state.loading)
			return (<Loading />);

		return (
			<section name="Profile" className={PageStyle.section}>
				<h2>Profile de {user.name}</h2>

				<fieldset>
					<legend>Basic info</legend>
					<input type="email" value={user.email} disabled/>
				</fieldset>

				{user.address &&
					<fieldset>
						<legend>Address</legend>
						<address>
							{user.address.street} <br/>
							{user.address.suite} <br/>
							{user.address.city} <br/>
							{user.address.zipcode} <br/>
						</address>
					</fieldset>
				}

				<section className={PageStyle.list}>
					{posts.map(p => <Post key={p.id} {...p} user={user} />)}
				</section>
			</section>
		)
	}
}

export default Profile;
