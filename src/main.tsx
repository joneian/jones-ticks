import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
