## Διαχείριση Εργαστηρίων και Απουσιών

### Εισαγωγή

Η διαχείριση των εργαστηρίων και των απουσιών αποτελεί τον πυρήνα της λειτουργικότητας της εφαρμογής. Το σύστημα έχει σχεδιαστεί για να επιτρέπει στους καθηγητές να δημιουργούν και να διαχειρίζονται εργαστήρια, να προγραμματίζουν συνεδρίες μέσω ενός διαδραστικού ημερολογίου, και να καταγράφουν και να παρακολουθούν τις παρουσίες και απουσίες των φοιτητών.

### Διαχείριση Εργαστηρίων

#### Μοντέλο Εργαστηρίου

Το μοντέλο του εργαστηρίου ορίζεται ως εξής:

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
```

Τα κύρια πεδία του μοντέλου περιλαμβάνουν:
- **id**: Μοναδικό αναγνωριστικό του εργαστηρίου
- **lab_name**: Το όνομα του εργαστηρίου
- **lab_description**: Μια περιγραφή του εργαστηρίου
- **lab_year**: Το ακαδημαϊκό έτος του εργαστηρίου
- **lab_semester**: Το εξάμηνο στο οποίο διδάσκεται το εργαστήριο
- **createdAt** και **updatedAt**: Χρονικές σφραγίδες για τη δημιουργία και την τελευταία ενημέρωση

#### Σελίδα Διαχείρισης Εργαστηρίων

Η σελίδα διαχείρισης εργαστηρίων (`Labs.tsx`) επιτρέπει στους καθηγητές και τους διαχειριστές να δημιουργούν, να επεξεργάζονται και να διαγράφουν εργαστήρια. Η σελίδα περιλαμβάνει:

1. Έναν πίνακα με όλα τα διαθέσιμα εργαστήρια
2. Κουμπιά για την προσθήκη, επεξεργασία και διαγραφή εργαστηρίων
3. Ένα modal για την εισαγωγή ή επεξεργασία των πληροφοριών του εργαστηρίου

```tsx
<div className="flex w-full flex-col gap-6">
  <div className="flex flex-row items-center justify-between">
    <div className="text-2xl">Εργαστήρια</div>
    <Button size={"md"} onClick={addNew}>
      <IoMdAdd className="mr-2" />
      Προσθήκη
    </Button>
  </div>
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
  {load && (
    <div className="w-full text-center">
      <Spinner className="text-center" size={"xl"} />
    </div>
  )}
</div>
```

#### Επικοινωνία με το Backend

Η επικοινωνία με το backend για τη διαχείριση των εργαστηρίων υλοποιείται μέσω του Axios, με συναρτήσεις όπως:

```tsx
// Ανάκτηση όλων των εργαστηρίων
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

// Δημιουργία νέου εργαστηρίου
const sendNew = async () => {
  if (!checkValidation()) return;
  setIsProcessing(true);
  await api.post<Lab>(`api/labs`, selectedLab.current);
  setIsProcessing(false);
  closeModal();
  getData();
};

// Επεξεργασία υπάρχοντος εργαστηρίου
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

// Διαγραφή εργαστηρίου
const sendDelete = async (id: number) => {
  await api.delete<Lab>(`api/labs/${id}`);
  getData();
};
```

### Προγραμματισμός Εργαστηριακών Συνεδριών

#### Μοντέλο Εργαστηριακής Συνεδρίας

Το μοντέλο της εργαστηριακής συνεδρίας ορίζεται ως εξής:

```tsx
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
```

Τα κύρια πεδία του μοντέλου περιλαμβάνουν:
- **id**: Μοναδικό αναγνωριστικό της συνεδρίας
- **startTime** και **endTime**: Η ώρα έναρξης και λήξης της συνεδρίας
- **daysOfWeek**: Η ημέρα της εβδομάδας στην οποία πραγματοποιείται η συνεδρία
- **startRecur** και **endRecur**: Οι ημερομηνίες έναρξης και λήξης της επανάληψης
- **labId** και **teacherId**: Αναφορές στο εργαστήριο και τον καθηγητή
- **color**: Το χρώμα της συνεδρίας στο ημερολόγιο

#### Ημερολόγιο Προγραμματισμού

Το ημερολόγιο υλοποιείται με τη χρήση της βιβλιοθήκης FullCalendar, η οποία παρέχει ένα διαδραστικό ημερολόγιο με δυνατότητες όπως η δημιουργία, η επεξεργασία και η διαγραφή συμβάντων. Το component `Calendar.tsx` περιέχει την υλοποίηση του ημερολογίου:

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

#### Δημιουργία και Επεξεργασία Συνεδριών

Η δημιουργία και η επεξεργασία συνεδριών γίνεται μέσω ενός modal που περιέχει φόρμες για την εισαγωγή των πληροφοριών της συνεδρίας:

```tsx
// Δημιουργία νέας συνεδρίας
const sendNew = async () => {
  setIsProcessing(true);
  await api.post("api/labinstance", form);
  refresh().then(() => {
    closeModal();
  });
  setIsProcessing(false);
};

