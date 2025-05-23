# Εισαγωγή

## Σκοπός και Αντικείμενο της Εργασίας

Η παρούσα πτυχιακή εργασία αφορά την ανάπτυξη ενός ολοκληρωμένου συστήματος διαχείρισης εργαστηρίων για εκπαιδευτικά ιδρύματα. Το σύστημα έχει σχεδιαστεί με σκοπό να παρέχει μια αξιόπιστη, ασφαλή και εύχρηστη πλατφόρμα για την αυτοματοποίηση και βελτιστοποίηση των διαδικασιών που σχετίζονται με τη διαχείριση εργαστηριακών μαθημάτων και την παρακολούθηση της φοιτητικής συμμετοχής.

Στόχος της εργασίας είναι να αντιμετωπίσει τις καθημερινές προκλήσεις που αντιμετωπίζουν τα εκπαιδευτικά ιδρύματα στη διαχείριση των εργαστηριακών τους μαθημάτων, όπως:

- Η αποτελεσματική οργάνωση και προγραμματισμός των εργαστηριακών συνεδριών
- Η παρακολούθηση της παρουσίας και συμμετοχής των φοιτητών
- Η διαχείριση των εργαστηριακών τμημάτων και των διδασκόντων
- Η δημιουργία αναφορών και στατιστικών στοιχείων
- Η ψηφιοποίηση διαδικασιών που παραδοσιακά διεξάγονται χειροκίνητα

Το σύστημα είναι σχεδιασμένο ως μια πλήρης διαδικτυακή εφαρμογή (web application) με μια σύγχρονη αρχιτεκτονική που διαχωρίζει το backend από το frontend, εφαρμόζοντας τις βέλτιστες πρακτικές του σύγχρονου προγραμματισμού λογισμικού.

## Περιγραφή του Προβλήματος

Τα εκπαιδευτικά ιδρύματα αντιμετωπίζουν πολλές προκλήσεις στη διαχείριση των εργαστηριακών μαθημάτων, οι οποίες συχνά επιλύονται με χειροκίνητες διαδικασίες που είναι επιρρεπείς σε σφάλματα, χρονοβόρες και δύσκολες στην κλιμάκωση. Συγκεκριμένα:

1. **Προγραμματισμός εργαστηρίων**: Η ανάθεση αιθουσών, διδασκόντων και χρονοθυρίδων απαιτεί συντονισμό πολλών παραμέτρων και συχνά γίνεται με μη αυτοματοποιημένο τρόπο.

2. **Διαχείριση παρουσιών**: Η καταγραφή και παρακολούθηση των παρουσιών των φοιτητών γίνεται συχνά σε έντυπη μορφή, δημιουργώντας προβλήματα στην ακρίβεια και την αποθήκευση των δεδομένων.

3. **Εγγραφές φοιτητών**: Η διαδικασία εγγραφής των φοιτητών σε εργαστηριακά τμήματα μπορεί να είναι χαοτική και να απαιτεί σημαντική διοικητική προσπάθεια.

4. **Δημιουργία αναφορών**: Η εξαγωγή στατιστικών στοιχείων και αναφορών για την απόδοση των φοιτητών και τη λειτουργία των εργαστηρίων απαιτεί χειροκίνητη επεξεργασία δεδομένων.

5. **Επικοινωνία μεταξύ διδασκόντων και φοιτητών**: Η ανακοινώσεις και η ενημέρωση σχετικά με αλλαγές στο πρόγραμμα ή άλλα θέματα συχνά γίνεται με αναποτελεσματικούς τρόπους.

Αυτά τα προβλήματα οδηγούν σε αναποτελεσματικότητα, σπατάλη πόρων και συχνά σε υποβαθμισμένη εκπαιδευτική εμπειρία. Το σύστημα που αναπτύχθηκε στο πλαίσιο αυτής της εργασίας στοχεύει στην αντιμετώπιση αυτών των προκλήσεων μέσω μιας ολοκληρωμένης ψηφιακής λύσης.

## Δομή της Εργασίας

Η παρούσα εργασία είναι δομημένη σε δύο κύρια μέρη που αντικατοπτρίζουν την αρχιτεκτονική του συστήματος:

### Κεφάλαιο 1: Backend Συστήματος

Το πρώτο κεφάλαιο επικεντρώνεται στο backend του συστήματος, το οποίο αποτελεί τον πυρήνα της εφαρμογής και είναι υπεύθυνο για τη διαχείριση των δεδομένων, τη λογική της εφαρμογής και την επικοινωνία με τη βάση δεδομένων. Σε αυτό το κεφάλαιο αναλύονται:

- Οι τεχνολογίες που χρησιμοποιήθηκαν για την ανάπτυξη του backend (Express.js, Sequelize, JWT)
- Η αρχιτεκτονική του συστήματος και η δομή των αρχείων
- Τα μοντέλα δεδομένων και οι σχέσεις μεταξύ τους
- Τα API endpoints και οι λειτουργίες τους
- Η αυθεντικοποίηση και η ασφάλεια του συστήματος

