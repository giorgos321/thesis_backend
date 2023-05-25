const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
require('dotenv').config()
const mysql2 = require('mysql2');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DATABASE_URL);
const sequelize = new Sequelize({
	database: 'test',
	username: process.env.TIDB_USER,
	password: process.env.TIDB_PASSWORD,
	host: process.env.TIDB_HOST,
	port: process.env.TIDB_PORT,
	dialect: "mysql",
	dialectModule: mysql2,
	ssl: {
		minVersion: 'TLSv1.2',
		rejectUnauthorized: true,
		ca: process.env.TIDB_SSL_CA
		}
  });

// console.log(process.argv);
for (const arg of process.argv.filter(a => a.includes('--'))) {
	// console.log(arg);
	if (arg === '--sync') {
		sequelize.sync({ force: true });
	}
}

const modelDefiners = [
	require('./models/user.model'),
	require('./models/role.model'),
	
	require('./models/lab.model'),
	require('./models/teacher.model'),
	// require('./models/labDetails.model'),
	require('./models/labInstance.model'),
	require('./models/student.model'),
	require('./models/subscription.model')

	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
