<script>
  import {onMount} from "svelte";
  import { auth, db } from "../lib/firebase/firebase";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { authStore } from "../store/store";

  const nonAuthRoutes = ["/"];

  onMount (() => {
    console.log("Mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/";
        return;
      }

      if (user && currentPath == "/") {
        window.location.href = "/Dashboard";
        return;
      }

      if (!user) {
        return;
      }

      let dataToSetToStore;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("Creating User");
        const userRef = doc(db, "users", user.uid);
        dataToSetToStore = {
          email: user.email,
          journal: "",
        };
        await setDoc(userRef, dataToSetToStore);
      } else {
        console.log("Fetching User");
        const userData = docSnap.data();
        dataToSetToStore = userData;
      }
      authStore.update((curr) => {
        return {
          ...curr,
          user,
          data: dataToSetToStore,
          loading: false,
        };
      });
    });
  });
</script>

<div class="mainContainer">
  <slot/>
</div>

<style>
  .mainContainer {
    min-height: 100svh;
    background: linear-gradient(to right, green, white);
    color: white;
    display: flex;
    flex-direction: column;
  }

</style>
