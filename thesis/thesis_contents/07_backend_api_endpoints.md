### API Endpoints

Σε αυτή την ενότητα παρουσιάζονται αναλυτικά τα API endpoints που παρέχει το σύστημα διαχείρισης εργαστηρίων. Το σύστημα ακολουθεί τις αρχές του REST (Representational State Transfer), προσφέροντας ένα σαφές και συνεπές API για την πρόσβαση και διαχείριση των πόρων του συστήματος.

### Δομή API

Όλα τα endpoints του API ακολουθούν μια συνεπή δομή με βάση τον τύπο του πόρου και την επιθυμητή ενέργεια:

```
/api/{resource}           # Λίστα πόρων (GET) ή δημιουργία νέου πόρου (POST)
/api/{resource}/{id}      # Ανάκτηση (GET), ενημέρωση (PUT) ή διαγραφή (DELETE) συγκεκριμένου πόρου
```

Ο κώδικας που ορίζει αυτή τη δομή βρίσκεται στο αρχείο `express/app.js`:

```javascript
// Ορισμός των standard REST APIs για κάθε διαδρομή
for (const [routeName, routeController] of Object.entries(routes)) {
	const middleware = applyMiddleware([authJwt.verifyToken], routeName);
	
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
```

Αυτή η προσέγγιση διασφαλίζει ότι όλα τα endpoints ακολουθούν την ίδια σύμβαση ονοματοδοσίας και συμπεριφορά, διευκολύνοντας έτσι τη χρήση του API.

### Αυθεντικοποίηση

Πριν εξετάσουμε τα επιμέρους endpoints, είναι σημαντικό να αναφέρουμε ότι όλα τα endpoints του API (εκτός από αυτά που σχετίζονται με την αυθεντικοποίηση) απαιτούν έναν έγκυρο JSON Web Token (JWT) για την πρόσβαση. Το token αυτό πρέπει να συμπεριληφθεί στην κεφαλίδα `x-access-token` κάθε αιτήματος.

#### Endpoints Αυθεντικοποίησης

```
POST /api/auth/signup    # Εγγραφή νέου χρήστη
POST /api/auth/signin    # Είσοδος χρήστη και λήψη JWT token
```

Αυτά τα endpoints διαχειρίζονται την εγγραφή και την είσοδο των χρηστών στο σύστημα. Το endpoint signup επιτρέπει τη δημιουργία νέων λογαριασμών χρηστών, ενώ το endpoint signin παρέχει ένα JWT token που απαιτείται για την πρόσβαση στα υπόλοιπα endpoints του API.

### Endpoints Χρηστών

#### Διαχείριση Χρηστών

```
GET    /api/user         # Ανάκτηση λίστας όλων των χρηστών
GET    /api/user/{id}    # Ανάκτηση συγκεκριμένου χρήστη με βάση το ID
POST   /api/user         # Δημιουργία νέου χρήστη
PUT    /api/user/{id}    # Ενημέρωση υπάρχοντος χρήστη
DELETE /api/user/{id}    # Διαγραφή χρήστη
```

Αυτά τα endpoints επιτρέπουν τη διαχείριση των χρηστών του συστήματος. Ο κώδικας για το endpoint που ανακτά όλους τους χρήστες είναι:

```javascript
// express/routes/users.js
async function getAll(req, res) {
    const users = await models.user.findAll();
    res.status(200).json(users);
};
```

#### Διαχείριση Καθηγητών

```
GET    /api/teacher         # Ανάκτηση λίστας όλων των καθηγητών
GET    /api/teacher/{id}    # Ανάκτηση συγκεκριμένου καθηγητή με βάση το ID
POST   /api/teacher         # Δημιουργία νέου καθηγητή
PUT    /api/teacher/{id}    # Ενημέρωση υπάρχοντος καθηγητή
DELETE /api/teacher/{id}    # Διαγραφή καθηγητή
```

Αυτά τα endpoints επιτρέπουν τη διαχείριση των καθηγητών στο σύστημα. Ο κώδικας για το endpoint που δημιουργεί έναν νέο καθηγητή είναι:

```javascript
// express/routes/teachers.js
async function create(req, res) {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    } else {
        await models.teacher.create(req.body);
        res.status(201).end();
    }
};
```

#### Διαχείριση Φοιτητών

