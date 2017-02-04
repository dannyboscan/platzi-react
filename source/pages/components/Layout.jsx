import React from 'react';

const Layout = props => {
	return (
		<html lang="en">
		<head>
			<meta charSet="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>

			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"/>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
			<link rel="stylesheet" href="http://localhost:3001/style.css"/>

			<title>{props.title}</title>
		</head>
		<body>
			<div
				id="render-target"
				dangerouslySetInnerHTML={{
					__html: props.content
				}}
			/>


			<script src="http://localhost:3001/app.js"></script>
		</body>
		</html>
	);
};

export default Layout;
