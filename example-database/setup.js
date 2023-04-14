const sequelize = require('../sequelize');
const moment = require('moment');
const { pickRandom, randomDate } = require('./helpers/random');

async function reset() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');

	await sequelize.sync({ force: false });

	Date.prototype.addHours = function (h) {
		this.setTime(this.getTime() + (h * 60 * 60 * 1000));
		return this;
	}

	await sequelize.models.labs.bulkCreate([
		{
			lab_name: 'Lab 1',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			lab_name: 'Lab 2',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			lab_name: 'Lab 3',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			lab_name: 'Lab 4',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			lab_name: 'Lab 5',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			lab_name: 'Lab 6',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			lab_name: 'Lab 7',
			StartRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndRange: moment().format('YYYY-MM-DD HH:mm:ss'),
			StartAt: moment().format('YYYY-MM-DD HH:mm:ss'),
			EndAt: moment().format('YYYY-MM-DD HH:mm:ss')
		}
	]);
}

reset();
