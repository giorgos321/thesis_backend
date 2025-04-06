## Αρχιτεκτονική Συστήματος

### Γενική Επισκόπηση

Η αρχιτεκτονική της εφαρμογής διαχείρισης απουσιών ακολουθεί τις σύγχρονες πρακτικές ανάπτυξης εφαρμογών React, με έμφαση στην οργάνωση του κώδικα σε επαναχρησιμοποιήσιμα components και τη διαχείριση των καταστάσεων (state management). Η εφαρμογή υιοθετεί μια αρχιτεκτονική που διαχωρίζει το UI από τη λογική της εφαρμογής, διευκολύνοντας έτσι τη συντήρηση και την επέκταση του κώδικα.

### Δομή Αρχείων

Η δομή των αρχείων της εφαρμογής είναι οργανωμένη με τρόπο που διευκολύνει την κατανόηση και τη συντήρηση του κώδικα. Οι κύριοι φάκελοι και τα αρχεία είναι:

```
src/
  ├── app/
  │   ├── components/     # Επαναχρησιμοποιήσιμα συστατικά
  │   ├── pages/          # Σελίδες της εφαρμογής
  │   ├── Root.tsx        # Κεντρικό συστατικό της εφαρμογής
  │   ├── RootUtils.tsx   # Βοηθητικές συναρτήσεις για το Root
  │   └── routes.tsx      # Ορισμός των διαδρομών (routes)
  ├── hooks/              # Custom React hooks
  ├── lib/                # Επαναχρησιμοποιήσιμες βιβλιοθήκες
  ├── stories/            # Storybook stories
  ├── api.ts              # Αρχείο για την επικοινωνία με το backend
  ├── appReducer.ts       # Reducer για το state management
  ├── index.css           # Καθολικά στυλ CSS
  ├── index.tsx           # Σημείο εισόδου της εφαρμογής
  └── setup-tests.ts      # Ρυθμίσεις για τις δοκιμές
```

Αυτή η δομή αρχείων αντικατοπτρίζει μια καλή πρακτική στην ανάπτυξη εφαρμογών React, όπου τα components είναι οργανωμένα σε λογικές κατηγορίες και τα διάφορα μέρη της εφαρμογής είναι καλά διαχωρισμένα.

### Βασικά Συστατικά

#### Root Component

Το `Root.tsx` είναι το κύριο συστατικό της εφαρμογής που περιέχει την κεντρική δομή του UI και τη λογική πλοήγησης. Αυτό το component:

- Διαχειρίζεται την κατάσταση της εφαρμογής (state) μέσω του `useReducer`
- Παρέχει το `AppContext` σε όλα τα παιδιά-components
- Χειρίζεται την πιστοποίηση (authentication) και την εξουσιοδότηση (authorization)
- Διαχειρίζεται το σύστημα πλοήγησης (navigation) με το React Router
- Φορτώνει τα απαραίτητα δεδομένα κατά την εκκίνηση της εφαρμογής

```tsx
export const Root: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const [state, dispatch] = useReducer(appReducer, defaultState);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [routes, setRoutes] = useState<RouteProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof token === "string" && token.length > 0) {
      dispatch({ type: actionsEnum.auth, payload: { auth: true } });
    }
  }, []);

  // ... άλλες συναρτήσεις και διαχείριση καταστάσεων ...

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar fluid>
        {/* ... περιεχόμενο του navbar ... */}
      </Navbar>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
          <Sidebar collapsed={collapsed} className="h-full border-r-2 border-gray-200">
            {/* ... περιεχόμενο του sidebar ... */}
          </Sidebar>
          <main className="flex-1 overflow-auto bg-white p-4 dark:bg-gray-900" ref={mainRef}>
            <Suspense fallback={<div className="flex h-full items-center justify-center"><Spinner /></div>}>
              <RootUtils>
                <Routes>
                  {/* ... ορισμός των routes ... */}
                </Routes>
                {/* ... άλλα στοιχεία UI ... */}
              </RootUtils>
            </Suspense>
          </main>
        </div>
      </AppContext.Provider>
    </div>
  );
};
```

#### Routes

Το αρχείο `routes.tsx` ορίζει τις διαδρομές (routes) της εφαρμογής, καθώς και τα συστατικά που αντιστοιχούν σε κάθε διαδρομή. Επίσης, καθορίζει τα δικαιώματα πρόσβασης για κάθε διαδρομή, επιτρέποντας ή απαγορεύοντας την πρόσβαση ανάλογα με το ρόλο του χρήστη.

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
  // ... άλλες διαδρομές ...
];
```

#### Components

Ο φάκελος `components` περιέχει επαναχρησιμοποιήσιμα συστατικά που χρησιμοποιούνται σε διάφορα μέρη της εφαρμογής. Μερικά από τα κύρια components είναι:

- **Calendar.tsx**: Υλοποιεί το ημερολόγιο για τον προγραμματισμό των εργαστηριακών συνεδριών.
- **Absences.modal.tsx**: Διαχειρίζεται το modal για την καταγραφή των απουσιών.
- **ModuleWrapper.tsx**: Ένα wrapper component που παρέχει συνεπή μορφοποίηση για τις διάφορες ενότητες της εφαρμογής.

#### Pages

Ο φάκελος `pages` περιέχει τα components που αντιστοιχούν στις κύριες σελίδες της εφαρμογής:

- **Home.tsx**: Η αρχική σελίδα.
- **Labs.tsx**: Διαχείριση εργαστηρίων.
- **Teachers.tsx**: Διαχείριση καθηγητών.
- **Students.tsx**: Διαχείριση φοιτητών.
- **Absences.tsx**: Διαχείριση απουσιών.
- **SignIn.tsx** και **SingUp.tsx**: Σελίδες για τη σύνδεση και την εγγραφή των χρηστών.
- **DashboardPage.tsx**: Σελίδα του dashboard.

### State Management με Context API και useReducer

Η εφαρμογή χρησιμοποιεί τη Context API του React και το hook `useReducer` για τη διαχείριση των καταστάσεων (state management). Αυτή η προσέγγιση επιτρέπει την αποτελεσματική διαχείριση της καθολικής κατάστασης της εφαρμογής χωρίς την ανάγκη για εξωτερικές βιβλιοθήκες όπως το Redux.

Το αρχείο `appReducer.ts` καθορίζει τις ενέργειες (actions) και τις συναρτήσεις reducer που διαχειρίζονται την κατάσταση της εφαρμογής:

```tsx
export enum Roles {
  admin = "admin",
  teacher = "teacher",
}

