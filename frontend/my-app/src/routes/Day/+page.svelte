<!-- Day.svelte -->
<script>
    import { onMount } from 'svelte';
    import { authStore, authHandlers } from "../../store/store";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import { db } from "../../lib/firebase/firebase";

  let journalEntry = "";
  let error = false;

  authStore.subscribe((curr) => {
    journalEntry = curr.data.journal
  })

  function doneTask() {
    error = false
    if (journalEntry == "") {
      error = true
    }
    console.log(error)
  }

  async function submitTask() {
    try {
      const userRef = doc(db, "users", $authStore.user.uid);
      console.log($authStore.user.uid)
      await setDoc( userRef, {journal: journalEntry,  }, );
    } catch (err) {
      console.log('There was an error saving your information!')
    }
  }
</script>

{#if !$authStore.loading}

  <div class="mainContainer">
    <div class="headerContainer">
      <h1>DIPP</h1>
      <button on:click={authHandlers.logout}>Log Out</button>
    </div>
    <div class="enterTask">
      <input class={(error ? "errorBorder" : "")} bind:value={journalEntry} type="text" id="journal" placeholder="How was your day?" />
      <button on:click={doneTask}>Done</button>
      <button on:click={submitTask}>Submit Task</button>
    </div>
  </div>

{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button {
    cursor: pointer;
  }

  button:hover{
    opacity: 0.7;
  }

  .enterTask {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: stretch;

  }

  .enterTask input {
    background: white;
    border-color: transparent;
    border-radius: 5px;
    padding: 20px;
    flex: 1;
  }

  .errorBorder {
    border-color: coral !important;
  }

  .enterTask input:focus{
    outline: none;
  }

  .enterTask button {
    padding: 28px 28px;
    background: lime;
    border-radius: 5px;
    border: none;
    color: black;
    cursor: pointer;
  }


</style>
