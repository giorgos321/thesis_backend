## Αρχιτεκτονική Συστήματος

Σε αυτή την ενότητα παρουσιάζεται η αρχιτεκτονική του συστήματος διαχείρισης εργαστηρίων. Η αρχιτεκτονική έχει σχεδιαστεί με γνώμονα την κλιμάκωση, την επεκτασιμότητα και τη συντηρησιμότητα του κώδικα. Το σύστημα ακολουθεί τις αρχές του REST (Representational State Transfer) και υιοθετεί μια πολυεπίπεδη αρχιτεκτονική που διαχωρίζει καθαρά τις διάφορες λειτουργίες του συστήματος.

### Επισκόπηση Αρχιτεκτονικής

Η εφαρμογή ακολουθεί μια τριεπίπεδη αρχιτεκτονική που αποτελείται από:

1. **Επίπεδο Παρουσίασης (Presentation Layer)**: Αν και δεν περιλαμβάνεται στον παρόντα κώδικα, αναφέρεται στο frontend της εφαρμογής που θα καταναλώνει το API.
2. **Επίπεδο Επιχειρησιακής Λογικής (Business Logic Layer)**: Περιλαμβάνει τους controllers και τους routers που διαχειρίζονται τα αιτήματα και την επιχειρησιακή λογική.
3. **Επίπεδο Δεδομένων (Data Layer)**: Περιλαμβάνει τα μοντέλα Sequelize και τη διεπαφή με τη βάση δεδομένων.

### Δομή Αρχείων

Η δομή των αρχείων του έργου είναι οργανωμένη κατά λειτουργία, διευκολύνοντας έτσι την κατανόηση και τη συντήρηση του κώδικα:

```
thesis_backend/
│
├── express/                  # Express.js εφαρμογή
│   ├── app.js                # Κύριο αρχείο της εφαρμογής Express
│   ├── routes/               # Δρομολογητές για τα διάφορα endpoints
│   │   ├── lab.js            # Δρομολογητές για τα εργαστήρια
│   │   ├── labInstance.js    # Δρομολογητές για τις συνεδρίες εργαστηρίων
│   │   ├── student.js        # Δρομολογητές για τους φοιτητές
│   │   ├── subscription.js   # Δρομολογητές για τις εγγραφές
│   │   ├── teachers.js       # Δρομολογητές για τους καθηγητές
│   │   └── users.js          # Δρομολογητές για τους χρήστες
│   │
│   ├── middleware/           # Middleware για αυθεντικοποίηση, επικύρωση, κλπ.
│   │   └── authJwt.js        # Middleware για JWT αυθεντικοποίηση
│   │
│   ├── auth/                 # Λειτουργικότητα αυθεντικοποίησης
│   │   └── auth.router.js    # Δρομολογητές για αυθεντικοποίηση
│   │
│   ├── general/              # Γενικές λειτουργίες και βοηθητικά
│   │
│   └── helpers.js            # Βοηθητικές συναρτήσεις
│
├── sequelize/                # Sequelize ORM και μοντέλα
│   ├── index.js              # Αρχικοποίηση Sequelize και σύνδεση
│   ├── extra-setup.js        # Επιπλέον ρυθμίσεις για το Sequelize
│   │
│   └── models/               # Ορισμοί μοντέλων Sequelize
│       ├── lab.model.js      # Μοντέλο για τα εργαστήρια
│       ├── labInstance.model.js # Μοντέλο για τις συνεδρίες εργαστηρίων
│       ├── labDetails.model.js # Μοντέλο για λεπτομέρειες εργαστηρίων
│       ├── role.model.js     # Μοντέλο για τους ρόλους χρηστών
│       ├── student.model.js  # Μοντέλο για τους φοιτητές
│       ├── subscription.model.js # Μοντέλο για τις εγγραφές
│       ├── teacher.model.js  # Μοντέλο για τους καθηγητές
│       └── user.model.js     # Μοντέλο για τους χρήστες
│
├── example-database/         # Σενάρια και δεδομένα παραδείγματος
│   ├── setup.js              # Σενάριο εγκατάστασης της βάσης δεδομένων
│   └── fillData.js           # Σενάριο πλήρωσης με δεδομένα παραδείγματος
│
├── index.js                  # Σημείο εισόδου της εφαρμογής
├── package.json              # Εξαρτήσεις του έργου και σενάρια npm
└── vercel.json               # Ρυθμίσεις για ανάπτυξη στο Vercel
```

