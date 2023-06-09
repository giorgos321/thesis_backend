const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
require('dotenv').config()
const mysql2 = require('mysql2');

const checkForArg = (strArg) => {
	for (const arg of process.argv.filter(a => a.includes('--'))) {
		if (arg === strArg) {
			return true;
		}
	}
	return false;
}

const connectToDB = () => {
	
	if(checkForArg('--localDB')){
		try {
			console.log('Trying to connect to localDB');
			return new Sequelize('app','root','root',{
				dialect: "mysql",
				dialectModule: mysql2
			});
		} catch (error) {
			console.log(error);
		}
		
	} else {
		try {
			const { PLANETSCALE_DB_HOST, PLANETSCALE_DB_USERNAME, PLANETSCALE_DB_PASSWORD} = process.env;

			console.log('Trying to connect to remoteDB');
			return new Sequelize('app',PLANETSCALE_DB_USERNAME,PLANETSCALE_DB_PASSWORD,{
				host: PLANETSCALE_DB_HOST,
				dialect: "mysql",
				dialectModule: mysql2,
				dialectOptions: {
					ssl: {
					rejectUnauthorized: true,
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}
}

const sequelize = connectToDB();

if(checkForArg('--sync')){
sequelize.sync({ force: true });
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
