import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Create or update Firestore profile
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: user.displayName ?? "",
        createdAt: new Date(),
      },
      { merge: true }
    );
  }
});
export { auth, db };