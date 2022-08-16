import { initializeApp } from "firebase/app";
import { removeToken, setToken } from "./utils";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRdZ8gY1cpFePO51MBVupJkPe6UqDLSbo",
  authDomain: "assignment-a7ec8.firebaseapp.com",
  databaseURL: "https://assignment-a7ec8-default-rtdb.firebaseio.com",
  projectId: "assignment-a7ec8",
  storageBucket: "assignment-a7ec8.appspot.com",
  messagingSenderId: "304484469492",
  appId: "1:304484469492:web:ca7f33dbd5ef9c97506ca1",
  measurementId: "G-8M61MMRZ62",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//로그인 , 로그아웃 , 회원가입

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then((res) => {
      const resToken = res.user.accessToken;
      setToken(resToken);
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  removeToken();
};

// 채팅 관련
const database = getDatabase();

export { database, auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout };
