## Σύστημα Χρηστών και Διαχείριση Ρόλων

### Εισαγωγή

Το σύστημα χρηστών και η διαχείριση ρόλων αποτελούν κρίσιμα συστατικά της εφαρμογής διαχείρισης απουσιών, καθώς καθορίζουν ποιοι χρήστες έχουν πρόσβαση στην εφαρμογή και τι είδους ενέργειες μπορούν να εκτελέσουν. Η εφαρμογή υιοθετεί ένα σύστημα ρόλων που διαχωρίζει τους χρήστες σε διαφορετικές κατηγορίες με διαφορετικά δικαιώματα και υποχρεώσεις.

### Ορισμός Ρόλων

Στην εφαρμογή, οι ρόλοι ορίζονται μέσω ενός enum στο αρχείο `appReducer.ts`:

```tsx
export enum Roles {
  admin = "admin",
  teacher = "teacher",
}
```

Οι δύο βασικοί ρόλοι στην εφαρμογή είναι:
1. **admin**: Οι διαχειριστές του συστήματος
2. **teacher**: Οι καθηγητές που χρησιμοποιούν την εφαρμογή για τη διαχείριση των απουσιών

### Μοντέλο Χρήστη

Το μοντέλο χρήστη ορίζεται επίσης στο αρχείο `appReducer.ts`:

```tsx
export type User = {
  id: number;
  username: string;
  role: Roles;
  createdAt: string;
  updatedAt: string;
};
```

Αυτό το μοντέλο περιέχει τις βασικές πληροφορίες για έναν χρήστη:
- **id**: Μοναδικό αναγνωριστικό του χρήστη
- **username**: Το όνομα χρήστη
- **role**: Ο ρόλος του χρήστη (admin ή teacher)
- **createdAt**: Η ημερομηνία δημιουργίας του λογαριασμού
- **updatedAt**: Η ημερομηνία της τελευταίας ενημέρωσης του λογαριασμού

### Πιστοποίηση Χρηστών (Authentication)

Η πιστοποίηση των χρηστών γίνεται μέσω του συστήματος JSON Web Tokens (JWT). Όταν ένας χρήστης συνδέεται, αποστέλλει τα διαπιστευτήριά του (όνομα χρήστη και κωδικό πρόσβασης) στο backend, το οποίο επιστρέφει ένα JWT token εάν τα διαπιστευτήρια είναι έγκυρα.

#### Διαδικασία Σύνδεσης

Η διαδικασία σύνδεσης υλοποιείται στο αρχείο `SignIn.tsx`:

