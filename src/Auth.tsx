import { auth } from "./firebase";

const Auth = (setState: Function) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setState(user);
    } else {
      return;
    }
  });

  return;
};

export default Auth;
