<script>
  import { page } from '$app/stores';

  export let data; // data returned by the load function
  let path = "day" // directory of this route

  let selectedButton = $page.url.searchParams.get('initial') || 'instructions';
  let selectedTask = null; // New variable to hold the selected task

  const module = data.module;
  const tasks = data.tasks;

  function selectTask(task) {
    selectedTask = task;
  }
</script>

<div class="pop-up">
  <a class="back-button" href="/day"><img src="/images/cross-circle.svg" alt="back button" /></a>
  <img src="/images/pop-up-shape.svg" alt="pop-up-shape" />
  <div class="pop-up-container">
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
    <div class="content">

      {#if selectedButton === 'instructions'}
        <h1>Module {module.id}: {module.name}</h1>
        <p>{module.instructions}</p>
      {:else if selectedButton === 'tasks'}
        {#if !selectedTask}
          {#each tasks as task, index}
            <div class="task-shape" on:click={() => selectTask(task)}>
                <div class="task-number-box">{index + 1}</div>
                <div class="task-shape-text">
                  <h2>{task.task}</h2>
                  <p class="goal">{task.goal.split('.')[0]}.</p>
                </div>
            </div>
          {/each}
        {:else}
          <div class="task-details">
            <h2>{selectedTask.task} ({selectedTask.time} minutes)</h2>
            <p class="task-info">Goal: {selectedTask.goal}</p>
            {#if selectedTask.background}<p class="task-info">Background: {selectedTask.background}</p>{/if}
            <p class="task-info">Materials Needed: {selectedTask.materials}</p>
            <p class="task-info">Instructions:</p>
            <ul>
              {#each Object.keys(selectedTask.instructions) as instructionKey}
               <li>{instructionKey}: {selectedTask.instructions[instructionKey]}</li>
              {/each}
            </ul>
            <label for="completed">Completed</label>
            <input type="checkbox" id="completed" name="completed">
            <button on:click={() => selectedTask = null}>Back</button>
        </div>
        {/if}
      {/if}
    </div>
  </div>
</div>


<style>
  .content {
     display: flex;
     flex-direction: column;
     justify-content: top;
     align-items: left;
     gap: 20px;
     padding: 10%;
     width: 100%;
     height: 100%;
     border: hotpink 1px solid;
  }
  .task-shape {
    border: 1px #D5D5D5 solid;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 120px;
    cursor: pointer;
  }
  h2 {
    font-size: 20px;
    font-weight: normal;
  }
  .task-number-box {
    background-color: #5DB3E5;
    min-width: 60px;
    height: 90%;
    border: 1px solid #168ACE;
    border-radius: 10px;
    box-shadow: 0px 4px 13.1px -4px rgba(0, 0, 0, 0.25) inset;
    font-size: 30px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
  .task-shape-text {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
    margin-right: 10px;
  }
  .goal {
    font-size: 16px;
    color: #D5D5D5;
    margin: 5px 0 5px 0;
  }
  .task-details {
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
    gap: 20px;
    height: 500px;
    border: hotpink 1px solid;
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
  .pop-up-container {
    display: flex;
    flex-direction: column;
    justify-content: top;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 100px 100px 50px 100px;
    border: hotpink 1px solid;
  }
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 20px;
    border: hotpink 1px solid;
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
