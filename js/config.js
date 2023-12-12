import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBMJsVpnbOwVOiVNbTZScZdet9qlGigDL0",
  authDomain: "conexion-8ec0d.firebaseapp.com",
  databaseURL: "https://conexion-8ec0d-default-rtdb.firebaseio.com",
  projectId: "conexion-8ec0d",
  storageBucket: "conexion-8ec0d.appspot.com",
  messagingSenderId: "679910299749",
  appId: "1:679910299749:web:9800b464879628b4850e8c",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
