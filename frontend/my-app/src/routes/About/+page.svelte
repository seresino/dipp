<script>
  import {onMount} from "svelte";
  import { auth, db } from "../../lib/firebase/firebase";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { authHandlers, authStore } from "../../store/store";

  const nonAuthRoutes = ["/", "/Login", "/About"];

  onMount (() => {
    console.log("Mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/Login";
        return;
      }

      if (user && currentPath == "/Login") {
        window.location.href = "/Dashboard";
        return;
      }
    });
  });
</script>

<div class="pop-up-shape">
  <a class="back-button" href="/Dashboard"><img src="/images/cross-circle.svg" alt="back button" /></a>
  <img src="/images/pop-up-shape.svg" alt="pop-up-shape" />
</div>


<style>
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .pop-up-shape {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
