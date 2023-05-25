const app = require('./express/app');
const serverless = require('serverless-http')
const sequelize = require('./sequelize');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		// process.exit(1);
	}
}

async function init() {
	// await assertDatabaseConnectionOk();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);	

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});
}

init();

// module.exports.handler = serverless(app,{
// 	request: (req,event,context) => {
// 		req.event = event
// 		req.context = context
// 	}
// })