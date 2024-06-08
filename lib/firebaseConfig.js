import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIZu6gcjeonHlXF0C6-P_JK2iCxwMPufQ",
  authDomain: "ai-home-security-system-db.firebaseapp.com",
  databaseURL: "https://ai-home-security-system-db-default-rtdb.firebaseio.com",
  projectId: "ai-home-security-system-db",
  storageBucket: "ai-home-security-system-db.appspot.com",
  messagingSenderId: "450709831270",
  appId: "1:450709831270:android:1a43bdb46f4e7790c877a7",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
