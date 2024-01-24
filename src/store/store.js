import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";

export const authStore = writable({
  user: null,
  loading: true,
  data: {}
})

export const authHandlers = {
  signup: async (email, pass) => {
     const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
     const user = userCredential.user;
     authStore.update((curr) => {
       return {
         ...curr,
         user: {
           ...user,
           email: user.email,
          },
         loading: false,
       };
     });
  },
  login: async (email, pass) => {
     const userCredential = await signInWithEmailAndPassword(auth, email, pass);
     const user = userCredential.user;
     authStore.update((curr) => {
       return {
         ...curr,
         user: {
           ...user,
           email: user.email,
         },
         loading: false,
       };
     });
  },
  logout: async () => {
    await signOut(auth)
    authStore.update((curr) => {
      return {
        ...curr,
        user: null,
      };
    });
  }
}

export const getCurrentUserEmail = () => {
 return new Promise(resolve => {
    authStore.subscribe(value => {
      resolve(value.user ? value.user.email : null);
    });
 });
}