### Ροή Εκτέλεσης

Η ροή εκτέλεσης της εφαρμογής ξεκινά από το `index.js`, το οποίο αρχικοποιεί τη σύνδεση με τη βάση δεδομένων και ξεκινάει τον Express server:

```javascript
// index.js
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
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}.`);
	});
}

init();
```

Ο κώδικας παραπάνω εκτελεί τα ακόλουθα βήματα:
1. Εισάγει την Express εφαρμογή από το `./express/app.js`
2. Εισάγει το Sequelize από το `./sequelize/index.js`
3. Ελέγχει τη σύνδεση με τη βάση δεδομένων
4. Ξεκινάει τον Express server στη προκαθορισμένη θύρα

Επιπλέον, υπάρχει υποστήριξη για serverless ανάπτυξη μέσω της βιβλιοθήκης `serverless-http`, επιτρέποντας την ανάπτυξη της εφαρμογής σε πλατφόρμες όπως το Vercel.

### Express Application

Το αρχείο `express/app.js` ορίζει την Express εφαρμογή, καθώς και τα διάφορα middleware και routers:

```javascript
// express/app.js (συντετμημένο)
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { authJwt } = require('./middleware');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require('./auth/auth.router');
auth(app);

// Ορισμός των διαδρομών API
for (const [routeName, routeController] of Object.entries(routes)) {
	const middleware = applyMiddleware([authJwt.verifyToken], routeName);
	
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			middleware,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	// Άλλες διαδρομές (getById, create, update, remove)...
}
```

Η εφαρμογή Express διαμορφώνεται με τα ακόλουθα middleware:
- `cors()`: Επιτρέπει cross-origin requests
- `bodyParser.json()`: Αναλύει τα JSON σώματα των αιτημάτων
- `bodyParser.urlencoded()`: Αναλύει τα urlencoded σώματα των αιτημάτων

Στη συνέχεια, οι διαδρομές API ορίζονται δυναμικά με βάση τους διαθέσιμους controllers. Κάθε διαδρομή συνδυάζεται με το κατάλληλο middleware αυθεντικοποίησης και εξουσιοδότησης, ανάλογα με τον τύπο πόρου.

### Sequelize Initialization

Το αρχείο `sequelize/index.js` αρχικοποιεί το Sequelize ORM και φορτώνει τα μοντέλα:

```javascript
// sequelize/index.js (συντετμημένο)
const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// Παράδειγμα διαμόρφωσης για ανάπτυξη
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  // Άλλες επιλογές...
});

// Ορισμός μοντέλων
const modelDefiners = [
  require('./models/user.model'),
  require('./models/lab.model'),
  require('./models/labInstance.model'),
  // Άλλα μοντέλα...
];

// Εφαρμογή των ορισμών μοντέλων στο sequelize
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Ορισμός των συσχετίσεων μεταξύ των μοντέλων
applyExtraSetup(sequelize);

module.exports = sequelize;
```

Το αρχείο αυτό:
1. Αρχικοποιεί μια σύνδεση Sequelize με τις κατάλληλες παραμέτρους
2. Φορτώνει και ορίζει όλα τα μοντέλα
3. Εφαρμόζει πρόσθετες ρυθμίσεις, συμπεριλαμβανομένων των συσχετίσεων μεταξύ των μοντέλων

### Controllers και Δρομολογητές

Οι controllers βρίσκονται στον κατάλογο `express/routes/` και διαχειρίζονται τη λογική των διαφόρων endpoints του API. Παρακάτω είναι ένα παράδειγμα του controller για τα εργαστήρια:

```javascript
// express/routes/lab.js (συντετμημένο)
const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
    const lab = await models.lab.findAll();
    res.status(200).json(lab);
};

async function getById(req, res) {
    const id = getIdParam(req);
    const lab = await models.lab.findByPk(id);
    if (lab) {
        res.status(200).json(lab);
    } else {
        res.status(404).send('404 - Not found');
    }
};

