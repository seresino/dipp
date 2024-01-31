<script>
  import {onMount} from "svelte";
  import { auth } from "../../lib/firebase/firebase";

  const nonAuthRoutes = ["/", "/login", "/about"];

  onMount (() => {
    console.log("Mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/login";
        return;
      }

      if (user && currentPath == "/login") {
        window.location.href = "/dashboard";
        return;
      }
    });
  });
</script>

<div class="pop-up">
  <a class="back-button" href="/dashboard"><img src="/images/cross-circle.svg" alt="back button" /></a>
  <!-- <img src="/images/pop-up-shape.svg" alt="pop-up-shape" /> -->
  <div class="pop-up-content">
    <h4>About the Trial</h4>
    <br>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <br>
    <br>
    <h4>Papers Published</h4>
    <br>
    <div class="divider"></div>
    <br>
    <h4>Contact:</h4>
  </div>
</div>


<style>
  .back-button {
    position: absolute;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .back-button img {
    width: 5vw;
    min-width: 10px;
  }
  .pop-up {
    position: relative;
    width: 80vw;
    max-width: 1000px;
    min-height: 80vh;
    background-color: white;
    border-radius: 10px;
  }
  .pop-up-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    top:0; bottom:0; left:0; right:0;
    padding: 100px 100px 50px 100px;
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.1);
  }
</style>
