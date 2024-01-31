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

<div class="pop-up white">
  <a class="circular-button back" href="/dashboard"><img src="/images/cross-circle-button.svg" alt="back button" /></a>
  <div class="pop-up-content left">
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
  .divider {
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.1);
  }
</style>