```
GET    /api/student         # Ανάκτηση λίστας όλων των φοιτητών
GET    /api/student/{id}    # Ανάκτηση συγκεκριμένου φοιτητή με βάση το ID
POST   /api/student         # Δημιουργία νέου φοιτητή
PUT    /api/student/{id}    # Ενημέρωση υπάρχοντος φοιτητή
DELETE /api/student/{id}    # Διαγραφή φοιτητή
```

Αυτά τα endpoints επιτρέπουν τη διαχείριση των φοιτητών στο σύστημα. Ο κώδικας για το endpoint που ανακτά έναν συγκεκριμένο φοιτητή είναι:

```javascript
// express/routes/student.js
async function getById(req, res) {
    const id = getIdParam(req);
    const student = await models.student.findByPk(id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).send('404 - Not found');
    }
};
```

### Endpoints Εργαστηρίων

#### Διαχείριση Εργαστηρίων

```
GET    /api/labs         # Ανάκτηση λίστας όλων των εργαστηρίων
GET    /api/labs/{id}    # Ανάκτηση συγκεκριμένου εργαστηρίου με βάση το ID
POST   /api/labs         # Δημιουργία νέου εργαστηρίου
PUT    /api/labs/{id}    # Ενημέρωση υπάρχοντος εργαστηρίου
DELETE /api/labs/{id}    # Διαγραφή εργαστηρίου και των συνεδριών του
```

Αυτά τα endpoints επιτρέπουν τη διαχείριση των εργαστηρίων στο σύστημα. Ο κώδικας για το endpoint που διαγράφει ένα εργαστήριο είναι ιδιαίτερα ενδιαφέρον, καθώς διαγράφει επίσης όλες τις συνεδρίες που σχετίζονται με αυτό:

```javascript
// express/routes/lab.js
async function remove(req, res) {
    const id = getIdParam(req);
    await models.lab.destroy({
        where: {
            id: id
        }
    });

    await models.labInstance.destroy({
        where: {
            labId: id
        }
    });
    
    res.status(200).end();
};
```

#### Διαχείριση Συνεδριών Εργαστηρίου

```
GET    /api/labinstance         # Ανάκτηση λίστας όλων των συνεδριών εργαστηρίου
GET    /api/labinstance/{id}    # Ανάκτηση συγκεκριμένης συνεδρίας με βάση το ID
POST   /api/labinstance         # Δημιουργία νέας συνεδρίας εργαστηρίου
PUT    /api/labinstance/{id}    # Ενημέρωση υπάρχουσας συνεδρίας εργαστηρίου
DELETE /api/labinstance/{id}    # Διαγραφή συνεδρίας εργαστηρίου
```

Αυτά τα endpoints επιτρέπουν τη διαχείριση των συνεδριών εργαστηρίου. Ο κώδικας για το endpoint που δημιουργεί μια νέα συνεδρία είναι:

```javascript
// express/routes/labInstance.js
async function create(req, res) {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    } else {
        await models.labInstance.create(req.body);
        res.status(201).end();
    }
};
```

### Endpoints Εγγραφών

#### Διαχείριση Εγγραφών

```
GET    /api/subscriptions         # Ανάκτηση λίστας όλων των εγγραφών
GET    /api/subscriptions/{id}    # Ανάκτηση συγκεκριμένης εγγραφής με βάση το ID
POST   /api/subscriptions         # Δημιουργία νέας εγγραφής
PUT    /api/subscriptions/{id}    # Ενημέρωση υπάρχουσας εγγραφής
DELETE /api/subscriptions/{id}    # Διαγραφή εγγραφής
```

Αυτά τα endpoints επιτρέπουν τη διαχείριση των εγγραφών των φοιτητών σε συνεδρίες εργαστηρίου. Ο κώδικας για το endpoint που ανακτά όλες τις εγγραφές είναι:

```javascript
// express/routes/subscription.js
async function getAll(req, res) {
    const subscription = await models.subscription.findAll();
    res.status(200).json(subscription);
};
```

### Περιορισμός Πρόσβασης βάσει Ρόλων

Κάθε endpoint περιορίζεται με βάση το ρόλο του χρήστη που κάνει το αίτημα. Αυτό επιτυγχάνεται μέσω του middleware `authJwt`, το οποίο ελέγχει το ρόλο του χρήστη:

```javascript
// express/app.js
function applyMiddleware(middleware, routeName) {
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
```

Όπως φαίνεται από τον παραπάνω κώδικα, τα περισσότερα endpoints απαιτούν ο χρήστης να έχει ρόλο καθηγητή για να έχει πρόσβαση σε αυτά. Αυτό διασφαλίζει ότι μόνο εξουσιοδοτημένοι χρήστες μπορούν να διαχειριστούν τους πόρους του συστήματος.

