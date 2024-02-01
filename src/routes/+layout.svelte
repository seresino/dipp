<script>
  import {onMount, tick} from "svelte";
  import { auth } from "../lib/firebase/firebase";
  import { authHandlers, authStore } from "../store/store";
  import { goto } from '$app/navigation';

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
        // goto('/login');
        return;
      }

      if (user && currentPath == "/login") {
        window.location.href = "/dashboard";
        // goto('/dashboard');
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



<div class="main-container">
  <div class="header">
    <div class="header-logo">
      <a href="/dashboard">
        <img class="dipp-svg" src="/images/header-logo.svg" alt="logo" />
      </a>
      <p class="logo-text">Digital Intervention for Psychedelic Preparedness</p>
    </div>
    <div class="pill-buttons">
      <div class="about-pill">
        <a href="/about"><p class="about">About</p></a>
      </div>
      {#if user}
        <div class="logout-pill">
          <a href="/login" on:click={authHandlers.logout}><p class="logout">Log Out</p></a>
        </div>
      {/if}
    </div>
  </div>
  <div class="slot-container">
    <slot/>
  </div>
</div>

<style>
  .main-container {
    display:block;
    min-height: 100svh;
    width: 100svw;
  }
  .slot-container {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 178px);
    max-width: 100%;
    padding: 0 20px 20px 20px;
  }
  .header {
    width: 100%;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  .header-logo {
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 40px;
  }
  .dipp-svg {
    padding: 10px;

  }
  .logo-text {
    color: black;
    font-size: 20px;
    font-family: Helvetica Neue;
    font-weight: 500;
  }
  @media (max-width: 1000px) {
    .logo-text {
      display: none;
    }
    .pill-buttons {
      display: none;
    }
    .header {
      justify-content: center;
    }
  }

  .pill-buttons {
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
