<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { truncateWords } from '$lib/utils/helperFunctions.js';

  export let data; // data returned by the load function

  const module = data.module;
  const tasks = data.tasks;
  const weeklytasks = data.weeklyTasks;
  const path = "module" // directory of this route

  let view = $page.url.searchParams.get('view') || '';
  let selectedButton = view.includes('-') ? view.split('-')[0] : view;
  let parameterID = view.includes('-') ? view.split('-')[1] : null;
  let selectedTask = null;
  let completed = false;
  let updateForm;

  // checks whether there is a task in the weeklyTasks table that corresponds to this task and has been completed
  function isTaskComplete(task) {
    return weeklytasks.some(weeklytask => weeklytask.task_id == task.id && weeklytask.complete_timestamp);
  }

  // updates query parameters of current page when toggle buttons are clicked or tasks are expanded
  function updateQueryParameters(view, id = null) {
    const query = new URLSearchParams($page.url.searchParams.toString());
    query.set('view', id ? `${view}-${id}` : view);
    goto(`?${query.toString()}`);
  }

  // sends a request to the server to add new entry to the weeklyTasks table, where start_timestamp will be set
  async function addWeeklyTask(taskID) {
    const formData = new FormData();
    formData.append('taskID', taskID);

    const response = await fetch(`${path}/?/add`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        console.log('Task submitted successfully');
    }
  }

  // function that deals with task being selected from list
  function selectTask(task) {
    selectedTask = task     // assign task to selectedTask variable in order to render html for task info
    updateQueryParameters('tasks', task.id.toString());     // update query parameters
    addWeeklyTask(selectedTask.id);     // create new task entry in db
  }

  // function to handle checkbox change and send update request to server, where complete_timestamp will be set
  function handleCheckBox() {
    if (completed) {
        updateForm.submit();
    }
  }

  // listener which assigns selectedTask to whichever task matches the current query parameter ID
  // (ensures selectedTask is not null when expanded task info page is refreshed)
  $: selectedTask = tasks.find(task => task.id == parameterID);

  // function to redirect to task info page if user goes straight to URL of expanded task without row existing in table
  onMount(() => {
    if (parameterID !== null) {
        const weeklyTasks = weeklytasks.map(entry => entry.task_id);
        if (!weeklyTasks.includes(Number(parameterID))) {
          console.log("redirect incoming!");
          window.location.href = "/module?view=tasks";
        }
    }
  });
</script>

<div class="pop-up">
  <a class="back-button" href="/day"><img src="/images/cross-circle.svg" alt="back button" /></a>
  <img src="/images/pop-up-shape.svg" alt="pop-up-shape" />
  <div class="pop-up-container">

    <div class='button-container'>

      <button type="button" class:black={selectedButton === 'instructions'} class:grey={selectedButton !== 'instructions'} data-toggle="modal" on:click={() => selectedButton = 'instructions'} on:click={() => { selectedTask = null; updateQueryParameters('instructions'); }}>
        <img src="/images/meditation-grey-icon.svg" alt="meditation-grey-icon" />
        <p>Instructions</p>
      </button>
      <button type="button" class:black={selectedButton === 'tasks'} class:grey={selectedButton !== 'tasks'} data-toggle="modal" on:click={() => selectedButton = 'tasks'} on:click={() => updateQueryParameters('tasks')}>
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
          {#each tasks.slice().sort((a, b) => a.id - b.id) as task, index}
            <div class="task-shape {isTaskComplete(task) ? 'grey' : ''}" on:click={() => selectTask(task)}>
              <div class="task-number-box">{index + 1}</div>
              <div class="task-shape-text">
                <h2>{task.task}</h2>
                <p class="goal">{truncateWords(task.goal, 22)}...</p>
                </div>
            </div>
          {/each}

        {:else}
          <div class="task-details">
            <h2>{selectedTask.task} ({selectedTask.time} minutes)</h2>
            <p>Goal:</p>
            <p>{selectedTask.goal}</p>
            {#if selectedTask.background}
              <p>Background: </p>
              <p>{selectedTask.background}</p>
            {/if}
            <p>Materials Needed:</p>
            {#each Object.values(selectedTask.materials) as material}
              <li>{material}</li>
            {/each}
            <p>Instructions:</p>
            <ul>
              {#each Object.keys(selectedTask.instructions) as instructionKey}
               <li>{instructionKey}<br>{selectedTask.instructions[instructionKey]}</li>
               <br>
              {/each}
            </ul>
          </div>
          {#if isTaskComplete(selectedTask)}
            <p class="complete">Task completed</p>
          {:else}
            <form bind:this={updateForm} action="{path}/?/update" method="post">
                <label for="completed">Completed</label>
                <input type="checkbox" id="completed" name="completed" bind:checked={completed} on:change={handleCheckBox}>
                <input type="hidden" name="taskID" value={selectedTask.id}>
            </form>
          {/if}
          <button on:click={() => { selectedTask = null; updateQueryParameters('tasks'); }}>Back</button>
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
  }
  .task-shape {
    border: 2px #D5D5D5 solid;
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
    height: 80%;
    border: 2px solid #168ACE;
    border-radius: 20px;
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
    height: 400px;
  }
  .task-details li {
    font-size: 16px;
    margin: 0 20px 0 20px;
  }
  .task-details::-webkit-scrollbar {
    width: 10px;
  }
  .task-details::-webkit-scrollbar-thumb {
    background: #5DB3E5; /* Color of the scroll thumb */
    border-radius: 10px;
  }

  .task-details::-webkit-scrollbar-thumb:hover {
    background: #168ACE; /* Color of the scroll thumb when hovered */
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
    border: none;
    border-radius: 34px;
  }
  .black {
    color: white;
    background-color: black;
  }
  .grey {
    color: #888888;
    background-color: #F3F3F3;
  }
  .complete {
    color: green;
    font-style: italic;
  }
</style>