### Κεφάλαιο 2: Frontend Συστήματος

Το δεύτερο κεφάλαιο εστιάζει στο frontend του συστήματος, το οποίο αποτελεί τη διεπαφή με τον χρήστη και είναι υπεύθυνο για την παρουσίαση των δεδομένων και την αλληλεπίδραση με τους χρήστες. Σε αυτό το κεφάλαιο αναλύονται:

- Οι τεχνολογίες που χρησιμοποιήθηκαν για την ανάπτυξη του frontend (React, TypeScript, Tailwind CSS)
- Η αρχιτεκτονική του frontend και η οργάνωση των components
- Οι λειτουργικές απαιτήσεις και η υλοποίησή τους
- Η σχεδίαση της διεπαφής χρήστη και η εμπειρία χρήστη
- Η διαχείριση καταστάσεων και η επικοινωνία με το backend
- Οι λειτουργίες διαχείρισης χρηστών, εργαστηρίων και απουσιών

Στο τέλος της εργασίας, παρουσιάζονται τα συμπεράσματα και οι προοπτικές μελλοντικής επέκτασης του συστήματος.

## Συνοπτική Περιγραφή της Εφαρμογής

Το σύστημα διαχείρισης εργαστηρίων που αναπτύχθηκε αποτελεί μια ολοκληρωμένη εφαρμογή με τα ακόλουθα βασικά χαρακτηριστικά:

### Διαχείριση Χρηστών και Ρόλων

- **Διαφορετικοί ρόλοι χρηστών**: Το σύστημα υποστηρίζει διαφορετικούς ρόλους (διαχειριστές, καθηγητές) με διαφορετικά επίπεδα πρόσβασης και δικαιώματα.
- **Αυθεντικοποίηση και εξουσιοδότηση**: Ασφαλής είσοδος χρηστών με JWT και έλεγχος πρόσβασης βάσει ρόλων (RBAC).
- **Διαχείριση προφίλ**: Δυνατότητα προβολής και επεξεργασίας των στοιχείων χρήστη.

### Διαχείριση Εργαστηρίων

- **Δημιουργία και επεξεργασία εργαστηρίων**: Οι καθηγητές μπορούν να δημιουργούν και να διαχειρίζονται εργαστήρια με πληροφορίες όπως όνομα, περιγραφή, ακαδημαϊκό έτος και εξάμηνο.
- **Προγραμματισμός συνεδριών**: Δυνατότητα προγραμματισμού εργαστηριακών συνεδριών με χρήση διαδραστικού ημερολογίου.
- **Ανάθεση καθηγητών**: Δυνατότητα ανάθεσης καθηγητών σε συγκεκριμένα εργαστήρια και συνεδρίες.

### Διαχείριση Φοιτητών και Απουσιών

- **Καταχώρηση φοιτητών**: Δυνατότητα καταχώρησης φοιτητών με βασικές πληροφορίες (όνομα, αριθμός μητρώου).
- **Εγγραφή σε εργαστήρια**: Οι φοιτητές μπορούν να εγγραφούν σε εργαστηριακά τμήματα.
- **Καταγραφή παρουσιών**: Οι καθηγητές μπορούν να καταγράφουν τις παρουσίες των φοιτητών σε κάθε συνεδρία.
- **Προβολή ιστορικού**: Δυνατότητα προβολής του ιστορικού παρουσιών και απουσιών για κάθε φοιτητή.

### Διεπαφή Χρήστη

- **Σύγχρονο και φιλικό περιβάλλον**: Η εφαρμογή διαθέτει μια σύγχρονη και εύχρηστη διεπαφή που βασίζεται στο Tailwind CSS και το Flowbite.
- **Responsive design**: Η εφαρμογή προσαρμόζεται σε διαφορετικές συσκευές και μεγέθη οθόνης.
- **Διαδραστικά στοιχεία**: Χρήση διαδραστικών components όπως ημερολόγια, πίνακες και φόρμες για εύκολη αλληλεπίδραση.

### Επικοινωνία με το Backend

- **RESTful API**: Το frontend επικοινωνεί με το backend μέσω ενός RESTful API.
- **Διαχείριση αιτημάτων**: Χρήση του Axios για αποστολή και λήψη δεδομένων.
- **Διαχείριση καταστάσεων**: Χρήση προηγμένων τεχνικών διαχείρισης καταστάσεων για συγχρονισμό των δεδομένων.

Το σύστημα έχει σχεδιαστεί με γνώμονα την ευχρηστία, την ασφάλεια και την επεκτασιμότητα, προσφέροντας μια ολοκληρωμένη λύση για τη διαχείριση εργαστηρίων σε εκπαιδευτικά ιδρύματα. 