import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbTiZeRLOdSiKxQvi4juuIsc66hty1E5M",
  authDomain: "react-firebase-99a05.firebaseapp.com",
  projectId: "react-firebase-99a05",
  storageBucket: "react-firebase-99a05.appspot.com",
  messagingSenderId: "1022945754250",
  appId: "1:1022945754250:web:ec5603e3b5b275b3118173",
};

const app = initializeApp(firebaseConfig);

//app에 대한 인증 서비스를 사용
export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