// Επεξεργασία υπάρχουσας συνεδρίας
const sendEdit = async () => {
  setIsProcessing(true);
  await api.put(`api/labinstance/${form.id}`, form);
  refresh().then(() => {
    closeModal();
  });
  setIsProcessing(false);
};
```

### Διαχείριση Απουσιών

#### Μοντέλο Απουσίας

Το μοντέλο της απουσίας αντιπροσωπεύεται από το μοντέλο `Subscription`:

```tsx
interface Subscription {
  id: number;
  name: string;
  register_number: string;
  subscriptionDate: string;
}
```

Τα κύρια πεδία του μοντέλου περιλαμβάνουν:
- **id**: Μοναδικό αναγνωριστικό του φοιτητή
- **name**: Το όνομα του φοιτητή
- **register_number**: Ο αριθμός μητρώου του φοιτητή
- **subscriptionDate**: Η ημερομηνία της εγγραφής/απουσίας

#### Σελίδα Διαχείρισης Απουσιών

Η σελίδα διαχείρισης απουσιών (`Absences.tsx`) επιτρέπει στους καθηγητές να καταγράφουν και να διαχειρίζονται τις παρουσίες και απουσίες των φοιτητών. Η σελίδα περιλαμβάνει:

1. Μια λίστα με τις διαθέσιμες ημερομηνίες
2. Μια λίστα με τους φοιτητές που έχουν εγγραφεί για κάθε ημερομηνία
3. Δυνατότητα αναζήτησης φοιτητών
4. Δυνατότητα προσθήκης και διαγραφής φοιτητών

```tsx
{selectedDate && (
  <>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <div onClick={() => setSelectedDate(undefined)}>
          <IoMdArrowBack size={25}></IoMdArrowBack>
        </div>
        <div className="text-2xl">
          {moment(selectedDate).format("Do MMMM YYYY")}
        </div>
      </div>
      <Button size={"md"} onClick={openModal}>
        <IoMdAdd className="mr-2" />
        Εγγραφή φοιτητών
      </Button>
    </div>
    <div className=" flex flex-row justify-between">
      <TextInput
        id="search"
        placeholder="Αναζήτηση"
        className=" basis-[400px]"
        rightIcon={FiSearch}
        onChange={(e) => {
          setSearch(e.target.value);
          setTimeout(() => {
            e.target.focus();
          });
        }}
        type="text"
      />
    </div>
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>A/M</Table.HeadCell>
        <Table.HeadCell>Όνομα</Table.HeadCell>
        <Table.HeadCell className=" w-3">
          <span className="sr-only">Delete</span>
        </Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y">
        {searchedSubs.map((subscription) => (
          <Table.Row
            key={subscription.id}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {subscription.register_number}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {subscription.name}
            </Table.Cell>

            <Table.Cell>
              <Button
                pill
                size={"xs"}
                color="failure"
                onClick={() => sendDelete(subscription)}
              >
                <MdDelete />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    {currentSubs.length === 0 && (
      <div className="mt-3 text-center text-sm text-gray-400">
        Κανένας εγγεγραμμένος φοιτητής
      </div>
    )}
  </>
)}
```

#### Προσθήκη και Διαγραφή Απουσιών

Η προσθήκη και η διαγραφή απουσιών γίνεται μέσω των ακόλουθων συναρτήσεων:

```tsx
// Διαγραφή απουσίας
const sendDelete = async (sub: Subscription) => {
  await api.delete(`api/subscriptions/${id}`, {
    data: {
      labInstanceId: id,
      studentId: sub.id,
      subscriptionDate: sub.subscriptionDate,
    },
  });
  refresh();
};
```

Η προσθήκη απουσιών γίνεται μέσω του component `Absences.modal.tsx`, το οποίο εμφανίζει ένα modal με μια λίστα διαθέσιμων φοιτητών για επιλογή.

### Διαχείριση Φοιτητών

#### Μοντέλο Φοιτητή

Το μοντέλο του φοιτητή ορίζεται ως εξής:

```tsx
export interface Student {
  id: number;
  name: string;
  register_number: string;
}
```

#### Σελίδα Διαχείρισης Φοιτητών

Η σελίδα διαχείρισης φοιτητών (`Students.tsx`) επιτρέπει στους καθηγητές και τους διαχειριστές να δημιουργούν, να επεξεργάζονται και να διαγράφουν φοιτητές. Η σελίδα περιλαμβάνει λειτουργίες παρόμοιες με αυτές της σελίδας διαχείρισης εργαστηρίων.

### Ομαδοποίηση και Φιλτράρισμα Δεδομένων

Η εφαρμογή χρησιμοποιεί το hook `useMemo` για την αποδοτική ομαδοποίηση και το φιλτράρισμα των δεδομένων:

```tsx
// Ομαδοποίηση εγγραφών ανά ημερομηνία
const subsObj = useMemo(() => {
  return groupBy(subscriptions, (s) =>
    moment(s.subscriptionDate).format("YYYY-MM-DD")
  );
}, [subscriptions]);

// Φιλτράρισμα εγγραφών με βάση την επιλεγμένη ημερομηνία
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

// Αναζήτηση φοιτητών
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

### Υποστήριξη για Ελληνικά

Η εφαρμογή παρέχει υποστήριξη για την ελληνική γλώσσα με τη χρήση της βιβλιοθήκης `greek-utils` για την μετατροπή ελληνικών χαρακτήρων σε λατινικούς κατά την αναζήτηση. Επίσης, χρησιμοποιεί το λειτουργικό `locale` της βιβλιοθήκης Moment.js για την εμφάνιση ημερομηνιών στα ελληνικά:

```tsx
import moment, { Moment } from "moment";
import "moment/locale/el";

// ...

moment.locale("el");
```

### Επικύρωση Δεδομένων

Η εφαρμογή περιλαμβάνει διάφορους ελέγχους επικύρωσης για να διασφαλίσει την ακεραιότητα των δεδομένων:

```tsx
// Έλεγχος εγκυρότητας δεδομένων εργαστηρίου
const checkValidation = () => {
  const nameLength = selectedLab.current.lab_name.length;
  if (nameLength > 0) {
    return true;
  } else {
    setIsValid(false);
    return false;
  }
};

// Έλεγχος εγκυρότητας δεδομένων συνεδρίας
useEffect(() => {
  const timeIsNotGood = startTime.isSameOrAfter(endTime);
  const dateIsNotGood = moment(form.startRecur).isSameOrAfter(form.endRecur);

  if (timeIsNotGood || dateIsNotGood) {
    if (dateIsNotGood) {
      setAlert({
        text1: "Μη έγκυρο εύρος ημερομηνιών!",
        text2:
          "Βεβαιωθείτε ότι η ημερομηνία έναρξης προηγείται της ημερομηνίας λήξης",
      });
    } else if (timeIsNotGood) {
      setAlert({
        text1: "Μη έγκυρο εύρος χρόνου!",
        text2: "Βεβαιωθείτε ότι η ώρα έναρξης προηγείται της ώρας λήξης",
      });
    }
    setInvalid(true);
    return;
  }
  let invalid = false;

  for (const [k, v] of Object.entries(form)) {
    if (k === "id") {
      continue;
    }
    if (v === undefined) {
      invalid = true;
    }
  }
  if (!invalid) {
    setAlert(undefined);
  }
  setInvalid(invalid);
}, [form]);
```

### Συμπεράσματα

Η διαχείριση εργαστηρίων και απουσιών αποτελεί τον πυρήνα της εφαρμογής και έχει υλοποιηθεί με τρόπο που παρέχει μια πλούσια και διαισθητική εμπειρία χρήστη. Η χρήση σύγχρονων βιβλιοθηκών όπως το FullCalendar, το React, το Tailwind CSS και το Axios επιτρέπει την αποτελεσματική υλοποίηση των διαφόρων λειτουργιών της εφαρμογής.

Η εφαρμογή παρέχει ένα ολοκληρωμένο σύστημα για τη διαχείριση εργαστηρίων, τον προγραμματισμό συνεδριών και την καταγραφή απουσιών, καλύπτοντας τις ανάγκες των καθηγητών για την αποτελεσματική διαχείριση της συμμετοχής των φοιτητών στα εργαστηριακά μαθήματα.

Η υποστήριξη για την ελληνική γλώσσα, η παροχή διαφορετικών επιπέδων πρόσβασης ανάλογα με το ρόλο του χρήστη, και η ενσωμάτωση διαφόρων ελέγχων επικύρωσης διασφαλίζουν ότι η εφαρμογή είναι εύχρηστη, ασφαλής και αξιόπιστη. 