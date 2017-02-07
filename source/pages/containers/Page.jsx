import React from 'react';
import { Match, Miss } from 'react-router';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';

import Header from '../../shared/components/Header';

function Pages() {
  return (
    <main role="application">
      <Header />

      <Match
        pattern="/"
        exactly
        component={Home}
      />
      <Match
        pattern="/post/:id"
        exactly
        component={Post}
      />
      <Match
        pattern="/user/:id"
        exactly
        component={Profile}
      />
      <Miss
        component={Error404}
      />
    </main>
  );
}

export default Pages;
