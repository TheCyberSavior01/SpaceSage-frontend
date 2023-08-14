import React, { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase/firebase.config";
import { useStateValue } from "../provider/StateProvider";
import { actionType } from "../provider/reducer";

const auth = getAuth(firebaseApp);

export default function Main() {
  const [{ user, loading }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        dispatch({
          type: actionType.SET_USER,
          user: {
            displayName: loggedUser.displayName,
            email: loggedUser.email,
          },
        });
      } else {
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
      }
      dispatch({
        type: actionType.SET_LOADING,
        loading: false
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