```tsx
const login = async () => {
  if (!isValid()) return;
  setProcessing(true);
  try {
    const { data } = await api.post<{ token: string }>("api/user/signin", {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    apiParams.authInterceptorId = api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${data.token}`;
      return config;
    });
    dispatch({ type: actionsEnum.auth, payload: { auth: true } });
    navigate("/");
  } catch (error) {
    setPassword("");
    dispatch({
      type: actionsEnum.toast,
      payload: {
        show: true,
        message: "Λάθος όνομα χρήστη ή κωδικός πρόσβασης",
        toastType: "error",
      },
    });
  }
  setProcessing(false);
};
```

Αυτή η συνάρτηση αποστέλλει τα διαπιστευτήρια του χρήστη στο endpoint `api/user/signin` και, εάν λάβει ένα έγκυρο token, το αποθηκεύει στο `localStorage` και προσθέτει έναν interceptor στο Axios για να συμπεριλάβει το token σε όλες τις μελλοντικές αιτήσεις.

#### Διατήρηση Συνεδρίας

Το token αποθηκεύεται στο `localStorage` του προγράμματος περιήγησης, επιτρέποντας έτσι τη διατήρηση της συνεδρίας ακόμα και όταν ο χρήστης κλείσει το πρόγραμμα περιήγησης και επανεκκινήσει την εφαρμογή. Κατά την εκκίνηση της εφαρμογής, το `Root.tsx` ελέγχει αν υπάρχει ένα αποθηκευμένο token:

```tsx
useEffect(() => {
  const token = localStorage.getItem("token");
  if (typeof token === "string" && token.length > 0) {
    dispatch({ type: actionsEnum.auth, payload: { auth: true } });
  }
}, []);
```

Εάν υπάρχει έγκυρο token, ο χρήστης συνδέεται αυτόματα.

#### Αποσύνδεση

Η αποσύνδεση υλοποιείται αφαιρώντας το token από το `localStorage` και ενημερώνοντας την κατάσταση της εφαρμογής:

```tsx
const logout = () => {
  if (apiParams.authInterceptorId) {
    api.interceptors.request.eject(apiParams.authInterceptorId);
  }
  localStorage.removeItem("token");
  dispatch({ type: actionsEnum.currentUser, payload: undefined });
  navigate("/signin");
};
```

### Εξουσιοδότηση Χρηστών (Authorization)

Η εξουσιοδότηση χρηστών υλοποιείται μέσω ελέγχου του ρόλου του χρήστη για κάθε διαδρομή (route) ή ενέργεια στην εφαρμογή.

#### Προστατευμένες Διαδρομές

Στο αρχείο `routes.tsx`, οι διαδρομές ορίζονται με επιπλέον πληροφορίες σχετικά με το αν είναι προστατευμένες και ποιος ρόλος επιτρέπεται να έχει πρόσβαση:

```tsx
export const routes: RouteProps[] = [
  {
    title: "Αρχική",
    icon: HiHome,
    href: "/",
    component: <Home />,
    group: false,
    role: Roles.teacher,
    protected: false,
  },
  {
    title: "Εργαστήρια",
    icon: ImLab,
    href: "/labs",
    component: <Labs />,
    group: false,
    role: Roles.teacher,
    protected: true,
  },
  {
    title: "Καθηγητές",
    icon: FaChalkboardTeacher,
    href: "/teachers",
    component: <Teachers />,
    group: false,
    role: Roles.admin,
    protected: true,
  },
  {
    title: "Φοιτητές",
    icon: BsFillPersonBadgeFill,
    href: "/students",
    component: <Students />,
    group: false,
    role: Roles.teacher,
    protected: true,
  },
];
```

Στο `Root.tsx`, αυτές οι πληροφορίες χρησιμοποιούνται για να φιλτράρουν τις διαδρομές που εμφανίζονται στο sidebar, ανάλογα με το ρόλο του συνδεδεμένου χρήστη:

```tsx
useEffect(() => {
  const r = _routes.filter((r) => {
    if (!state.currentUser) {
      return !r.protected;
    }
    if (state.currentUser?.role === Roles.admin) {
      return true;
    }
    if (r.role) {
      return r.role === state.currentUser?.role;
    }
    return false;
  });
  setRoutes(r);
}, [state.currentUser]);
```

Αυτός ο κώδικας φιλτράρει τις διαδρομές ώστε:
- Εάν ο χρήστης δεν είναι συνδεδεμένος, εμφανίζονται μόνο οι μη προστατευμένες διαδρομές
- Εάν ο χρήστης είναι διαχειριστής (admin), εμφανίζονται όλες οι διαδρομές
- Εάν ο χρήστης είναι καθηγητής (teacher), εμφανίζονται μόνο οι διαδρομές που προορίζονται για καθηγητές ή οι μη προστατευμένες διαδρομές

#### Έλεγχος Εξουσιοδότησης σε Επίπεδο Component

Εκτός από τον έλεγχο εξουσιοδότησης σε επίπεδο διαδρομών, η εφαρμογή μπορεί επίσης να ελέγχει την εξουσιοδότηση σε επίπεδο component. Αυτό γίνεται ελέγχοντας το ρόλο του τρέχοντος χρήστη μέσω του `AppContext`:

```tsx
const { state } = useContext(AppContext);

// Έλεγχος αν ο χρήστης είναι admin
const isAdmin = state.currentUser?.role === Roles.admin;

