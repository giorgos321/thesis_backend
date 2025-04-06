# Διαχείριση Καταστάσεων (State Management)

### Εισαγωγή

Η διαχείριση καταστάσεων (state management) αποτελεί ένα κρίσιμο κομμάτι της ανάπτυξης εφαρμογών React, ειδικά σε εφαρμογές μεσαίου και μεγάλου μεγέθους όπως η εφαρμογή διαχείρισης απουσιών. Η αποτελεσματική διαχείριση της κατάστασης της εφαρμογής διασφαλίζει την προβλεψιμότητα της συμπεριφοράς της, καθώς και την αποδοτική επικοινωνία μεταξύ των διαφόρων components.

Στην παρούσα εφαρμογή, χρησιμοποιούνται διάφορες τεχνικές διαχείρισης καταστάσεων, με κύρια την Context API του React σε συνδυασμό με το hook `useReducer` για την καθολική διαχείριση καταστάσεων, και το hook `useState` για τοπικές καταστάσεις σε επίπεδο component.

### Context API και useReducer

Η κεντρική προσέγγιση για τη διαχείριση της καθολικής κατάστασης της εφαρμογής βασίζεται στη Context API του React και το hook `useReducer`. Αυτή η προσέγγιση επιτρέπει την αποτελεσματική διαχείριση πολύπλοκων καταστάσεων και την εύκολη πρόσβαση σε αυτές από διαφορετικά components της εφαρμογής.

#### Ορισμός του AppContext

Το `AppContext` ορίζεται στο αρχείο `Root.tsx` και περιέχει την κατάσταση της εφαρμογής και τη συνάρτηση `dispatch` που επιτρέπει την ενημέρωση της κατάστασης:

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

Στη συνέχεια, το `AppContext.Provider` χρησιμοποιείται για να παρέχει την κατάσταση και τη συνάρτηση `dispatch` σε όλα τα παιδιά-components:

```tsx
<AppContext.Provider value={{ state, dispatch }}>
  <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
    <Sidebar
      collapsed={collapsed}
      className="h-full border-r-2 border-gray-200"
    >
      {/* ... περιεχόμενο του sidebar ... */}
    </Sidebar>
    <main
      className="flex-1 overflow-auto bg-white p-4 dark:bg-gray-900"
      ref={mainRef}
    >
      {/* ... περιεχόμενο της κύριας περιοχής ... */}
    </main>
  </div>
</AppContext.Provider>
```

#### Ορισμός του Reducer

Η λογική για την ενημέρωση της κατάστασης της εφαρμογής ορίζεται στο αρχείο `appReducer.ts` μέσω του reducer:

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

Ο reducer αυτός διαχειρίζεται τρεις τύπους ενεργειών:
1. `auth`: Για την κατάσταση πιστοποίησης του χρήστη
2. `toast`: Για την εμφάνιση μηνυμάτων στο χρήστη
3. `currentUser`: Για τις πληροφορίες του τρέχοντος χρήστη

#### Χρήση του useReducer στο Root Component

Στο `Root.tsx`, το hook `useReducer` χρησιμοποιείται για τη δημιουργία της αρχικής κατάστασης και της συνάρτησης `dispatch`:

```tsx
const [state, dispatch] = useReducer(appReducer, defaultState);
```

#### Πρόσβαση στην Κατάσταση και Ενημέρωση από τα Components

Τα components μπορούν να έχουν πρόσβαση στην κατάσταση της εφαρμογής και να την ενημερώνουν χρησιμοποιώντας το hook `useContext`:

```tsx
const { state, dispatch } = useContext(AppContext);
```

Για παράδειγμα, το SignIn component χρησιμοποιεί τη συνάρτηση `dispatch` για να ενημερώσει την κατάσταση πιστοποίησης μετά από μια επιτυχή σύνδεση:

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

### Τοπική Διαχείριση Καταστάσεων με useState

Εκτός από την καθολική διαχείριση καταστάσεων με το Context API και το `useReducer`, η εφαρμογή χρησιμοποιεί επίσης το hook `useState` για την τοπική διαχείριση καταστάσεων σε επίπεδο component.

#### Παραδείγματα Χρήσης του useState

##### Στο Labs Component:

```tsx
const [labs, setLabs] = useState<Lab[]>([]);
const [load, setLoad] = useState<boolean>(true);
const [modal, setModal] = useState<boolean>(false);
const [modalMode, setModalMode] = useState<ModalMode | undefined>();
const [isValid, setIsValid] = useState(true);
const [year, setYear] = useState<number>(currentYear);
const [semester, setSemester] = useState<number>(1);
const [isProcessing, setIsProcessing] = useState<boolean>(false);
const [modalDisplayName, setModalDisplayName] = useState<string | undefined>();
```

