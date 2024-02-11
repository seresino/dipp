<!-- Journal.svelte -->
<script lang="ts">
  export let form;
  export let data; // data returned by the load function
  const user = data.user[0];
  let path = "journal" // directory of this route

  const journalPrompt = data.journalPrompt;
  const userTasks = data.userTasks;
</script>


{#if user}
<div class="pop-up light">
  <a class="circular-button home" href="/dashboard"><img src="/images/home-circle-button.svg" alt="home button" /></a>
  <a class="circular-button back" href="/day"><img src="/images/return-circle-button.svg" alt="back button" /></a>
  <div class="pop-up-content center">
    <div class="container">
      <h1>Your Daily Journal Entry</h1>

      {#if form?.message}
        <p class="message">{form.message}</p>
      {/if}

      {#if !userTasks.journal}
      <form action="{path}/?/update" method="post">
        <input type="hidden" name="id" value={userTasks.id} />
        <textarea name="journal" placeholder="{journalPrompt.title}&#10;{journalPrompt.prompt}" />
        <div class="left">
          <input class="form-button" type="submit" value="Submit" />

        </div>
      </form>
      {:else}
        <div class="enterTask">
          <textarea name="journal" placeholder="{userTasks.journal}" disabled/>
        </div>
      {/if}
    </div>
  </div>

</div>
{/if}

<style>
  .container {
    flex-direction: column;
    align-items: left;
    width: 100%;
    gap: 20px;
  }
  .container h1 {
    color: #FFF;
    font-size: 32px;
    font-weight: 300;
    text-align: left;
  }
  form {
    gap: 20px;
  }
  textarea {
    padding: 20px;
    border-radius: 20px;
    border-style: solid;
    border-color: #D5D5D5;
    background: #FFF;
    width: 100%;
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
  textarea:focus{
    border-style: solid;
    border-color: #5DB3E5;
  }
  textarea:focus::placeholder {
    color: transparent;
  }
  textarea:disabled {
    background-color: #ededed; /* Change this to the color you prefer */
  }
  textarea:disabled::placeholder {
    color: #888888; /* Change this to the color you prefer */
  }
  .left {
    flex-direction: row;
    justify-content: right;
  }
  .message {
    color: white;
    font-size: 16px;
    font-weight: 300;
    width: 70%;
    margin: 20px 0 20px 0;
  }
</style>