// Άλλες μέθοδοι (create, update, remove)...

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
```

Κάθε controller παρέχει μεθόδους για τις βασικές λειτουργίες CRUD (Create, Read, Update, Delete) για τον αντίστοιχο πόρο, οι οποίες αντιστοιχίζονται στις αντίστοιχες HTTP μεθόδους (GET, POST, PUT, DELETE).

### Middleware Αυθεντικοποίησης

Το middleware αυθεντικοποίησης βρίσκεται στον κατάλογο `express/middleware/` και είναι υπεύθυνο για την επαλήθευση των JWT tokens και τον έλεγχο των δικαιωμάτων πρόσβασης:

```javascript
// express/middleware/authJwt.js (υποθετικό παράδειγμα)
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { models } = require('../../sequelize');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isTeacher = (req, res, next) => {
  models.user.findByPk(req.userId).then(user => {
    if (user.role === '2') {
      next();
      return;
    }
    res.status(403).send({ message: 'Require Teacher Role!' });
  });
};

// Άλλα middleware...

module.exports = {
  verifyToken,
  isTeacher,
  // Άλλα middleware...
};
```

Αυτά τα middleware χρησιμοποιούνται για:
1. Την επαλήθευση του JWT token σε κάθε αίτημα
2. Τον έλεγχο των δικαιωμάτων του χρήστη με βάση το ρόλο του

### Σχέσεις Μοντέλων

Οι σχέσεις μεταξύ των μοντέλων ορίζονται στο αρχείο `sequelize/extra-setup.js`:

```javascript
// sequelize/extra-setup.js (υποθετικό παράδειγμα)
function applyExtraSetup(sequelize) {
  const { user, teacher, student, lab, labInstance, subscription } = sequelize.models;
  
  // Σχέση one-to-one μεταξύ χρήστη και καθηγητή
  user.hasOne(teacher);
  teacher.belongsTo(user);
  
  // Σχέση one-to-one μεταξύ χρήστη και φοιτητή
  user.hasOne(student);
  student.belongsTo(user);
  
  // Σχέση one-to-many μεταξύ καθηγητή και εργαστηρίων
  teacher.hasMany(lab);
  lab.belongsTo(teacher);
  
  // Σχέση one-to-many μεταξύ εργαστηρίου και συνεδριών εργαστηρίου
  lab.hasMany(labInstance);
  labInstance.belongsTo(lab);
  
  // Σχέση many-to-many μεταξύ φοιτητών και συνεδριών εργαστηρίου μέσω εγγραφών
  student.belongsToMany(labInstance, { through: subscription });
  labInstance.belongsToMany(student, { through: subscription });
}

module.exports = { applyExtraSetup };
```

Αυτό το αρχείο καθορίζει τις σχέσεις μεταξύ των διαφόρων μοντέλων, όπως one-to-one, one-to-many και many-to-many, επιτρέποντας τις σύνθετες ερωτήσεις και τη διατήρηση της αναφορικής ακεραιότητας.

### Υποστήριξη Serverless

Η εφαρμογή έχει σχεδιαστεί για να λειτουργεί τόσο ως παραδοσιακή εφαρμογή Node.js, όσο και ως serverless function:

```javascript
// index.js (συντετμημένο)
const serverless = require('serverless-http')

// Παραδοσιακή εκκίνηση Express server
app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}.`);
});

// Εξαγωγή ως serverless handler
module.exports.handler = serverless(app, {
  request: (req, event, context) => {
    req.event = event
    req.context = context
  }
})
```

Αυτή η προσέγγιση επιτρέπει στην εφαρμογή να αναπτυχθεί σε διάφορα περιβάλλοντα, συμπεριλαμβανομένων των παραδοσιακών servers και των serverless πλατφορμών όπως το Vercel.

### Σύνοψη

Η αρχιτεκτονική του συστήματος διαχείρισης εργαστηρίων έχει σχεδιαστεί με γνώμονα τις σύγχρονες πρακτικές ανάπτυξης εφαρμογών web. Η χρήση του Express.js για το επίπεδο API και του Sequelize για το επίπεδο δεδομένων, σε συνδυασμό με την καθαρή οργάνωση του κώδικα και τη χρήση middleware για τη διαχείριση των cross-cutting concerns, παρέχει ένα στιβαρό θεμέλιο για την εφαρμογή.

Η αρχιτεκτονική επιτρέπει επίσης την εύκολη επέκταση της εφαρμογής με νέα χαρακτηριστικά, καθώς και την ανάπτυξή της σε διάφορα περιβάλλοντα, από παραδοσιακούς servers μέχρι σύγχρονες serverless πλατφόρμες. 