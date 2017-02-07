import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';

import Pages from './pages/containers/Page.jsx';
import Layout from './pages/components/Layout.jsx';

function requestHandler(req, res) {
	const ctx = createServerRenderContext();

	let html = renderToString(
		<ServerRouter location={req.url} context={ctx}>
			<Pages />
		</ServerRouter>
	);

	const result = ctx.getResult();

	res.setHeader('Content-Type', 'text/html');

	if (result.redirect) {
		res.writeHead(301, {
			Location: result.redirect.pathname
		});
		res.end();
	}

	if (result.missed) {
		res.writeHead(404);

		html = renderToString(
			<ServerRouter location={req.url} context={ctx}>
				<Pages />
			</ServerRouter>
		);
	}

	res.write(
		renderToStaticMarkup(
			<Layout
				title="React con Redux, Curso de Platzi"
				content={html}
			/>
		)
	);
	// res.write(html);
	res.end();
}

const server = http.createServer(requestHandler);
server.listen(3000);
