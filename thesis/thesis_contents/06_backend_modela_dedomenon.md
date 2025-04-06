## Μοντέλα Δεδομένων

Σε αυτή την ενότητα παρουσιάζονται αναλυτικά τα μοντέλα δεδομένων που χρησιμοποιούνται στο σύστημα διαχείρισης εργαστηρίων. Τα μοντέλα αυτά αποτελούν τη βάση για την αποθήκευση και διαχείριση των πληροφοριών που σχετίζονται με τους χρήστες, τα εργαστήρια, τις συνεδρίες εργαστηρίων και τις εγγραφές των φοιτητών.

Το σύστημα χρησιμοποιεί το Sequelize ως Object-Relational Mapping (ORM) framework, το οποίο μας επιτρέπει να ορίσουμε τα μοντέλα δεδομένων σε JavaScript και να τα αντιστοιχίσουμε αυτόματα σε πίνακες της βάσης δεδομένων.

### Μοντέλο Χρήστη (User)

Το μοντέλο χρήστη αποτελεί τη βάση για όλους τους χρήστες του συστήματος, συμπεριλαμβανομένων των καθηγητών και των φοιτητών. Περιέχει βασικές πληροφορίες ταυτοποίησης και αυθεντικοποίησης.

```javascript
// sequelize/models/user.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: false
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				// Απαιτούμε τα ονόματα χρηστών να έχουν μήκος τουλάχιστον 3 χαρακτήρων,
				// και να χρησιμοποιούν μόνο γράμματα, αριθμούς και κάτω παύλες.
				is: /^\w{3,}$/
			}
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: false
		},
		role: {
			allowNull: false,
			type: DataTypes.ENUM('1','2','3')
		}
	});
};
```

Τα πεδία του μοντέλου χρήστη είναι:
- **id**: Αυτόματα αυξανόμενο μοναδικό αναγνωριστικό
- **email**: Διεύθυνση ηλεκτρονικού ταχυδρομείου του χρήστη
- **username**: Μοναδικό όνομα χρήστη που χρησιμοποιείται για την είσοδο στο σύστημα
- **password**: Κρυπτογραφημένος κωδικός πρόσβασης
- **role**: Ο ρόλος του χρήστη στο σύστημα (1: Διαχειριστής, 2: Καθηγητής, 3: Φοιτητής)

### Μοντέλο Ρόλου (Role)

Το μοντέλο ρόλου ορίζει τους διαφορετικούς ρόλους που μπορούν να έχουν οι χρήστες στο σύστημα.

```javascript
// sequelize/models/role.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('role', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
};
```

Τα πεδία του μοντέλου ρόλου είναι:
- **id**: Μοναδικό αναγνωριστικό του ρόλου
- **name**: Όνομα του ρόλου (π.χ. "admin", "teacher", "student")

### Μοντέλο Καθηγητή (Teacher)

Το μοντέλο καθηγητή επεκτείνει το μοντέλο χρήστη, προσθέτοντας πληροφορίες ειδικές για τους καθηγητές.

```javascript
// sequelize/models/teacher.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('teacher', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    });
};
```

Στο συγκεκριμένο μοντέλο, δεν προστίθενται επιπλέον πεδία πέρα από το αναγνωριστικό, καθώς οι βασικές πληροφορίες του καθηγητή (όπως το email και το username) περιέχονται ήδη στο μοντέλο χρήστη. Η σχέση μεταξύ των μοντέλων χρήστη και καθηγητή είναι one-to-one, δηλαδή κάθε εγγραφή καθηγητή συνδέεται με ακριβώς μία εγγραφή χρήστη.

### Μοντέλο Φοιτητή (Student)

Το μοντέλο φοιτητή, όπως και το μοντέλο καθηγητή, επεκτείνει το μοντέλο χρήστη, προσθέτοντας πληροφορίες ειδικές για τους φοιτητές.

```javascript
// sequelize/models/student.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('student', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        student_id: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    });
};
```

Τα πεδία του μοντέλου φοιτητή είναι:
- **id**: Αυτόματα αυξανόμενο μοναδικό αναγνωριστικό
- **student_id**: Μοναδικός αριθμός μητρώου φοιτητή

