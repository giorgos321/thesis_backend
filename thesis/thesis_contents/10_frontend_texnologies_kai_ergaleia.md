## Τεχνολογίες και Εργαλεία

### Frontend Framework: React

Η εφαρμογή διαχείρισης απουσιών αναπτύχθηκε χρησιμοποιώντας το React ως κύριο frontend framework. Το React, που αναπτύχθηκε από τη Facebook, είναι μία από τις πιο δημοφιλείς βιβλιοθήκες JavaScript για την ανάπτυξη διαδραστικών διεπαφών χρήστη. Η επιλογή του React βασίστηκε στα εξής πλεονεκτήματα:

- **Component-Based Architecture**: Επιτρέπει την ανάπτυξη επαναχρησιμοποιήσιμων συστατικών, βελτιώνοντας τη συντηρησιμότητα και την κλιμάκωση της εφαρμογής.
- **Virtual DOM**: Βελτιώνει την απόδοση της εφαρμογής, ενημερώνοντας μόνο τα μέρη της σελίδας που αλλάζουν, αντί για ολόκληρη τη σελίδα.
- **Μεγάλο οικοσύστημα**: Παρέχει πρόσβαση σε πολλές βιβλιοθήκες και εργαλεία που επιταχύνουν την ανάπτυξη.
- **Ισχυρή κοινότητα**: Συνεχής υποστήριξη και ενημερώσεις από μια ενεργή κοινότητα προγραμματιστών.

Στον κώδικα της εφαρμογής, μπορούμε να δούμε την ιεραρχική οργάνωση των components, όπως φαίνεται στο παρακάτω παράδειγμα από το αρχείο `Root.tsx`:

```tsx
export const Root: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const [state, dispatch] = useReducer(appReducer, defaultState);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [routes, setRoutes] = useState<RouteProps[]>([]);

  const navigate = useNavigate();

  // ... άλλος κώδικας ...

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar fluid>
        <div className="flex items-center">
          <HiMenuAlt1
            className="mr-6 h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-400"
            onClick={() => setCollapsed(!collapsed)}
          />
          <span className="text-xl font-semibold dark:text-white">
            Διαχηριστικό απουσιών
          </span>
        </div>
        {/* ... άλλος κώδικας ... */}
      </Navbar>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
          <Sidebar
            collapsed={collapsed}
            className="h-full border-r-2 border-gray-200"
          >
            {/* ... περιεχόμενα sidebar ... */}
          </Sidebar>
          <main
            className="flex-1 overflow-auto bg-white p-4 dark:bg-gray-900"
            ref={mainRef}
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              <RootUtils>
                <Routes>
                  {[...routes, ...bottomRoutes].map(
                    ({ href, component: Component }) => (
                      <Route key={href} path={href} element={Component} />
                    )
                  )}
                  <Route path="/subscriptions/:id" element={<Absences />} />
                  <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
                {/* ... άλλα στοιχεία ... */}
              </RootUtils>
            </Suspense>
          </main>
        </div>
      </AppContext.Provider>
    </div>
  );
};
```

### TypeScript

Η εφαρμογή αναπτύχθηκε χρησιμοποιώντας TypeScript, μια υπερσύνολο της JavaScript που προσθέτει στατικούς τύπους. Η χρήση του TypeScript παρέχει πολλά πλεονεκτήματα:

- **Ανίχνευση σφαλμάτων κατά τη διάρκεια της ανάπτυξης**: Τα σφάλματα σχετικά με τους τύπους εντοπίζονται νωρίς, μειώνοντας τα σφάλματα κατά την εκτέλεση.
- **Καλύτερη τεκμηρίωση**: Οι διεπαφές και οι τύποι λειτουργούν ως τεκμηρίωση για το πώς πρέπει να χρησιμοποιούνται τα components και οι συναρτήσεις.
- **Βελτιωμένα εργαλεία ανάπτυξης**: Η αυτόματη συμπλήρωση και ο έλεγχος τύπων στους επεξεργαστές κώδικα αυξάνουν την παραγωγικότητα.

