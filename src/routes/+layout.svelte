<script>
  import {onMount, tick} from "svelte";
  import { auth } from "../lib/firebase/firebase";
  import { authHandlers, authStore } from "../store/store";
  export let data;

  const nonAuthRoutes = ["/", "/login", "/about"];
  let user;

  $: {
    authStore.subscribe(async value => {
      user = value.user;
      await tick();
    });
 }

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

      if (!user) {
        return;
      }

      authStore.update((curr) => {
        return {
          ...curr,
          user,
          loading: false,
        };
      });
    });
  });
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
    {#if user}
      <div class="logout-pill">
        <a href="/login" on:click={authHandlers.logout}><p class="logout">Log Out</p></a>
      </div>
      <p>welcome, {user.email}</p>
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
