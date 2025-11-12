import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { auth, db } from "../context/firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../types/User";
import { setUser, setLoading, clearUser } from "../redux/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      dispatch(setLoading(true));

      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        let profileData: User;

        if (snap.exists()) {
          const data = snap.data();
          profileData = new User(
            data.id,
            data.name,
            data.username,
            "",
            data.email,
            data.age,
            data.address,
            data.city,
            data.state,
            data.zipcode
          );
        } else {
          profileData = new User(
            firebaseUser.uid,
            firebaseUser.displayName ?? "",
            "", 
            "", 
            firebaseUser.email ?? "",
            0,
            "",
            "",
            "",
            ""
          );
          await setDoc(ref, profileData.toFirestore());
        }

        dispatch(setUser(profileData));
      } else {
        dispatch(clearUser());
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const signup = async (
    email: string,
    password: string,
    name: string,
    username: string,
    age: number,
    address: string,
    city: string,
    state: string,
    zipcode: string
  ) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newProfile = new User(
      firebaseUser.uid,
      name,
      username,
      password,
      email,
      age,
      address,
      city,
      state,
      zipcode
    );
    await setDoc(doc(db, "users", firebaseUser.uid), newProfile.toFirestore());
    dispatch(setUser(newProfile));
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  return {
    user,
    loading,
    isAuthenticated: user,
    signup,
    login,
    logout,
  };
};