// Εμφάνιση ή απόκρυψη στοιχείων ανάλογα με το ρόλο του χρήστη
{isAdmin && (
  <Button onClick={deleteUser}>
    <MdDelete />
    Διαγραφή
  </Button>
)}
```

### Διαχείριση Χρηστών

#### Εγγραφή Νέων Χρηστών

Η εγγραφή νέων χρηστών υλοποιείται στο αρχείο `SingUp.tsx`. Κατά την εγγραφή, οι χρήστες παρέχουν ένα όνομα χρήστη και έναν κωδικό πρόσβασης. Ανάλογα με την υλοποίηση του backend, μπορεί επίσης να ορίζεται ο ρόλος του νέου χρήστη κατά την εγγραφή.

```tsx
const register = async () => {
  if (!isValid()) return;
  setProcessing(true);
  try {
    const { data } = await api.post<{ token: string }>("api/user/signup", {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    apiParams.authInterceptorId = api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${data.token}`;
      return config;
    });
    dispatch({ type: actionsEnum.auth, payload: { auth: true } });
    navigate("/");
  } catch (error) {
    setPassword("");
    dispatch({
      type: actionsEnum.toast,
      payload: {
        show: true,
        message: "Σφάλμα κατά την εγγραφή",
        toastType: "error",
      },
    });
  }
  setProcessing(false);
};
```

#### Διαχείριση Καθηγητών

Οι διαχειριστές (admin) έχουν πρόσβαση στη σελίδα `Teachers` που επιτρέπει τη διαχείριση των καθηγητών. Οι λειτουργίες περιλαμβάνουν:

- Προβολή λίστας όλων των καθηγητών
- Προσθήκη νέων καθηγητών
- Επεξεργασία υπαρχόντων καθηγητών
- Διαγραφή καθηγητών

Το αρχείο `Teachers.tsx` περιέχει την υλοποίηση αυτών των λειτουργιών, με μεθόδους όπως `getData`, `sendNew`, `sendEdit` και `sendDelete` για την επικοινωνία με το backend API.

### Ασφάλεια

#### JWT Tokens και Interceptors

Για την ασφαλή επικοινωνία με το backend, η εφαρμογή χρησιμοποιεί JWT tokens που αποστέλλονται ως HTTP headers σε κάθε αίτηση. Αυτό υλοποιείται μέσω Axios interceptors:

```tsx
(function addAuthInterceptor() {
  const token = localStorage.getItem("token");
  if (token) {
    apiParams.authInterceptorId = api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
})();
```

Αυτός ο interceptor προσθέτει το token πιστοποίησης στο header `Authorization` κάθε αίτησης που αποστέλλεται μέσω του Axios.

#### Προστασία από Cross-Site Request Forgery (CSRF)

Το backend είναι υπεύθυνο για την προστασία από επιθέσεις CSRF. Το frontend μπορεί να συμβάλει σε αυτό χρησιμοποιώντας τα κατάλληλα headers και cookies, αλλά η κύρια υλοποίηση βρίσκεται στο backend.

### Εμπειρία Χρήστη με Βάση τους Ρόλους

Η εμπειρία χρήστη προσαρμόζεται με βάση το ρόλο του χρήστη:

#### Καθηγητές (role = teacher)

Οι καθηγητές έχουν πρόσβαση σε λειτουργίες όπως:
- Διαχείριση εργαστηρίων
- Προγραμματισμός συνεδριών
- Διαχείριση φοιτητών και απουσιών

#### Διαχειριστές (role = admin)

Οι διαχειριστές έχουν πρόσβαση σε όλες τις λειτουργίες των καθηγητών, καθώς και σε επιπλέον λειτουργίες όπως:
- Διαχείριση καθηγητών
- Πρόσβαση σε στατιστικά και αναφορές (εφόσον υλοποιηθούν)

### Επεκτασιμότητα του Συστήματος Ρόλων

Το σύστημα ρόλων έχει σχεδιαστεί για να είναι επεκτάσιμο. Αν χρειαστεί να προστεθούν νέοι ρόλοι στο μέλλον, αυτό μπορεί να γίνει εύκολα προσθέτοντας νέες τιμές στο enum `Roles` και ενημερώνοντας αναλόγως τη λογική ελέγχου εξουσιοδότησης.

```tsx
export enum Roles {
  admin = "admin",
  teacher = "teacher",
  student = "student", // Παράδειγμα προσθήκης νέου ρόλου
}
```

### Συμπεράσματα

Το σύστημα χρηστών και η διαχείριση ρόλων στην εφαρμογή διαχείρισης απουσιών παρέχει έναν αποτελεσματικό τρόπο για τον έλεγχο της πρόσβασης και την προσαρμογή της εμπειρίας χρήστη με βάση το ρόλο του χρήστη. Η χρήση της Context API και του reducer για τη διαχείριση της κατάστασης πιστοποίησης και του τρέχοντος χρήστη, σε συνδυασμό με το JWT για την ασφαλή επικοινωνία με το backend, παρέχει ένα ισχυρό και ευέλικτο σύστημα για τη διαχείριση των χρηστών και των ρόλων.

Το σύστημα είναι επίσης επεκτάσιμο, επιτρέποντας την προσθήκη νέων ρόλων και λειτουργιών στο μέλλον χωρίς σημαντικές αλλαγές στην αρχιτεκτονική της εφαρμογής. 