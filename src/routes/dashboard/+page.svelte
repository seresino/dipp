<script>
  import { authStore } from "../../store/store";
  import DateTime from "../../components/DateTime.svelte";
  import {onMount} from "svelte";
  import { auth } from "../../lib/firebase/firebase";

  export let data; // data returned by the load function
  let path = "dashboard" // directory of this route

  const module = data.module;
  const userTasks = data.userTasks;
  const day = data.day;

  const nonAuthRoutes = ["/", "/login", "/about"];

  onMount (() => {
    console.log("Mounting");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = "/login";
        return;
      }

      if (user && currentPath == "/login") {
        window.location.href = "/dashboard";
        return;
      }
    });
  });
</script>

{#if !$authStore.loading}

<div class="dashboard">
  <img class="dashboard-image" src="/images/dashboard-box-shape.svg" alt="dashboard-shape">
  <div class="dashboard-text">
    <div class="top-text">
      <div class="day">Day {day}</div>
      <div class="date">
        <DateTime />
      </div>
    </div>
    <div class="bottom-text">Dashboard</div>
  </div>
</div>
<div class="progress-container">
  <img class="progress-shape" src="/images/progress-box-shape.svg" alt="module-shape">
  <div class="progress-absolute">
    <div class="progress-section">
      <p class="progress-text">Progress:</p>
      <div class="progress-bar">
        {#each Array(day) as _, i}
          <div class="progress-pill-completed"></div>
        {/each}
        {#each Array(21-day) as _, i}
          <div class="progress-pill"></div>
        {/each}
      </div>
      <p class="progress-text">{day}/21 Days</p>
    </div>
    <div class="progress-section">
      <p class="progress-text">Modules:</p>
      <div class="modules-bar">
        {#each Array(module.id) as _, i}
          <div class="modules-pill-completed"></div>
        {/each}
        {#each Array(3-module.id) as _, i}
          <div class="modules-pill"></div>
        {/each}
      </div>
      <p class="progress-text">{module.id}/3</p>
    </div>
  </div>
</div>
<div class="modules-container">
  <div class="module-container">
    <div class="module">
      <div class="module-pill one">
        <p class="module-pill-text">Module 1</p>
      </div>
        {#each Array(7) as _, i}
          <div class={i+1 === day ? 'day-pill completed' : i+1 < day ? 'day-pill inactive' : 'day-pill'}>
            <a href="/day">
              <p class="day-pill-text">Day {i+1}</p>
            </a>
          </div>
        {/each}
    </div>
    <img class="module-shape" src="/images/module-container-shape.svg" alt="module-shape">
  </div>
  <div class="module-container">
    <div class="module">
      <div class="module-pill two">
        <p class="module-pill-text">Module 2</p>
      </div>
      {#each Array(7) as _, i}
          <div class={i+8 === day ? 'day-pill completed' : i+8 < day ? 'day-pill inactive' : 'day-pill'}>
            <a href="/day">
              <p class="day-pill-text">Day {i+8}</p>
            </a>
          </div>
        {/each}
    </div>
    <img class="module-shape" src="/images/module-container-shape.svg" alt="module-shape">
  </div>
  <div class="module-container">
    <div class="module">
      <div class="module-pill three">
        <p class="module-pill-text">Module 3</p>
      </div>
      {#each Array(7) as _, i}
          <div class={i+15 === day ? 'day-pill completed' : i+15 < day ? 'day-pill inactive' : 'day-pill'}>
            <a href="/day">
              <p class="day-pill-text">Day {i+15}</p>
            </a>
          </div>
        {/each}
    </div>
    <img class="module-shape" src="/images/module-container-shape.svg" alt="module-shape">
  </div>
</div>


{/if}

<style>
  .dashboard {
    position: relative;
    /* border: 5px greenyellow solid; */
  }
  .dashboard-image {
  }
  .dashboard-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 20px 30px 40px 30px;
  }
  .top-text {
    display: flex;
    flex-direction: row;
    margin-bottom: auto;
    justify-content: space-between;
    /* border: 5px orangered dashed; */
  }
  .date {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 0 20px 0 0;
    /* border: 5px yellow dashed; */
  }
  .day {
    padding: 10px;
    font-size: 48px;
    color: white;
    font-family: Helvetica Neue;
    font-weight: 400;
    /* border: 5px yellow dashed; */
  }
  .bottom-text {
    margin-top: auto;
    padding: 10px;
    color: white;
    font-size: 36px;
    font-family: Helvetica Neue;
    font-weight: 500;
    /* border: 5px hotpink solid; */
  }


  .progress-container {
    position: relative;
  }
  .progress-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 20px 0px 20px;
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
  .progress-text {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 22px;
    font-style: normal;
    font-weight: 300;
    padding: 0 10px 0 10px;
  }
  .progress-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 278px;
    height: 23px;
    background: black;
    border-radius: 38px;
    padding: 0 10px 0 10px;
  }
  .progress-pill {
    width: 4.44px; height: 9.05px; background: #B5B5B5; border-radius: 38px;
  }
  .progress-pill-completed {
    width: 4.44px; height: 9.05px; background: #5DB3E5; border-radius: 38px;
  }
  .modules-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 248px;
    height: 23px;
    background: black;
    border-radius: 38px;
    padding: 0 10px 0 10px;
  }
  .modules-pill {
    width: 61px; height: 4px; background: #B5B5B5; border-radius: 10px;
  }
  .modules-pill-completed {
    width: 61px; height: 4px; background: #5DB3E5; border-radius: 10px;
  }


  .modules-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .module-container {
    position: relative;
  }
  .module-shape {
  }
  .module {
    padding: 15px 20px 10px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: top;
    justify-items: left;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
  }
  .module-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 102px;
    height: 46px;
    flex-shrink: 0;
    border-radius: 38px;
    border: 1px solid var(--Dark-Accent, #168ACE);
  }
  .one {
    background: var(--1, #5DB3E5);
  }
  .two {
    background: var(--1, #639FC9);
  }
  .three {
    background: var(--1, #168ACE);
  }
  .module-pill-text {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .day-pill {
    width: 120px;
    height: 46px;
    margin: 20px 20px 0 20px;
    flex-shrink: 0;
    border-radius: 38px;
    border: 1px solid var(--1, #5DB3E5);
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .completed {
    background: #5DB3E5;
  }
  .inactive {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .day-pill-text {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
  }
  a {
    text-decoration: none;
  }
</style>