Παράδειγμα χρήσης TypeScript για τον ορισμό διεπαφών (interfaces) στην εφαρμογή:

```tsx
interface Lab {
  id?: number;
  lab_name: string;
  lab_description: string;
  lab_year: number;
  lab_semester: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Teacher {
  id?: number;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LabInstance {
  id?: number;
  startTime?: string;
  endTime?: string;
  daysOfWeek?: string;
  startRecur?: string;
  endRecur?: string;
  labId?: number;
  teacherId?: number;
  color?: string;
  lab?: Lab;
  teacher?: Teacher;
  students?: Array<any>;
}

enum ModalMode {
  create,
  update,
}
```

### Tailwind CSS και Flowbite

Για το styling της εφαρμογής, χρησιμοποιήθηκε το Tailwind CSS σε συνδυασμό με τη βιβλιοθήκη Flowbite-React. Το Tailwind CSS είναι ένα utility-first CSS framework που επιτρέπει τη γρήγορη δημιουργία προσαρμοσμένων σχεδίων χωρίς να εγκαταλείπει το CSS.

Η βιβλιοθήκη Flowbite-React παρέχει έτοιμα React components που είναι σχεδιασμένα με το Tailwind CSS, επιτρέποντας την ταχεία ανάπτυξη της διεπαφής χρήστη με συνεπές στυλ.

Παράδειγμα χρήσης των Flowbite components, υλοποίηση ενός πίνακα:

```tsx
<Table hoverable>
  <Table.Head>
    <Table.HeadCell>Όνομα Εργαστηρίου</Table.HeadCell>
    <Table.HeadCell>Ακαδημαϊκό έτος</Table.HeadCell>
    <Table.HeadCell>Εξάμηνο</Table.HeadCell>
    <Table.HeadCell className=" w-3">
      <span className="sr-only">Delete</span>
    </Table.HeadCell>
    <Table.HeadCell className=" w-3">
      <span className="sr-only">Edit</span>
    </Table.HeadCell>
  </Table.Head>

  <Table.Body className="divide-y">
    {labs.map((lab) => (
      <Table.Row
        key={lab.id}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {lab.lab_name}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {lab.lab_year}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {lab.lab_semester}
        </Table.Cell>
        <Table.Cell>
          <Button
            pill
            size={"xs"}
            color="failure"
            onClick={() =>
              typeof lab.id === "number" && sendDelete(lab.id)
            }
          >
            <MdDelete />
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button pill size={"xs"} onClick={() => onEdit(lab)}>
            <MdEdit />
          </Button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

Η χρήση των utility classes του Tailwind CSS είναι εμφανής σε όλη την εφαρμογή, επιτρέποντας τον άμεσο έλεγχο του styling απευθείας από τα components:

```tsx
<div className="flex w-full flex-col gap-6">
  <div className="flex flex-row items-center justify-between">
    <div className="text-2xl">Εργαστήρια</div>
    <Button size={"md"} onClick={addNew}>
      <IoMdAdd className="mr-2" />
      Προσθήκη
    </Button>
  </div>
  // ... περισσότερα στοιχεία ...
</div>
```

### React Router

Για τη διαχείριση της πλοήγησης στην εφαρμογή, χρησιμοποιήθηκε το React Router, μια βιβλιοθήκη που επιτρέπει τη δημιουργία εφαρμογών μονής σελίδας (SPA) με πολλαπλές "σελίδες" ή "διαδρομές".

Η εφαρμογή χρησιμοποιεί το React Router για να ορίσει διαφορετικές διαδρομές για τις διάφορες λειτουργίες της, όπως φαίνεται στο αρχείο `routes.tsx`:

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

### FullCalendar

Για την υλοποίηση του ημερολογίου προγραμματισμού των εργαστηριακών συνεδριών, χρησιμοποιήθηκε η βιβλιοθήκη FullCalendar. Αυτή η βιβλιοθήκη παρέχει ένα πλήρες σύνολο λειτουργιών για την προβολή και τη διαχείριση συμβάντων σε ένα ημερολόγιο.

```tsx
<FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  initialView="timeGridWeek"
  weekends={weekends.weekendsVisible}
  editable={true}
  selectable={true}
  selectMirror={true}
  dayMaxEvents={true}
  height="auto"
  events={events}
  eventClick={eventClick}
  eventChange={eventChanged}
  headerToolbar={{
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  }}
  locale={"el"}
  allDaySlot={false}
  slotMinTime={"08:00:00"}
  slotMaxTime={"23:00:00"}
  firstDay={1}
