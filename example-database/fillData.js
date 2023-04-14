const sequelize = require('../sequelize');

async function fillData() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');

	await sequelize.sync({ force: false });

	await sequelize.models.lab.bulkCreate([
		{
			lab_name: 'Lab 1'
		},
		{
			lab_name: 'Lab 2'
		},
		{
			lab_name: 'Lab 3'
		},
		{
			lab_name: 'Lab 4'
		},
		{
			lab_name: 'Lab 5'
		},
		{
			lab_name: 'Lab 6'
		},
		{
			lab_name: 'Lab 7'
		}
	]);
	await sequelize.models.teacher.bulkCreate([
		{
			name: 'Papas'
		},
		{
			name: 'Papadakis'
		},
		{
			name: 'Antonis'
		},
		{
			name: 'Spyrou'
		},
		{
			name: 'Ksenakis'
		},
		{
			name: 'Monolopoulos'
		},
		{
			name: 'Theoxarakhs'
		}
	]);
	await sequelize.models.student.bulkCreate([
		{
			name: 'Palikari 1'
		},
		{
			name: 'Palikari 2'
		},
		{
			name: 'Palikari 3'
		},
		{
			name: 'Palikari 4'
		},
		{
			name: 'Palikari 5'
		},
		{
			name: 'Palikari 6'
		},
		{
			name: 'Palikari 7'
		}
	]);

	await sequelize.models.labInstance.bulkCreate([
		{
			labId: 3,
			teacherId: 7,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
		{
			labId: 3,
			teacherId: 6,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
		{
			labId: 3,
			teacherId: 4,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
		{
			labId: 2,
			teacherId: 3,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
		{
			labId: 4,
			teacherId: 5,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
		{
			labId: 1,
			teacherId: 3,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
		{
			labId: 6,
			teacherId: 1,
			StartAt: '09:10',
			EndAt: '09:30',
			day: 1
		},
	]);

	await sequelize.models.subscription.bulkCreate([
		{
			labInstanceId: 3,
			studentId: 7
		},
		{
			labInstanceId: 3,
			studentId: 6
		},
		{
			labInstanceId: 3,
			studentId: 4
		},
		{
			labInstanceId: 2,
			studentId: 3
		},
		{
			labInstanceId: 4,
			studentId: 5
		},
		{
			labInstanceId: 1,
			studentId: 3
		},
		{
			labInstanceId: 6,
			studentId: 1
		},
	]);

	// labInstanceId

	console.log('Done!');
}

async function roleSetup() {
	await sequelize.models.roles.bulkCreate([
		{
			id: 1,
			name: "teacher"
		},

		{
			id: 2,
			name: "student"
		},

		{
			id: 3,
			name: "admin"
		},
	]);
}

roleSetup();

fillData();
