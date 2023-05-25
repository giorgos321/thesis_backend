const sequelize = require('../sequelize');

export async function fillData() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');

	await sequelize.sync({ force: false });

	await sequelize.models.lab.bulkCreate([
		{
			lab_name: "Introduction to Programming",
			lab_description: "This class provides an introduction to programming concepts and techniques using a high-level programming language. Topics include variables, control structures, functions, and basic data structures."
		  },
		  {
			lab_name: "Data Structures and Algorithms",
			lab_description: "This class covers advanced data structures and algorithms used in computer science. Topics include linked lists, stacks, queues, trees, graphs, sorting algorithms, and searching algorithms."
		  },
		  {
			lab_name: "Database Management Systems",
			lab_description: "This class focuses on the principles and techniques of database management systems. Topics include data modeling, relational databases, SQL, and database design."
		  },
		  {
			lab_name: "Operating Systems",
			lab_description: "This class explores the concepts and components of operating systems. Topics include process management, memory management, file systems, and synchronization."
		  },
		  {
			lab_name: "Computer Networks",
			lab_description: "This class covers the fundamentals of computer networks and network protocols. Topics include network architecture, TCP/IP, routing, network security, and wireless networks."
		  },
		  {
			lab_name: "Web Development",
			lab_description: "This class focuses on developing dynamic web applications. Topics include HTML, CSS, JavaScript, server-side scripting, and frameworks like Node.js and React."
		  },
		  {
			lab_name: "Artificial Intelligence",
			lab_description: "This class explores the concepts and techniques of artificial intelligence. Topics include machine learning, natural language processing, neural networks, and intelligent agents."
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
			name: 'Palikari 1',
			register_number: 3250
		},
		{
			name: 'Palikari 2',
			register_number: 3250
		},
		{
			name: 'Palikari 3',
			register_number: 3250
		},
		{
			name: 'Palikari 4',
			register_number: 3250
		},
		{
			name: 'Palikari 5',
			register_number: 3250
		},
		{
			name: 'Palikari 6',
			register_number: 3250
		},
		{
			name: 'Palikari 7',
			register_number: 3250
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

export async function roleSetup() {
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
