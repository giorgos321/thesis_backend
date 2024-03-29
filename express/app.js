const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { authJwt } = require('./middleware');

const sequelize = require('../sequelize');

const routes = {
	user: require('./routes/users'),
	labs: require('./routes/lab'),
	teacher: require('./routes/teachers'),
	labinstance: require('./routes/labInstance'),
	student: require('./routes/student'),
	subscriptions: require('./routes/subscription')
	// Add more routes here...
	// items: require('./routes/items'),
};



const app = express();



app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require('./auth/auth.router');
const { roleSetup, fillData } = require('../example-database/fillData');

auth(app)

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function (req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			res.status(500).send(error)
		}
	};
}

// We provide a root route just as an example
app.get('/', (req, res) => {
	res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});

app.get('/resetdb', async (req, res) => {
	try {
		await sequelize.sync({ force: true });

		await roleSetup();

		await fillData();

		res.status(200).send('Data filled successfully to DB')
	} catch (error) {
		res.status(500).send(error)
	}
})

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	
	const middleware = applyMiddleware([authJwt.verifyToken],routeName);
	
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			middleware,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`/api/${routeName}/:id`,
			middleware,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			middleware,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			middleware,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`/api/${routeName}/:id`,
			middleware,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}
}

function applyMiddleware(middleware,routeName) {
	switch (routeName) {
		case 'user':
			middleware.push(authJwt.isTeacher)
			break;
		case 'labs':
			middleware.push(authJwt.isTeacher)
			break;
		case 'teacher':
			middleware.push(authJwt.isTeacher)
			break;
		case 'labinstance':
			middleware.push(authJwt.isTeacher)
			break;
		case 'student':
			middleware.push(authJwt.isTeacher)
			break;
		case 'subscriptions':
			middleware.push(authJwt.isTeacher)
			break;
		default:
			break;
	}
	return middleware;
}

module.exports = app;
