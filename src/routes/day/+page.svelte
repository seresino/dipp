<!-- Day.svelte -->
<script>
  export let data; // data returned by the load function
  let path = "day" // directory of this route

  const user = data.user;
  const module = data.module;
  const userTasks = data.userTasks;
  const day = data.day;

  let taskCompletion;
  let tasks;
  let progressBar;
  let activityButtons;

  if (user.meditation) {
     taskCompletion = [!!userTasks.meditation, !!userTasks.mood_id, !!userTasks.journal];
     tasks = {meditate: 0, mood: 1, journal: 2}

     progressBar = {meditation: "activity-pill", mood_id: "activity-pill", journal: "activity-pill"}
     activityButtons = {meditate: "activity dark", mood: "activity medium", journal: "activity light"}

     Object.keys(progressBar ).forEach(key => {
         if(userTasks[key]){
             progressBar[key] = "activity-pill light";
         }
     });

     if (!userTasks.meditation){
         activityButtons.mood += " inactive"
         activityButtons.journal += " inactive"
     } else if (!userTasks.mood_id){
         activityButtons.journal += " inactive"
     } else if (!userTasks.journal){
         activityButtons.meditate += " complete"
         activityButtons.mood += " complete"
     } else {
         activityButtons.meditate += " complete"
         activityButtons.mood += " complete"
         activityButtons.journal += " complete"
     }
  } else {
     taskCompletion = [!!userTasks.mood_id, !!userTasks.journal];
     tasks = {mood: 0, journal: 1}

     progressBar = {mood_id: "activity-pill", journal: "activity-pill"}
     activityButtons = {mood: "activity medium", journal: "activity light"}

     Object.keys(progressBar ).forEach(key => {
         if(userTasks[key]){
             progressBar[key] = "activity-pill light";
         }
     });

     if (!userTasks.mood_id){
         activityButtons.journal += " inactive"
     } else if (!userTasks.journal){
         activityButtons.mood += " complete"
     } else {
         activityButtons.mood += " complete"
         activityButtons.journal += " complete"
     }
  }
</script>


<div class="dashboard-container module-colour">
  <img class="dashboard-image" src="/images/module-dashboard-shape.svg" alt="dashboard-shape">
  <div class="dashboard-contents">
    <div class="module-top-button">
      <div class="module-info-pill">
        <a class="module-info-button" href="/module?view=instructions">
          <img class="module-icon" src="/images/meditation-icon.svg" alt="meditation-icon">
          <p class="module-info-text">Instructions</p>
        </a>
        <a class="module-info-button" href="/module?view=tasks">
          <img class="module-icon" src="/images/tasks-icon.svg" alt="tasks-icon">
          <p class="module-info-text">Tasks</p>
        </a>
      </div>
    </div>
    <div class="bottom-text">Module {module.id} - {module.name}</div>
  </div>
</div>

<div class="progress-container">
  <div class="progress-section" style="width: 100%">
    <p class="progress-text">Day {day}</p>
    <div class="activity-bar">
      {#each Object.entries(progressBar) as [task, completion]}
        <div class={completion}></div>
      {/each}
    </div>
    <p class="progress-text">{taskCompletion.filter(value => value === true).length}/{taskCompletion.length}</p>
  </div>
</div>

{#if user.meditation}
 <div class="triplet-container padding">
    <div class={activityButtons.meditate}>
      <h1>Meditate</h1>
      <a href="/meditate">
        <div class="activity-contents">
          <img class="enter-button" src="/images/enter-button-1.svg" alt="enter-button">
        </div>
      </a>
    </div>
    <div class={activityButtons.mood}>
      <h1>Mood</h1>
      <a href="/mood">
        <div class="activity-contents">
          <img class="enter-button" src="/images/enter-button-2.svg" alt="enter-button">
        </div>
      </a>
    </div>
    <div class={activityButtons.journal}>
      <h1>Journal</h1>
      <a href="/journal">
        <div class="activity-contents">
          <img class="enter-button" src="/images/enter-button-3.svg" alt="enter-button">
        </div>
      </a>
    </div>
 </div>
{:else}
 <div class="activity-container">
    <div class={activityButtons.mood}>
      <h1>Mood</h1>
      <a href="/mood">
        <div class="activity-contents">
          <img class="enter-button" src="/images/enter-button-1.svg" alt="enter-button">
        </div>
      </a>
    </div>
    <div class={activityButtons.journal}>
      <h1>Journal</h1>
      <a href="/journal">
        <div class="activity-contents">
          <img class="enter-button" src="/images/enter-button-2.svg" alt="enter-button">
        </div>
      </a>
    </div>
 </div>
{/if}



<style>
  .activity {
    margin: 5%;
    position: relative;
    height: 394px;
    max-height: 100%;
    border: 1px #168ACE solid;
    border-radius: 20px;
    }
  .activity-contents {
    padding: 15px 20px 10px 20px;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    position:absolute;
    bottom:20px; left:0; right:0;
  }
  .activity-contents img {
    max-width: 100%;
    width: 240px;
  }
  @media (max-width: 768px) {
    .activity {
      margin: 4% 3%;
    }
  }

  .inactive {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .complete {
    background-color: #08d85e;
    opacity: 0.5;
  }
  h1 {
    font-size: 36px;
    font-weight: 400;
    line-height: normal;
    padding: 20px;
  }
  .module-icon {
    width: 20px;
  }
</style>