### Διαχείριση Σφαλμάτων

Το API χρησιμοποιεί τυποποιημένους κωδικούς κατάστασης HTTP για να υποδείξει την επιτυχία ή την αποτυχία ενός αιτήματος:

- **200 OK**: Το αίτημα ήταν επιτυχές (για GET, PUT, DELETE)
- **201 Created**: Ο πόρος δημιουργήθηκε επιτυχώς (για POST)
- **400 Bad Request**: Το αίτημα περιείχε μη έγκυρα δεδομένα
- **401 Unauthorized**: Απαιτείται αυθεντικοποίηση
- **403 Forbidden**: Ο χρήστης δεν έχει τα απαραίτητα δικαιώματα
- **404 Not Found**: Ο ζητούμενος πόρος δεν βρέθηκε
- **500 Internal Server Error**: Σφάλμα στον server

Για να αποφευχθεί η διαρροή ευαίσθητων πληροφοριών, τα σφάλματα που προκύπτουν κατά την επεξεργασία των αιτημάτων εμφανίζονται με τυποποιημένο τρόπο:

```javascript
// express/app.js
function makeHandlerAwareOfAsyncErrors(handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            res.status(500).send(error)
        }
    };
}
```

Αυτή η συνάρτηση περιτυλίγει όλους τους χειριστές διαδρομών, διασφαλίζοντας ότι τα σφάλματα που προκύπτουν κατά την ασύγχρονη επεξεργασία αντιμετωπίζονται κατάλληλα.

### Παραδείγματα Αιτημάτων και Απαντήσεων

#### Δημιουργία Νέου Εργαστηρίου

**Αίτημα**:
```http
POST /api/labs HTTP/1.1
Host: example.com
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "lab_name": "Εργαστήριο Προγραμματισμού",
  "lab_description": "Εισαγωγή στον Προγραμματισμό με Python",
  "lab_year": 1,
  "lab_semester": 2,
  "teacherId": 1
}
```

**Απάντηση**:
```http
HTTP/1.1 201 Created
```

#### Ανάκτηση Εγγραφών Φοιτητή

**Αίτημα**:
```http
GET /api/subscriptions?studentId=5 HTTP/1.1
Host: example.com
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Απάντηση**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 10,
    "status": "approved",
    "grade": 8.5,
    "studentId": 5,
    "labInstanceId": 3,
    "createdAt": "2023-03-15T10:30:00.000Z",
    "updatedAt": "2023-03-20T14:45:00.000Z"
  },
  {
    "id": 11,
    "status": "pending",
    "grade": null,
    "studentId": 5,
    "labInstanceId": 4,
    "createdAt": "2023-03-16T09:15:00.000Z",
    "updatedAt": "2023-03-16T09:15:00.000Z"
  }
]
```

### Επέκταση του API

Το API έχει σχεδιαστεί με τρόπο που επιτρέπει την εύκολη επέκτασή του με νέα endpoints και λειτουργικότητες. Για την προσθήκη ενός νέου τύπου πόρου, απαιτούνται τα εξής βήματα:

1. Δημιουργία ενός νέου μοντέλου Sequelize
2. Υλοποίηση ενός νέου controller με τις βασικές μεθόδους CRUD
3. Προσθήκη του controller στο αντικείμενο `routes` στο αρχείο `express/app.js`

Μετά από αυτά τα βήματα, το νέο endpoint θα είναι αυτόματα διαθέσιμο με όλες τις βασικές λειτουργίες CRUD.

### Συμπέρασμα

Το API του συστήματος διαχείρισης εργαστηρίων παρέχει ένα πλήρες σύνολο endpoints για τη διαχείριση όλων των πτυχών του συστήματος. Ακολουθώντας τις αρχές του REST και χρησιμοποιώντας JSON Web Tokens για την αυθεντικοποίηση, το API είναι ασφαλές, συνεπές και εύκολο στη χρήση.

Η καθαρή δομή του κώδικα και η συνεπής ονοματοδοσία των endpoints διευκολύνουν την ανάπτυξη client εφαρμογών που αλληλεπιδρούν με το API, ενώ η χρήση των τυποποιημένων κωδικών κατάστασης HTTP εξασφαλίζει ότι οι clients μπορούν να ερμηνεύσουν εύκολα τις απαντήσεις του API. 