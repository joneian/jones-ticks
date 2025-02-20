import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, doc, DocumentData, setDoc, initializeFirestore, persistentLocalCache } from "firebase/firestore";

function Star({field, today} : {field: string, today: string}) {
  return <Clickable field={field} today={today} true_value="⭐️" false_value="☆"/>
}

function Tick({field, today} : {field: string, today: string}) {
  return <Clickable field={field} today={today} true_value="✅" false_value="🔲"/>
}

function Clickable({field, today, true_value, false_value} : {field: string, today: string, true_value: string, false_value: string}) {
  return <div className="row" onClick={() => {
    setDoc(doc(db, "tick_days", today), { [field]: data ? !data[field] : true }, { merge: true });
  }}> 
    <div className="clickable">
      {data && data[field] ? true_value : false_value}
    </div>
  </div>
}

function Column({name, today} : {name: string, today: string}) {
  return <div className="column">
    <div className="row"> 
      <h2>{name}</h2>
    </div>
    <Tick field={name + "_morning"} today={today}/>
    <Tick field={name +"_afternoon"}  today={today}/>
    <Star field={name + "_star"} today={today}/>
  </div>
}

function HeadingColumn() {
  return <div className="column">
    <div className="row"/> 
    <div className="row">
      <h3>AM:</h3>
    </div> 
    <div className="row">
      <h3>PM:</h3>
    </div>
    <div className="row">
      <h3>Star:</h3>
    </div>
</div>

}
function App() {
  const today = useToday();
  const data = useData(today);
  console.log(JSON.stringify(data));
  // const [selected, setSelected] = useState(false)

  return (
    <>  
      <h1>{(new Date()).toLocaleDateString("en-GB", {weekday: "long"}) }</h1>
      <div className="horizontal">
        
        <HeadingColumn/>

        <Column name="Florence" today={today}/>
        <Column name="Dulcie" today={today}/>
        <Column name="Violet" today={today}/>
      </div>
    </>
  )
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsorT71Z-moAoGR7ObZhohFqggfFD8sJs",
  authDomain: "jones-ticks.firebaseapp.com",
  projectId: "jones-ticks",
  storageBucket: "jones-ticks.firebasestorage.app",
  messagingSenderId: "892338410633",
  appId: "1:892338410633:web:1566d1dd578fccfe256258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: persistentLocalCache({})});

const db = getFirestore(app);
let data: DocumentData | undefined =  undefined;

function getSnapshot() {
  // const document = await getDoc(doc(db, "cities", "SF"));
  // return document.data();
  return data;
}

function useData(today: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    return onSnapshot(doc(db, "tick_days", today), (doc) => {
      data = doc.data();
      onStoreChange();
    });
  }, [today]);
  return useSyncExternalStore(
    subscribe, 
    getSnapshot
  );
}

function getToday() {
  return (new Date()).toISOString().split('T')[0];
}

function useToday() {
  const [today, setToday] = useState(getToday());
  
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("visible");
        setToday(getToday());
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return today;
}

export default App