Αυτές οι καταστάσεις χρησιμοποιούνται για τη διαχείριση των δεδομένων και της συμπεριφοράς του component για τη διαχείριση εργαστηρίων.

##### Στο Calendar Component:

```tsx
const [modal, setModal] = useState<boolean>(false);
const [isProcessing, setIsProcessing] = useState<boolean>(false);
const [modalMode, setModalMode] = useState<ModalMode | undefined>(
  ModalMode.create
);
const [form, setForm] = useState<LabInstance>(emptyLabInstance);
const [invalid, setInvalid] = useState(true);
const [alert, setAlert] = useState<
  undefined | { text1: string; text2: string }
>();
const [labs, setLabs] = useState<Lab[]>([]);
const [teachers, setTeachers] = useState<Teacher[]>([]);
const [startTime, setStartTime] = useState<Moment>(moment());
const [endTime, setEndTime] = useState<Moment>(moment());
const [startRecur, setStartRecur] = useState<Moment>(moment());
const [endRecur, setEndRecur] = useState<Moment>(moment());
```

Αυτές οι καταστάσεις χρησιμοποιούνται για τη διαχείριση των δεδομένων και της συμπεριφοράς του calendar component.

### Διαχείριση Καταστάσεων Φόρμας

Η διαχείριση των καταστάσεων των φορμών είναι μια ιδιαίτερη περίπτωση διαχείρισης καταστάσεων που χρησιμοποιείται σε διάφορα μέρη της εφαρμογής.

#### Παράδειγμα Διαχείρισης Κατάστασης Φόρμας Σύνδεσης

```tsx
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [processing, setProcessing] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  login();
};

const login = async () => {
  if (!isValid()) return;
  setProcessing(true);
  try {
    const { data } = await api.post<{ token: string }>("api/user/signin", {
      username,
      password,
    });
    // ... περισσότερος κώδικας ...
  } catch (error) {
    setPassword("");
    // ... διαχείριση σφαλμάτων ...
  }
  setProcessing(false);
};
```

#### Παράδειγμα Διαχείρισης Κατάστασης Φόρμας Εργαστηρίου

```tsx
const labName = useRef<HTMLInputElement>(null);
const labDesc = useRef<HTMLTextAreaElement>(null);
const selectedLab = useRef<Lab>({
  id: NaN,
  lab_name: "",
  lab_description: "",
  lab_year: currentYear,
  lab_semester: 1,
  createdAt: "",
  updatedAt: "",
});

const checkValidation = () => {
  const nameLength = selectedLab.current.lab_name.length;
  if (nameLength > 0) {
    return true;
  } else {
    setIsValid(false);
    return false;
  }
};

const sendEdit = async () => {
  if (!checkValidation()) return;
  setIsProcessing(true);
  await api.put<Lab>(
    `api/labs/${selectedLab.current.id}`,
    selectedLab.current
  );
  setIsProcessing(false);
  closeModal();
  getData();
};
```

### Διαχείριση Κατάστασης Ημερολογίου

Το component `Calendar` απαιτεί μια πιο σύνθετη διαχείριση κατάστασης, λόγω της αλληλεπίδρασής του με τη βιβλιοθήκη FullCalendar και της ανάγκης για χειρισμό διαφόρων καταστάσεων σχετικά με την ημερομηνία και την ώρα:

```tsx
const events = useMemo(
  () =>
    data.map((lab: LabInstance) => ({
      ...lab,
      instanceData: lab,
      title: `${lab.lab?.lab_name}`,
      startTime: lab.startTime,
      endTime: lab.endTime,
      daysOfWeek: [lab.daysOfWeek],
      startRecur: moment(lab.startRecur).format("YYYY-MM-DD"),
      endRecur: moment(lab.endRecur).format("YYYY-MM-DD"),
    })),
  [data]
);

useEffect(() => {
  if (modalMode === ModalMode.create) {
    setForm({
      ...form,
      labId: labs[0]?.id,
      teacherId: teachers[0]?.id,
      daysOfWeek: "1",
      color: colorList[0],
    });
  }
}, [labs, teachers]);

useEffect(() => {
  setForm({
    ...form,
    startTime: getTimeFormat(startTime, true),
    endTime: getTimeFormat(endTime, true),
  });
}, [startTime, endTime]);

useEffect(() => {
  setForm({
    ...form,
    startRecur: getDateFormat(startRecur),
    endRecur: getDateFormat(endRecur),
  });
}, [startRecur, endRecur]);
```

