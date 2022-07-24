import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAc7A6df6rNfpUrPcCTfOGnM7SkTXgmXLo",
  authDomain: "chocolate-app-31bfe.firebaseapp.com",
  projectId: "chocolate-app-31bfe",
  storageBucket: "chocolate-app-31bfe.appspot.com",
  messagingSenderId: "295461074765",
  appId: "1:295461074765:web:76d8db78e9e808ade66904",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
