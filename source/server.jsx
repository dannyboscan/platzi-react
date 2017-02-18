import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';

import { IntlProvider } from 'react-intl';

import messages from './messages.json';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';
import store from './store';

const domain = process.env.NODE_ENV === 'production' ? 'https://dboscan-react-ss.now.sh' : 'http://localhost:3001';

function requestHandler(req, res) {
  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const ctx = createServerRenderContext();

  let html = renderToString(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ServerRouter location={req.url} context={ctx}>
          <Pages />
        </ServerRouter>
      </IntlProvider>
    </Provider>,
  );

  const result = ctx.getResult();

  res.setHeader('Content-Type', 'text/html');

  if (result.redirect) {
    res.writeHead(301, {
      Location: result.redirect.pathname,
    });
    res.end();
  }

  if (result.missed) {
    res.writeHead(404);

    html = renderToString(
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <ServerRouter location={req.url} context={ctx}>
            <Pages />
          </ServerRouter>
        </IntlProvider>
      </Provider>,
    );
  }

  res.write(
    renderToStaticMarkup(
      <Layout
        title="React con Redux, Curso de Platzi"
        content={html}
        domain={domain}
      />,
    ),
  );

  res.end();
}

const server = http.createServer(requestHandler);
server.listen(3000);
