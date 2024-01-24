<!-- Day.svelte -->
<script>
  export let data; // data returned by the load function
  let path = "day" // directory of this route

  const user = data.user;
  const module = data.module;
  const userTasks = data.userTasks;
  const day = data.day;


//   // if meditate is null/falsy, only meditate is clickable
//   // if meditate is not null/falsy aka. completed, mood unlocked
//   // if mood is not null/falsy, aka. mood questionaire completed, journal unlocked
//   // fill in progress bar based on whether all these are complete too
  const taskCompletion = [!!userTasks.meditation, !!userTasks.mood_id, !!userTasks.journal];
  const tasks = {meditate: 0, mood: 1, journal: 2}

  let progressBar = {meditation: "activity-pill", mood_id: "activity-pill", journal: "activity-pill"}
  let activityButtons = {meditate: "activity meditate", mood: "activity mood", journal: "activity journal"}

  // Using forEach to iterate over object properties to update class of pill depending on completion status
  Object.keys(progressBar ).forEach(key => {
      if(userTasks[key]){
          progressBar[key] = "activity-pill-completed";
      }
  });

  // checks completion status of each task, so that you can only access buttons in sequence and styles completed ones - string appends to class name
  if (!userTasks.meditation){
    activityButtons.mood += " inactive"
    activityButtons.journal += " inactive"
  } else if (!userTasks.mood_id){
    // activityButtons.meditate += " complete"
    activityButtons.journal += " inactive"
  } else if (!userTasks.journal){
    activityButtons.meditate += " complete"
    activityButtons.mood += " complete"
  } else {
    activityButtons.meditate += " complete"
    activityButtons.mood += " complete"
    activityButtons.journal += " complete"
  }




</script>

<div class="module-container">
  <img class="module-image" src="/images/module-dashboard-shape.svg" alt="dashboard-shape">
  <div class="module-text">
    <div class="top-text">
      <div class="module-info-pill">
        <a class="info-button" href="/instructions?initial=instructions">
          <img class="meditation-icon" src="/images/meditation-icon.svg" alt="meditation-icon">
          <p class="info-text">Instructions</p>
        </a>
        <a class="info-button" href="/instructions?initial=tasks">
          <img class="tasks-icon" src="/images/tasks-icon.svg" alt="tasks-icon">
          <p class="info-text">Tasks</p>
        </a>
      </div>
      <a class="home-button" href="/dashboard">
        <img src="/images/home-button.svg" alt="home-button">
      </a>
    </div>
    <div class="bottom-text">Module {module.id} - {module.name}</div>
  </div>
</div>

<div class="progress-container">
  <img class="progress-shape" src="/images/progress-box-shape.svg" alt="module-shape">
  <div class="progress-absolute">
    <div class="progress-section">
      <p class="progress-text">Day {day}</p>
      <div class="activity-bar">
        {#each Object.entries(progressBar) as [task, completion]}
          <div class={completion}></div>
        {/each}
        <!-- <div class="activity-pill-completed"></div>
        <div class="activity-pill"></div>
        <div class="activity-pill"></div> -->
      </div>
      <p class="progress-text">{taskCompletion.filter(value => value === true).length}/3</p>
    </div>
  </div>
</div>

{#if user.meditation}
 <div class="activity-container">
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
  .activity-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(32%, 1fr));
      width: 1100px;
      padding: 20px;
      gap: 20px;
  }
  @media screen and (max-width: 600px) {
    .activity-container {
        grid-template-columns: 1fr;
    }
}
  .activity {
    position: relative;
    width: 100%;
    height: 394px;
    border: 1px #168ACE solid;
    border-radius: 20px;
  }
  .meditate {
    background-color: #5DB3E5;
  }
  .mood {
    background-color: #639FC9;
  }
  .journal {
    background-color: #168ACE;
  }
  .inactive {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .complete {
    background-color: #08d85e;
    opacity: 0.5;
  }

  .activity-contents {
    padding: 15px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    position:absolute;
    bottom:20px; left:0; right:0;
  }
  h1 {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 20px;
  }


  .module-container {
    position: relative;
  }
  .module-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 20px 30px 40px 30px;
  }
  .top-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: auto;
    padding: 10px;
    /* border: 5px orangered dashed; */
  }
  .module-info-pill {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px black solid;
    border-radius: 50px;
    padding: 20px 20px 20px 40px;
  }
  .home-button {
    position: absolute;
    top: 20px; right:20px;
  }
  .info-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
  }
  .info-text {
    padding: 0 20px 0 10px;
  }
  .bottom-text {
    margin-top: auto;
    padding: 10px;
    color: black;
    font-size: 36px;
    font-family: Helvetica Neue;
    font-weight: 500;
    /* border: 5px hotpink solid; */
  }



  .progress-container {
    position: relative;
  }
  .progress-absolute {
    position: absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 30px 30px 40px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .progress-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px 0px 20px;
  }
  .progress-text {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 22px;
    font-style: normal;
    font-weight: 300;
    padding: 0 10px 0 10px;
  }
  .activity-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 598px;
    height: 39px;
    background: black;
    border-radius: 38px;
    padding: 0 10px 0 10px;
  }
  .activity-pill {
    width: 159px;
    height: 7px;
    background: #B5B5B5;
    border-radius: 10px;
  }
  .activity-pill-completed {
    width: 159px;
    height: 7px;
    background: #5DB3E5;
    border-radius: 10px;
  }

</style>
