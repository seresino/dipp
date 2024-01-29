<script>
  import {onMount} from "svelte";
  import { auth } from "../lib/firebase/firebase";
  import { authStore, authHandlers, setUserID, getUserID, mount } from "$lib/utils/helperFunctions";
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let data; // data returned by the load function
  const user = data.user;

  const nonAuthRoutes = ["/", "/login", "/about"];


  // // Redirect undefined routes ----------------------------------------------------------------
  // export async function handle({ request, resolve }) {
  //   const response = await resolve(request);

  //   // If the response status is 404 (Not Found), redirect to the dashboard
  //   if (response.status === 404) {
  //     return goto('/dashboard');
  //   }

  //   return response;
  // }

  // Doesn't trigger when going to a page using redirects ----------------------------------------------------------------
  onMount (() => {
    console.log("Mounting layout.svelte");
    console.log("user: " + user);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = $page.url.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        // window.location.href = "/login";
        goto("/login");
        return;
      }

      if (!user && currentPath == "/login") {
        // window.location.href = "/dashboard";
        goto("/dashboard");
        return;
      }

      if (!user) {
        return;
      }
    });
  });


  function clearUser() {
    console.log("clearUser")
    setUserID(null);
    getUserID();
  }
</script>


<div class="Header">
  <div class="HeaderLogo">
    <a href="/dashboard">
      <img class="dipp-svg" src="/images/header-logo.svg" alt="logo" />
    </a>
    <p class="FullText">Digital Intervention for Psychedelic Preparedness</p>
  </div>
  <div class="pill-buttons">
    <div class="about-pill">
      <a href="/about"><p class="about">About</p></a>
    </div>
    <div class="about-pill">
      <a href="#" on:click|preventDefault={clearUser}><p class="about">Clear User</p></a>
    </div>
    {#if user}
      <div class="logout-pill">
        <a href="/login" on:click={authHandlers.logout} data-sveltekit-reload><p class="logout">Log Out</p></a>
      </div>
      <p>welcome, {user.username} - {user.id}</p>
    {/if}
  </div>
</div>
<div class="mainContainer">
  <slot/>
</div>

<style>
  .mainContainer {
    min-height: 100svh;
    width: 100svw;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
  }
  .Header {
    width: 100svw;
    padding: 40px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .HeaderLogo {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .dipp-svg {
    padding: 10px;
    padding-right: 100px;
  }
  .FullText {
    color: black;
    font-size: 20px;
    font-family: Helvetica Neue;
    font-weight: 500;
  }
  .pill-buttons {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    gap: 20px;
  }
  .about-pill {
    width: 101.80px;
    height: 43px;
    border-radius: 38px;
    border: 1px black solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .logout-pill {
    width: 101.80px;
    height: 43px;
    border-radius: 38px;
    border: 1px black solid;
    background-color: black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .about {
    color: black;
    font-size : 16px;
    font-family : Helvetica Neue;
    font-weight : 500;
  }
  .logout {
    color: white;
    font-size : 16px;
    font-family : Helvetica Neue;
    font-weight : 500;
  }
</style>
