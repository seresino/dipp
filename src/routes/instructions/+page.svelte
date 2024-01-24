<script>
  import { page } from '$app/stores';
	let selectedButton = $page.url.searchParams.get('initial') || 'instructions';
</script>

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
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    {:else if selectedButton === 'tasks'}
      <div>
        <h3>Task 1</h3>
        <h3>Task 2</h3>
        <h3>Task 3</h3>
        <h3>Task 4</h3>
        <h3>Task 5</h3>
      </div>
    {/if}
  </div>
</div>


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
