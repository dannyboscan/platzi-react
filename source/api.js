import fetch from 'isomorphic-fetch';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const Api = {
  posts: {
    async getList(page = 1) {
      const res = await fetch(`${baseUrl}/posts?_page=${page}`);
      const data = await res.json();
      return data;
    },

    async getSingle(id = 1) {
      const res = await fetch(`${baseUrl}/posts/${id}`);
      const data = await res.json();
      return data;
    },

    async getComments(id = 1) {
      const res = await fetch(`${baseUrl}/posts/${id}/comments`);
      const data = await res.json();
      return data;
    },
  },

  users: {
    async getSingle(id = 1) {
      const res = await fetch(`${baseUrl}/users/${id}`);
      const data = await res.json();
      return data;
    },

    async getPosts(id = 1) {
      const res = await fetch(`${baseUrl}/posts/?userId=${id}`);
      const data = await res.json();
      return data;
    },
  },
};

export default Api;