Η σχέση μεταξύ των μοντέλων χρήστη και φοιτητή είναι επίσης one-to-one, δηλαδή κάθε εγγραφή φοιτητή συνδέεται με ακριβώς μία εγγραφή χρήστη.

### Μοντέλο Εργαστηρίου (Lab)

Το μοντέλο εργαστηρίου αντιπροσωπεύει ένα εργαστηριακό μάθημα που προσφέρεται στους φοιτητές.

```javascript
// sequelize/models/lab.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('lab', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        lab_name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        lab_description: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        lab_year: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false
        },
        lab_semester: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: false
        }
    });
}
```

Τα πεδία του μοντέλου εργαστηρίου είναι:
- **id**: Αυτόματα αυξανόμενο μοναδικό αναγνωριστικό
- **lab_name**: Όνομα του εργαστηριακού μαθήματος
- **lab_description**: Περιγραφή του εργαστηριακού μαθήματος
- **lab_year**: Έτος σπουδών στο οποίο ανήκει το εργαστήριο
- **lab_semester**: Εξάμηνο σπουδών στο οποίο ανήκει το εργαστήριο

Κάθε εργαστήριο ανήκει σε έναν καθηγητή (σχέση many-to-one με το μοντέλο καθηγητή).

### Μοντέλο Συνεδρίας Εργαστηρίου (Lab Instance)

Το μοντέλο συνεδρίας εργαστηρίου αντιπροσωπεύει μια συγκεκριμένη συνεδρία ενός εργαστηριακού μαθήματος, με συγκεκριμένη ημερομηνία, ώρα και διάρκεια.

```javascript
// sequelize/models/labInstance.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('labInstance', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        StartAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        EndAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        max_students: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        active: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        teams_allowed: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};
```

Τα πεδία του μοντέλου συνεδρίας εργαστηρίου είναι:
- **id**: Αυτόματα αυξανόμενο μοναδικό αναγνωριστικό
- **StartAt**: Ημερομηνία και ώρα έναρξης της συνεδρίας
- **EndAt**: Ημερομηνία και ώρα λήξης της συνεδρίας
- **max_students**: Μέγιστος αριθμός φοιτητών που μπορούν να εγγραφούν στη συνεδρία
- **active**: Ένδειξη για το αν η συνεδρία είναι ενεργή
- **teams_allowed**: Ένδειξη για το αν επιτρέπονται ομάδες φοιτητών

Κάθε συνεδρία εργαστηρίου ανήκει σε ένα εργαστήριο (σχέση many-to-one με το μοντέλο εργαστηρίου).

### Μοντέλο Λεπτομερειών Εργαστηρίου (Lab Details)

Το μοντέλο λεπτομερειών εργαστηρίου παρέχει πρόσθετες πληροφορίες για ένα εργαστήριο.

```javascript
// sequelize/models/labDetails.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('labDetails', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        max_grade: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        weight: {
            allowNull: false,
            type: DataTypes.FLOAT,
            defaultValue: 1.0
        }
    });
};
```

Τα πεδία του μοντέλου λεπτομερειών εργαστηρίου είναι:
- **id**: Αυτόματα αυξανόμενο μοναδικό αναγνωριστικό
- **description**: Αναλυτική περιγραφή του εργαστηρίου
- **max_grade**: Μέγιστη βαθμολογία που μπορεί να επιτευχθεί στο εργαστήριο
- **weight**: Συντελεστής βαρύτητας του εργαστηρίου στη συνολική βαθμολογία

Κάθε εγγραφή λεπτομερειών εργαστηρίου συνδέεται με ένα εργαστήριο (σχέση one-to-one με το μοντέλο εργαστηρίου).

### Μοντέλο Εγγραφής (Subscription)

Το μοντέλο εγγραφής αντιπροσωπεύει την εγγραφή ενός φοιτητή σε μια συγκεκριμένη συνεδρία εργαστηρίου.

```javascript
// sequelize/models/subscription.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('subscription', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'),
            defaultValue: 'pending'
        },
        grade: {
            allowNull: true,
            type: DataTypes.FLOAT
        }
    });
};
```

