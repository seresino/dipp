<!-- Journal.svelte -->
<script>
  import { authStore } from "../../store/store";

  let journalEntry = "";
  let error = false;
  let errormessage = "";
  let submitted = false;
  let currentDayEntry = "";
  let loading = true;

</script>

{#if !$authStore.loading}


<div class="pop-up-shape">
  <img class="blue-background" src="/images/journal-page.svg" alt="pop-up-shape" />
  <div class="pop-up-text">
    <h1>Your Daily Journal Entry</h1>
      <div class="enterTask">
        {#if loading}
        <!-- Display a loading indicator while fetching data -->
          <p>Loading...</p>
        {:else if submitted || currentDayEntry}
          <p>{currentDayEntry}</p>
        {:else}
          <form on:submit={submitTask}>
            <input class={(error ? "errorBorder" : "")} bind:value={journalEntry} type="text" id="journal" placeholder="How was your day?" />
            <button on:click={submitTask}>Submit</button>
          </form>
          <p>{errormessage}</p>
        {/if}
      </div>
  </div>
  <a href="/Dashboard"><img class="home-button" src="/images/home-button.svg" alt="home button"></a>
  <a class="back-button" href="/Day"><img src="/images/back-button.svg" alt="back button" /></a>
</div>


{/if}

<style>
  .pop-up-shape {
    position: relative;
  }
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .blue-background {

  }
  .home-button {
    position: absolute;
    top: 40px;
    right: 50px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .pop-up-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  h1 {
    color: #FFF;
    font-family: Helvetica Neue;
    font-size: 32px;
    font-weight: 300;
    width: 70%;
  }

  .enterTask {
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: space-between;
    gap: 24px;
  }
  .enterTask input {
    padding: 20px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #D5D5D5;
    background: #FFF;
    width: 812px;
    height: 379px;
    display: flex;
    flex-direction: column;
    align-items: right;
    resize: none;
  }

  .errorBorder {
    border-color: red !important;
  }

  .enterTask input:focus{
    border: 1px solid #029CF6;
  }

  button {
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid #029CF6;
    width: 101px;
    height: 39px;
    background: #FFF;
  }

  button:hover{
    opacity: 0.7;
  }

</style>
