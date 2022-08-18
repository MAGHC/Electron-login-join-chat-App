import { initializeApp } from "firebase/app";
import { removeToken, setToken } from "./utils";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, onSnapshot, doc, query, orderBy, getDoc, collection, where, addDoc, serverTimestamp, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRdZ8gY1cpFePO51MBVupJkPe6UqDLSbo",
  authDomain: "assignment-a7ec8.firebaseapp.com",
  databaseURL: "https://assignment-a7ec8-default-rtdb.firebaseio.com",
  projectId: "assignment-a7ec8",
  storageBucket: "assignment-a7ec8.appspot.com",
  messagingSenderId: "304484469492",
  appId: "1:304484469492:web:ca7f33dbd5ef9c97506ca1",
  measurementId: "G-8M61MMRZ62",

  // apiKey: process.env.REACT_APP_apiKey,
  // authDomain: process.env.REACT_APP_authDomain,
  // databaseURL: process.env.REACT_APP_databaseURL,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingSenderId,
  // appId: process.env.REACT_APP_appId,
  // measurementId: process.env.REACT_APP_measurementId,

  // env 를 진작에 사용했으나 적용이 안되어서 일단 주석처리
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

const user = auth.currentUser;

const sendMessgae = async (message, channel) => {
  // if (user !== null) {
  try {
    await addDoc(collection(db, "channels", channel, "messages"), {
      message: message,
      // user: user.email,
      createAt: serverTimestamp(),
    });
  } catch (err) {
    alert(err.message);
  }
  // } else {
  //   return;
  // }
};

const getMessages = async (callback, channel) => {
  try {
    return onSnapshot(query(collection(db, "channels", channel, "messages"), orderBy("createAt")), (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  } catch (err) {
    alert(err.message);
  }
};

const addChaanel = async (channelName) => {
  try {
    await setDoc(doc(db, "channels", channelName), { channelName: channelName, createAt: serverTimestamp() });
  } catch (err) {
    console.log(err.message);
  }
};

const getChannel = async (setData) => {
  return onSnapshot(query(collection(db, "channels"), orderBy("createAt")), (querySnapshot) => {
    const channels = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setData(channels);
  });
};

export { getChannel, addChaanel, getMessages, user, sendMessgae, auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout };
