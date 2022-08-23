import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
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
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      window.location.href = "/chatmain";
    });
  } catch (err) {
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      displayName: name,
    });
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    await initChannel(auth.currentUser.email, auth.currentUser.displayName);
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
};

// 메세지 기능

const sendMessgae = async (message, channel, user) => {
  try {
    await addDoc(collection(db, "channels", channel, "messages"), {
      message: message,
      displayName: user.displayName,
      createAt: serverTimestamp(),
    });
  } catch (err) {
    alert(err.message);
  }
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

// 채널 기능

const initChannel = async (uid, username) => {
  try {
    await setDoc(doc(db, "channels", uid), {
      channelName: "나와의채팅",
      createAt: serverTimestamp(),
    });
    await setDoc(
      doc(db, "channels", uid),

      {
        users: {
          uid: uid,
          username: username,
        },
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err.message);
  }
};

const addChaanel = async (channelName) => {
  try {
    await setDoc(doc(db, "channels", channelName), { channelName: channelName, createAt: serverTimestamp() });
    await addDoc(collection(db, "channels", channelName, "users"), {});
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

// const setChannel = async (setData) => {
//   return onSnapshot(query(collection(db, "channels"), orderBy("createAt")), (querySnapshot) => {
//     const channels = querySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//     })).filter(channel =>);

//   });
// };

// 유저 리스트

const getUserList = async (setData) => {
  return onSnapshot(query(collection(db, "users")), (querySnapshot) => {
    const users = querySnapshot.docs.map((doc) => ({
      name: doc.data().displayName,
    }));

    setData(users);
  });
};

// const addChannelUser = async () => {
//   try {
//     await addDoc();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

export {
  getChannel,
  addChaanel,
  getMessages,
  getUserList,
  sendMessgae,
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