### Διαχείριση Ασύγχρονων Καταστάσεων

Η εφαρμογή διαχειρίζεται επίσης τις ασύγχρονες καταστάσεις, όπως η φόρτωση δεδομένων από το API:

```tsx
const getData = async () => {
  setLoad(true);
  setLabs([]);
  try {
    const { data } = await api.get<Lab[]>("api/labs");
    setLabs(data);
    setLoad(false);
  } catch (error) {
    setLoad(false);
  }
};
```

Για τη διαχείριση της κατάστασης φόρτωσης, χρησιμοποιείται η μεταβλητή `load`, η οποία ενημερώνεται πριν και μετά την ασύγχρονη λειτουργία.

### Η χρήση του useMemo

Για τη βελτιστοποίηση της απόδοσης, η εφαρμογή χρησιμοποιεί το hook `useMemo` για την αποθήκευση στην cache των αποτελεσμάτων υπολογισμών που είναι ακριβοί σε πόρους:

```tsx
const events = useMemo(
  () =>
    data.map((lab: LabInstance) => ({
      ...lab,
      instanceData: lab,
      title: `${lab.lab?.lab_name}`,
      startTime: lab.startTime,
      endTime: lab.endTime,
      daysOfWeek: [lab.daysOfWeek],
      startRecur: moment(lab.startRecur).format("YYYY-MM-DD"),
      endRecur: moment(lab.endRecur).format("YYYY-MM-DD"),
    })),
  [data]
);

const subsObj = useMemo(() => {
  return groupBy(subscriptions, (s) =>
    moment(s.subscriptionDate).format("YYYY-MM-DD")
  );
}, [subscriptions]);

const subs = useMemo(() => {
  const subEntries = Object.entries(subsObj);
  const todaySubs = subEntries.find((e) => {
    return moment(e[0]).isSame(new Date(), "day");
  });
  if (!todaySubs) {
    subEntries.push([`${moment().format("YYYY-MM-DD")}`, []]);
  }
  return subEntries;
}, [subsObj]);

const currentSubs = useMemo(() => {
  if (selectedDate) {
    if (Array.isArray(subsObj[selectedDate])) {
      return subsObj[selectedDate];
    } else {
      return [];
    }
  } else {
    return [];
  }
}, [subsObj, selectedDate]);

const searchedSubs = useMemo(() => {
  const numSerch = parseInt(search);
  let key: "name" | "register_number" = "register_number";
  if (isNaN(numSerch)) {
    key = "name";
  }

  return currentSubs.filter((s) => {
    let searchStr = s[key];
    if (typeof searchStr !== "string") {
      searchStr = `${searchStr}`;
    } else {
      searchStr = greelUtils.toGreeklish(searchStr.toLowerCase());
    }

    return searchStr.includes(search);
  });
}, [currentSubs, search]);
```

### Συμπεράσματα

Η διαχείριση καταστάσεων στην εφαρμογή διαχείρισης απουσιών έχει υλοποιηθεί με ένα συνδυασμό τεχνικών, με κύρια την Context API και το `useReducer` για την καθολική διαχείριση καταστάσεων, και το `useState` για την τοπική διαχείριση καταστάσεων σε επίπεδο component.

Αυτή η προσέγγιση επιτρέπει:
- Την αποτελεσματική διαχείριση της καθολικής κατάστασης της εφαρμογής
- Την εύκολη πρόσβαση στην κατάσταση από διαφορετικά components
- Την προβλεψιμότητα των ενημερώσεων της κατάστασης
- Την αποφυγή του "prop drilling" (μεταφορά των props μέσω πολλαπλών επιπέδων components)

Η χρήση του TypeScript για τον ορισμό των τύπων των καταστάσεων και των ενεργειών προσθέτει ένα επιπλέον επίπεδο ασφάλειας και καθιστά τον κώδικα πιο εύκολο στη συντήρηση και την επέκταση.

Συνολικά, η στρατηγική διαχείρισης καταστάσεων που έχει υιοθετηθεί στην εφαρμογή είναι κατάλληλη για το μέγεθος και την πολυπλοκότητά της, προσφέροντας έναν καλό συμβιβασμό μεταξύ απλότητας και λειτουργικότητας. 