Τα πεδία του μοντέλου εγγραφής είναι:
- **id**: Αυτόματα αυξανόμενο μοναδικό αναγνωριστικό
- **status**: Κατάσταση της εγγραφής (εκκρεμεί, εγκρίθηκε, απορρίφθηκε, ολοκληρώθηκε)
- **grade**: Βαθμολογία του φοιτητή στο εργαστήριο

Το μοντέλο εγγραφής λειτουργεί ως πίνακας συσχέτισης (junction table) για τη σχέση many-to-many μεταξύ των μοντέλων φοιτητή και συνεδρίας εργαστηρίου.

### Σχέσεις Μεταξύ των Μοντέλων

Οι σχέσεις μεταξύ των μοντέλων ορίζονται στο αρχείο `sequelize/extra-setup.js`. Αυτές οι σχέσεις καθορίζουν πώς συνδέονται τα διάφορα μοντέλα μεταξύ τους, επιτρέποντας την εκτέλεση σύνθετων ερωτημάτων και τη διατήρηση της αναφορικής ακεραιότητας.

```javascript
// sequelize/extra-setup.js
function applyExtraSetup(sequelize) {
    const { user, teacher, student, lab, labInstance, subscription, role } = sequelize.models;

    // Σχέση one-to-many μεταξύ ρόλων και χρηστών
    role.hasMany(user);
    user.belongsTo(role);

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
```

Οι κύριες σχέσεις είναι:

1. **User - Role (Πολλά προς Ένα)**: Κάθε χρήστης έχει έναν ρόλο, και κάθε ρόλος μπορεί να ανήκει σε πολλούς χρήστες.

2. **User - Teacher (Ένα προς Ένα)**: Κάθε χρήστης μπορεί να είναι καθηγητής, και κάθε καθηγητής είναι ένας χρήστης.

3. **User - Student (Ένα προς Ένα)**: Κάθε χρήστης μπορεί να είναι φοιτητής, και κάθε φοιτητής είναι ένας χρήστης.

4. **Teacher - Lab (Ένα προς Πολλά)**: Κάθε καθηγητής μπορεί να έχει πολλά εργαστήρια, και κάθε εργαστήριο ανήκει σε έναν καθηγητή.

5. **Lab - Lab Instance (Ένα προς Πολλά)**: Κάθε εργαστήριο μπορεί να έχει πολλές συνεδρίες, και κάθε συνεδρία ανήκει σε ένα εργαστήριο.

6. **Student - Lab Instance (Πολλά προς Πολλά μέσω Subscription)**: Κάθε φοιτητής μπορεί να είναι εγγεγραμμένος σε πολλές συνεδρίες εργαστηρίου, και κάθε συνεδρία εργαστηρίου μπορεί να έχει πολλούς εγγεγραμμένους φοιτητές.

### Σχηματική Αναπαράσταση

Το παρακάτω σχήμα απεικονίζει τις σχέσεις μεταξύ των βασικών μοντέλων:

```
+---------+      +-----------+      +------------+
|   Role  |----->|    User   |<-----|  Teacher   |
+---------+      +-----------+      +------------+
                      |                  |
                      |                  |
                      v                  v
                 +-----------+      +------------+
                 |  Student  |      |    Lab     |
                 +-----------+      +------------+
                      |                  |
                      |                  |
                      |                  v
                      |            +---------------+
                      |            | Lab Instance  |
                      |            +---------------+
                      |                  ^
                      |                  |
                      v                  |
              +------------------+       |
              |   Subscription   |-------+
              +------------------+
```

### Συμπέρασμα

Τα μοντέλα δεδομένων που παρουσιάστηκαν σε αυτή την ενότητα αποτελούν τη βάση του συστήματος διαχείρισης εργαστηρίων. Τα μοντέλα αυτά, μαζί με τις σχέσεις τους, επιτρέπουν την αποτελεσματική αποθήκευση και ανάκτηση των πληροφοριών που είναι απαραίτητες για τη λειτουργία του συστήματος.

Το Sequelize ORM παρέχει ένα ισχυρό και ευέλικτο πλαίσιο για τον ορισμό αυτών των μοντέλων και των σχέσεών τους, διευκολύνοντας την αλληλεπίδραση με τη βάση δεδομένων και εξασφαλίζοντας την ακεραιότητα των δεδομένων. 