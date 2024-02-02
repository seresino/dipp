<!-- Journal.svelte -->
<script lang="ts">
  import { authStore } from "$lib/utils/helperFunctions";

  export let form;
  export let data; // data returned by the load function
  const user = data.user[0];
  let path = "journal" // directory of this route

  const journalPrompt = data.journalPrompt;
  const userTasks = data.userTasks;
</script>


{#if user}
  <div class="pop-up-shape">
    <img class="blue-background" src="/images/journal-page.svg" alt="pop-up-shape" />
    <div class="pop-up-text">
      <h1>Your Daily Journal Entry</h1>
      {#if form?.message}
        <p class="message">{form.message}</p>
      {/if}

      {#if !userTasks.journal}
      <form action="{path}/?/update" method="post">
        <input type="hidden" name="id" value={userTasks.id} />
        <div class="enterTask">
          <textarea name="journal" placeholder="{journalPrompt.title}&#10;{journalPrompt.prompt}" />
        </div>
        <div class="submit">
          <input type="submit" value="Submit" />
        </div>
      </form>
      {:else}
        <div class="enterTask">
          <textarea name="journal" placeholder="{userTasks.journal}" disabled/>
        </div>
      {/if}
    </div>
    <a href="/dashboard"><img class="home-button" src="/images/home-button.svg" alt="home button"></a>
    <a class="back-button" href="/day"><img src="/images/back-button.svg" alt="back button" /></a>
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

  .enterTask textarea {
    padding: 20px;
    margin: 20px 0 20px 0;
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

  textarea::placeholder {
    color: #D5D5D5; /* Change this to the color you prefer */
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px; /* Change this to the size you prefer */
    /* Add other styles as needed */
  }

  .enterTask textarea:focus{
    border: 1px solid #5DB3E5;
  }

  .enterTask textarea:focus::placeholder {
    color: transparent;
  }

  .enterTask textarea:disabled {
    background-color: #ededed; /* Change this to the color you prefer */
  }
  .enterTask textarea:disabled::placeholder {
    color: #888888; /* Change this to the color you prefer */
  }

  .submit {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
  }
  .submit input {
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid #029CF6;
    width: 101px;
    height: 39px;
    background: #FFF;
  }

  .submit input:hover{
    opacity: 0.7;
  }

  .message {
    color: white;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-weight: 300;
    width: 70%;
    margin: 20px 0 20px 0;
  }

</style>
