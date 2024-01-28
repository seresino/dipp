<script>
  import { page } from '$app/stores';

  export let data; // data returned by the load function
  let path = "day" // directory of this route

  let selectedButton = $page.url.searchParams.get('initial') || 'instructions';

  const module = data.module;
  const tasks = data.tasks;
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
      <h1>Module {module.id}: {module.name}</h1>
      <p>{module.instructions}</p>
    {:else if selectedButton === 'tasks'}

      {#each tasks as task, index}
        <div class="task-shape">
          <img src="/images/task-shape.svg" alt="task-shape" />
          <div class="task-shape-content">
            <div class="task-number-box">{index + 1}</div>
            <div class="task-shape-text">
              <h2>{task.task}</h2>
              <p>{task.goal}</p>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>


<style>
  .task-shape {
    position: relative;
  }
  .task-shape-content {
    display: flex;
    flex-direction: row;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 20px;
  }
  h2 {
    font-size: 20px;
    font-weight: normal;
  }
  .task-number-box {
    background-color: #5DB3E5;
    width: 50px;
    height: 100%;
    border: 1px solid #168ACE;
    border-radius: 10px;
    box-shadow: 0px 4px 13.1px -4px rgba(0, 0, 0, 0.25) inset;
    font-size: 30px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .task-shape-text {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
  }

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
