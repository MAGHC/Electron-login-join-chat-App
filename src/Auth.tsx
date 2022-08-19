import { auth } from "./firebase";

import { useState } from "react";

const Auth = () => {
  const [userState, setUserState] = useState<object | null>(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserState(user);
    } else {
      setUserState(null);
    }
  });

  return userState;
};

export default Auth;
