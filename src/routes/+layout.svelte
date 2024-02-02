<script>
  import {onMount} from "svelte";
  import { auth } from "../lib/firebase/firebase";
  import { authStore, authHandlers} from "$lib/utils/helperFunctions";
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms'

  export let data; // data returned by the load function
  let user;
  try {
    user = data.user[0];
  } catch(error){}
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
        <!-- <a href="/login" on:click={authHandlers.logout} data-sveltekit-reload><p class="logout">Log Out</p></a> -->
        <form class="logout" action="/logout" method="POST" use:enhance data-sveltekit-reload>
          <button type="submit">Log out</button>
        </form>
      </div>
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
