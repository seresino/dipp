<script>
  import { page } from '$app/stores';
  import { authStore } from "$lib/utils/helperFunctions";

  export let data; // data returned by the load function
  const user = data.user;

  let selectedButton = $page.url.searchParams.get('initial') || 'instructions';

  const module = data.module;
</script>

{#if user}
  <div class="pop-up">
    <a class="back-button" href="/day"><img src="/images/cross-circle.svg" alt="back button" /></a>
    <img src="/images/pop-up-shape.svg" alt="pop-up-shape" />
    <div class="pop-up-content">
      <div class='button-container'>
        <button type="button" class:black={selectedButton === 'instructions'} class:grey={selectedButton !== 'instructions'} data-toggle="modal" on:click={() => selectedButton = 'instructions'}>
          <img src="/images/meditation-grey-icon.svg" alt="meditation-grey-icon" />
          <p>Instructions</p>
        </button>
        <button type="button" class:black={selectedButton === 'tasks'} class:grey={selectedButton !== 'tasks'} data-toggle="modal" on:click={() => selectedButton = 'tasks'}>
          <img src="/images/task-grey-icon.svg" alt="task-grey-icon" />
          <p>Tasks</p>
        </button>
      </div>
      {#if selectedButton === 'instructions'}
        <p>{module.instructions}</p>
      {:else if selectedButton === 'tasks'}
        <div>
          <p>{module.tasks}</p>
        </div>
      {/if}
    </div>
  </div>
{/if}

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
  }
  .pop-up-content {
    display: flex;
    flex-direction: column;
    justify-content: top;
    gap: 100px;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 100px 100px 50px 100px;
  }
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 20px;
  }
  button {
    width: 100px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
  }
  .black {
    color: white;
    background-color: black;
    border: 1px black solid;
    border-radius: 34px;
  }
  .grey {
    color: #888888;
    background-color: #F3F3F3;
    border: none;
    border-radius: 34px;
    }
</style>