/>
```

### Axios

Για την επικοινωνία με το backend, η εφαρμογή χρησιμοποιεί τη βιβλιοθήκη Axios. Αυτή η βιβλιοθήκη απλοποιεί τις HTTP αιτήσεις και παρέχει πολλές χρήσιμες λειτουργίες, όπως η δυνατότητα ακύρωσης αιτήσεων, η προστασία από επιθέσεις XSRF και η αυτόματη μετατροπή δεδομένων JSON.

Παράδειγμα χρήσης του Axios για την ανάκτηση εργαστηρίων:

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

### Material-UI

Για ορισμένα πιο σύνθετα components, όπως το date picker και το time picker, η εφαρμογή χρησιμοποιεί τη βιβλιοθήκη Material-UI (MUI). Συγκεκριμένα, χρησιμοποιεί το `@mui/x-date-pickers` για την επιλογή ημερομηνιών και ωρών.

```tsx
<LocalizationProvider dateAdapter={AdapterMoment}>
  <div className="flex flex-col gap-2">
    <div className="text-center">Επιλογή ημερομηνίας έναρξης</div>
    <div className="flex justify-center">
      <DateCalendar
        value={startRecur}
        onChange={(newValue) => {
          setStartRecur(newValue as Moment);
        }}
      />
    </div>
  </div>
  <div className="flex flex-col gap-2">
    <div className="text-center">Επιλογή ώρας έναρξης</div>
    <div className="flex justify-center">
      <TimeClock
        value={startTime}
        onChange={(newValue) => {
          setStartTime(newValue as Moment);
        }}
      />
    </div>
  </div>
</LocalizationProvider>
```

### Άλλες Βιβλιοθήκες και Εργαλεία

Η εφαρμογή χρησιμοποιεί επίσης πολλές άλλες βιβλιοθήκες και εργαλεία, όπως:

- **Moment.js**: Για τη διαχείριση και μορφοποίηση ημερομηνιών και ωρών.
- **React Icons**: Για τη χρήση εικονιδίων στην εφαρμογή.
- **Greek-Utils**: Για τη διαχείριση ελληνικών χαρακτήρων και κειμένου.
- **Lodash**: Για λειτουργίες βοηθητικές, όπως η ομαδοποίηση και η ταξινόμηση δεδομένων.

### Εργαλεία Ανάπτυξης

Για την ανάπτυξη της εφαρμογής, χρησιμοποιήθηκαν διάφορα εργαλεία, όπως:

- **ESLint**: Για τον στατικό έλεγχο κώδικα και την εφαρμογή συνεπών προτύπων κωδικοποίησης.
- **Prettier**: Για τη μορφοποίηση του κώδικα.
- **Vite**: Ως εργαλείο build που παρέχει ταχύτερη ανάπτυξη και καλύτερη απόδοση σε σύγκριση με παραδοσιακά εργαλεία.
- **Cypress**: Για τη δοκιμή end-to-end της εφαρμογής.
- **Vitest**: Για τις μονάδες δοκιμών (unit testing).
- **Storybook**: Για την ανάπτυξη και τεκμηρίωση των components.

Όλα αυτά τα εργαλεία συμβάλλουν στη δημιουργία μιας σύγχρονης, αποδοτικής και καλά δομημένης εφαρμογής που είναι εύκολη στη συντήρηση και την επέκταση. 