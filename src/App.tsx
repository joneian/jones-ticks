import { useState, useSyncExternalStore } from 'react'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot, doc, getDoc, DocumentData, setDoc } from "firebase/firestore";

function Star({field} : {field: string}) {
  return <Clickable field={field} true_value="⭐️" false_value="☆"/>
}

function Tick({field} : {field: string}) {
  return <Clickable field={field} true_value="✅" false_value="🔲"/>
}

function Clickable({field, true_value, false_value} : {field: string, true_value: string, false_value: string}) {
  return <div className="row" onClick={() => {
    setDoc(docRef, { [field]: data ? !data[field] : true }, { merge: true });
  }}> 
    <div className="clickable">
      {data && data[field] ? true_value : false_value}
    </div>
  </div>
}

function Column({name} : {name: string}) {
  return <div className="column">
    <div className="row"> 
      <h2>{name}</h2>
    </div>
    <Tick field={name + "_morning"}/>
    <Tick field={name +"_afternoon"}/>
    <Star field={name + "_star"}/>
  </div>
}

function HeadingColumn() {
  return <div className="column">
    <div className="row"/> 
    <div className="row">
      <h3>Morning:</h3>
    </div> 
    <div className="row">
      <h3>Afternoon:</h3>
    </div>
    <div className="row">
      <h3>Star:</h3>
    </div>
</div>

}
function App() {
  const data = useData();
  console.log(JSON.stringify(data));
  // const [selected, setSelected] = useState(false)

  return (
    <>  
      <h1>{(new Date()).toLocaleDateString("en-GB", {weekday: "long"}) }</h1>
      <div className="horizontal">
        
        <HeadingColumn/>

        <Column name="Florence"/>
        <Column name="Dulcie"/>
        <Column name="Violet"/>
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

const db = getFirestore(app);

const today = (new Date()).toISOString().split('T')[0];
const docRef = doc(db, "tick_days", today);

let data: DocumentData | undefined =  undefined;

function subscribe(onStoreChange: () => void) {
  return onSnapshot(docRef, (doc) => {
    data = doc.data();
    onStoreChange();
  });
}

function getSubscription() {
  // const document = await getDoc(doc(db, "cities", "SF"));
  // return document.data();
  return data;
}

function useData() {
  return useSyncExternalStore(
    subscribe, 
    getSubscription
  );
}

export default App
