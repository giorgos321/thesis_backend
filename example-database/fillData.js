const sequelize = require('../sequelize');

async function fillData() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');

	await sequelize.sync({ force: false });

	await sequelize.models.lab.bulkCreate([
		{
		  lab_name: "Εισαγωγή στον Προγραμματισμό",
		  lab_description: "Αυτή η τάξη παρέχει μια εισαγωγή στις έννοιες και τεχνικές του προγραμματισμού χρησιμοποιώντας μια γλώσσα προγραμματισμού υψηλού επιπέδου. Θέματα περιλαμβάνουν μεταβλητές, δομές ελέγχου, συναρτήσεις και βασικές δομές δεδομένων.",
		  lab_year: 2022,
		  lab_semester: 4
		},
		{
		  lab_name: "Δομές Δεδομένων και Αλγόριθμοι",
		  lab_description: "Αυτή η τάξη καλύπτει προηγμένες δομές δεδομένων και αλγόριθμους που χρησιμοποιούνται στην επιστήμη των υπολογιστών. Θέματα περιλαμβάνουν συνδεδεμένες λίστες, στοίβες, ουρές, δέντρα, γραφήματα, αλγόριθμους ταξινόμησης και αναζήτησης.",
		  lab_year: 2023,
		  lab_semester: 2
		},
		{
		  lab_name: "Συστήματα Διαχείρισης Βάσεων Δεδομένων",
		  lab_description: "Αυτή η τάξη επικεντρώνεται στις αρχές και τεχνικές των συστημάτων διαχείρισης βάσεων δεδομένων. Θέματα περιλαμβάνουν μοντελοποίηση δεδομένων, σχεσιακές βάσεις δεδομένων, SQL και σχεδίαση βάσεων δεδομένων.",
		  lab_year: 2021,
		  lab_semester: 5
		},
		{
		  lab_name: "Λειτουργικά Συστήματα",
		  lab_description: "Αυτή η τάξη εξερευνά τις έννοιες και τα στοιχεία των λειτουργικών συστημάτων. Θέματα περιλαμβάνουν διαχείριση διεργασιών, διαχείριση μνήμης, συστήματα αρχείων και συγχρονισμό.",
		  lab_year: 2021,
		  lab_semester: 3
		},
		{
		  lab_name: "Υπολογιστικά Δίκτυα",
		  lab_description: "Αυτή η τάξη καλύπτει τις βασικές αρχές των υπολογιστικών δικτύων και πρωτοκόλλων δικτύου. Θέματα περιλαμβάνουν αρχιτεκτονική δικτύου, TCP/IP, δρομολόγηση, ασφάλεια δικτύου και ασύρματα δίκτυα.",
		  lab_year: 2020,
		  lab_semester: 1
		},
		{
		  lab_name: "Ανάπτυξη Ιστού",
		  lab_description: "Αυτή η τάξη επικεντρώνεται στην ανάπτυξη δυναμικών εφαρμογών ιστού. Θέματα περιλαμβάνουν HTML, CSS, JavaScript, server-side scripting και πλαίσια όπως το Node.js και το React.",
		  lab_year: 2022,
		  lab_semester: 1
		},
		{
		  lab_name: "Τεχνητή Νοημοσύνη",
		  lab_description: "Αυτή η τάξη εξερευνά τις έννοιες και τεχνικές της τεχνητής νοημοσύνης. Θέματα περιλαμβάνουν μηχανική μάθηση, επεξεργασία φυσικής γλώσσας, νευρωνικά δίκτυα και έξυπνους πράκτορες.",
		  lab_year: 2023,
		  lab_semester: 7
		}
	  ]);
	await sequelize.models.teacher.bulkCreate([
		{
		  name: "Δημήτριος Παπαδόπουλος"
		},
		{
		  name: "Αθηνά Καραμανλή"
		},
		{
		  name: "Ελευθερία Νικολάου"
		},
		{
		  name: "Γεώργιος Σταματόπουλος"
		},
		{
		  name: "Σοφία Ανδρέου"
		},
		{
		  name: "Νικόλαος Γεωργίου"
		},
		{
		  name: "Ελένη Παπανδρέου"
		},
		{
		  name: "Ανδρέας Κυριακού"
		},
		{
		  name: "Μαρία Αντωνίου"
		},
		{
		  name: "Πέτρος Παπαδόπουλος"
		},
		{
		  name: "Δημήτρης Χριστοδούλου"
		},
		{
		  name: "Αναστασία Κωνσταντίνου"
		},
		{
		  name: "Χρήστος Δημητρίου"
		},
		{
		  name: "Ευαγγελία Παναγιώτου"
		},
		{
		  name: "Ιωάννα Παπανικολάου"
		},
		{
		  name: "Θεόδωρος Μαρκόπουλος"
		},
		{
		  name: "Αλεξάνδρα Λεοντίου"
		},
		{
		  name: "Δημήτριος Πέτρου"
		},
		{
		  name: "Αικατερίνη Κυριακίδου"
		},
		{
		  name: "Μιχάλης Στεφανίδης"
		},
		{
		  name: "Φωτεινή Παντελίδου"
		},
		{
		  name: "Γεώργιος Παπαδάκης"
		},
		{
		  name: "Αθανάσιος Βλαχάκης"
		},
		{
		  name: "Αναστασία Μαρκοπούλου"
		},
		{
		  name: "Κωνσταντίνος Σπυρίδωνος"
		},
		{
		  name: "Ελένη Νικολάου"
		},
		{
		  name: "Σταμάτης Αντωνίου"
		},
		{
		  name: "Μαρία Στεφανίδη"
		},
		{
		  name: "Παύλος Κυριακού"
		},
		{
		  name: "Δήμητρα Παπανδρέου"
		},
		{
		  name: "Ιάκωβος Καραμανλής"
		}
	  ]);
	await sequelize.models.student.bulkCreate([
		{
		  name: "Γεώργιος Δημητρίου",
		  register_number: 1351
		},
		{
		  name: "Αναστασία Καραμαντζίου",
		  register_number: 5351
		},
		{
		  name: "Ευαγγελία Παπαναστασίου",
		  register_number: 9351
		},
		{
		  name: "Σπυρίδων Ανδρέου",
		  register_number: 3351
		},
		{
		  name: "Ελένη Μαρκοπούλου",
		  register_number: 7351
		},
		{
		  name: "Δημήτριος Νικολαΐδης",
		  register_number: 2351
		},
		{
		  name: "Μαρία Σωτηρίου",
		  register_number: 6351
		},
		{
		  name: "Αθανάσιος Παναγιώτου",
		  register_number: 2351
		},
		{
		  name: "Κατερίνα Σπυροπούλου",
		  register_number: 4351
		},
		{
		  name: "Παύλος Κωνσταντινίδης",
		  register_number: 7451
		},
		{
		  name: "Χριστίνα Παπαδάκη",
		  register_number: 2351
		},
		{
		  name: "Γιώργος Βλαχάκης",
		  register_number: 6351
		},
		{
		  name: "Μαρία Κυριακίδη",
		  register_number: 2351
		},
		{
		  name: "Δημοσθένης Παπαδόπουλος",
		  register_number: 4351
		},
		{
		  name: "Σοφία Ανδρικοπούλου",
		  register_number: 8351
		},
		{
		  name: "Νικόλαος Παπαγιάννης",
		  register_number: 2351
		},
		{
		  name: "Αγγελική Σταματίου",
		  register_number: 6351
		},
		{
		  name: "Θεοδόσης Λεοντίου",
		  register_number: 2351
		},
		{
		  name: "Δέσποινα Μιχαηλίδου",
		  register_number: 4351
		},
		{
		  name: "Αλέξανδρος Κωνσταντίνου",
		  register_number: 8351
		},
		{
		  name: "Χρυσάνθη Νικολαΐδου",
		  register_number: 2351
		},
		{
		  name: "Στέλιος Μαρκού",
		  register_number: 6351
		},
		{
		  name: "Αντωνία Σπυρίδωνος",
		  register_number: 2351
		},
		{
		  name: "Ιάσονας Παπαγεωργίου",
		  register_number: 4351
		},
		{
		  name: "Ελισάβετ Χριστοφορίδου",
		  register_number: 8351
		},
		{
		  name: "Μιχάλης Παπαδόπουλος",
		  register_number: 2351
		},
		{
		  name: "Δήμητρα Πετρίδου",
		  register_number: 6351
		},
		{
		  name: "Παναγιώτης Αναστασιάδης",
		  register_number: 2351
		},
		{
		  name: "Ελένη Κυριακοπούλου",
		  register_number: 4351
		},
		{
		  name: "Κωνσταντίνος Δημόπουλος",
		  register_number: 8351
		},
		{
		  name: "Σταμάτης Σωτηριάδης",
		  register_number: 2351
		}
	  ]);

	await sequelize.models.labInstance.bulkCreate([
		{
			labId: 3,
			teacherId: 1,
			startTime: '10:00',
			endTime: '12:30',
			daysOfWeek: '1',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#2196F3'
		},
		{
			labId: 3,
			teacherId: 1,
			startTime: '12:00',
			endTime: '14:30',
			daysOfWeek: '2',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#4CAF50'
		},
		{
			labId: 3,
			teacherId: 1,
			startTime: '13:00',
			endTime: '15:30',
			daysOfWeek: '3',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#4CAF50'
		},
		{
			labId: 2,
			teacherId: 2,
			startTime: '17:00',
			endTime: '19:30',
			daysOfWeek: '4',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#2196F3'
		},
		{
			labId: 4,
			teacherId: 2,
			startTime: '19:00',
			endTime: '21:30',
			daysOfWeek: '5',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#2196F3'
		},
		{
			labId: 1,
			teacherId: 2,
			startTime: '09:00',
			endTime: '10:30',
			daysOfWeek: '4',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#4CAF50'
		},
		{
			labId: 6,
			teacherId: 2,
			startTime: '09:00',
			endTime: '11:30',
			daysOfWeek: '1',
			startRecur: "2023-05-02",
    		endRecur: "2023-10-30",
			color: '#2196F3'
		},
	]);

	await sequelize.models.user.bulkCreate([{
		email: 'admin@admin.com',
		username: 'admin',
		password: '$2a$08$izpxbnDlA7CNiLhflqECUOxlfFgvp4us.7c6RIyhknkaRk/qkPPw2',
		role: 3
	},
	{
		email: 'lame.giorgos@gmail.com',
		username: 'George',
		password: '$2a$08$izpxbnDlA7CNiLhflqECUOxlfFgvp4us.7c6RIyhknkaRk/qkPPw2',
		role: 1
	}])

	// lame.giorgos@gmail.com	George	$2a$08$izpxbnDlA7CNiLhflqECUOxlfFgvp4us.7c6RIyhknkaRk/qkPPw2
	await sequelize.models.subscription.bulkCreate([
		{
			labInstanceId: 3,
			studentId: 6,
			subscriptionDate: "2023-05-02"
		},
		{
			labInstanceId: 3,
			studentId: 6,
			subscriptionDate: "2023-06-02"
		},
		{
			labInstanceId: 3,
			studentId: 4,
			subscriptionDate: "2023-05-02"
		},
		{
			labInstanceId: 2,
			studentId: 3,
			subscriptionDate: "2023-05-02"
		},
		{
			labInstanceId: 4,
			studentId: 5,
			subscriptionDate: "2023-05-02"
		},
		{
			labInstanceId: 1,
			studentId: 3,
			subscriptionDate: "2023-05-02"
		},
		{
			labInstanceId: 6,
			studentId: 1,
			subscriptionDate: "2023-05-02"
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

// await sequelize.models



// roleSetup();

// fillData();

module.exports.roleSetup = roleSetup;
module.exports.fillData = fillData;