export enum actionsEnum {
  auth = "auth",
  toast = "toast",
  currentUser = "currentUser",
}

export type User = {
  id: number;
  username: string;
  role: Roles;
  createdAt: string;
  updatedAt: string;
};

export type appState = {
  auth: boolean;
  toast: {
    show: boolean;
    message?: string;
    toastType?: "success" | "error" | "warning";
  };
  currentUser?: User;
};

export type actions =
  | { type: actionsEnum.auth; payload: { auth: boolean } }
  | {
      type: actionsEnum.toast;
      payload: {
        show: boolean;
        message?: string;
        toastType?: "success" | "error" | "warning";
      };
    }
  | { type: actionsEnum.currentUser; payload: User | undefined };

export const appReducer = (state: appState, action: actions): appState => {
  switch (action.type) {
    case actionsEnum.auth:
      return { ...state, auth: action.payload.auth };
    case actionsEnum.toast:
      return { ...state, toast: action.payload };
    case actionsEnum.currentUser:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
```

Στο `Root.tsx`, δημιουργείται ένα context που περιέχει την κατάσταση της εφαρμογής και τη συνάρτηση `dispatch` που επιτρέπει την ενημέρωση της κατάστασης:

```tsx
const defaultState = {
  auth: false,
  toast: { show: false },
};

export const AppContext = createContext<{
  state: appState;
  dispatch: React.Dispatch<actions>;
}>({
  state: defaultState,
  dispatch: () => undefined,
});
```

Αυτό το context στη συνέχεια παρέχεται σε όλα τα components της εφαρμογής, επιτρέποντάς τους να έχουν πρόσβαση στην κατάσταση της εφαρμογής και να την ενημερώνουν όταν χρειάζεται.

### API Επικοινωνία

Το αρχείο `api.ts` διαχειρίζεται την επικοινωνία με το backend. Χρησιμοποιεί τη βιβλιοθήκη Axios για τις HTTP αιτήσεις και παρέχει συναρτήσεις για την εκτέλεση των διαφόρων λειτουργιών της εφαρμογής.

```tsx
import axios from "axios";

export const apiParams = {
  authInterceptorId: undefined as number | undefined,
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/",
  timeout: 10000,
  withCredentials: false,
});

(function addAuthInterceptor() {
  const token = localStorage.getItem("token");
  if (token) {
    apiParams.authInterceptorId = api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
})();

export default api;
```

Η συνάρτηση `addAuthInterceptor` προσθέτει ένα interceptor που συμπεριλαμβάνει το token πιστοποίησης (JWT) σε κάθε αίτηση προς το backend, διευκολύνοντας έτσι τον έλεγχο ταυτότητας του χρήστη.

### Responsive Design

Η εφαρμογή υιοθετεί μια προσέγγιση responsive design, επιτρέποντας τη βέλτιστη προβολή και χρήση της εφαρμογής σε διάφορες συσκευές και μεγέθη οθόνης. Αυτό επιτυγχάνεται μέσω της χρήσης του Tailwind CSS, το οποίο παρέχει utility classes για τη δημιουργία responsive διεπαφών.

Για παράδειγμα, στο `Root.tsx`, το sidebar μπορεί να αναδιπλωθεί για να παρέχει περισσότερο χώρο για το περιεχόμενο:

```tsx
<Sidebar
  collapsed={collapsed}
  className="h-full border-r-2 border-gray-200"
>
  {/* ... περιεχόμενο του sidebar ... */}
</Sidebar>
```

### Συμπεράσματα

Η αρχιτεκτονική της εφαρμογής διαχείρισης απουσιών ακολουθεί τις σύγχρονες πρακτικές ανάπτυξης React, με έμφαση στην οργάνωση του κώδικα, την επαναχρησιμοποίηση και την καλή διαχείριση των καταστάσεων. Η χρήση του TypeScript προσθέτει τύπους στον κώδικα, βελτιώνοντας την αναγνωσιμότητα και την αξιοπιστία του.

Η δομή των αρχείων είναι οργανωμένη με τρόπο που διευκολύνει την ανάπτυξη, τη συντήρηση και την επέκταση της εφαρμογής. Η χρήση των React hooks και της Context API επιτρέπει την αποτελεσματική διαχείριση των καταστάσεων, ενώ η χρήση των Flowbite components και του Tailwind CSS επιτρέπει την ταχεία ανάπτυξη μιας ελκυστικής και λειτουργικής διεπαφής χρήστη.

Η επικοινωνία με το backend γίνεται μέσω του Axios, το οποίο παρέχει ένα απλό και ισχυρό API για την εκτέλεση HTTP αιτήσεων. Η χρήση των interceptors επιτρέπει την αποτελεσματική διαχείριση του token πιστοποίησης και άλλων κοινών παραμέτρων των αιτήσεων. 