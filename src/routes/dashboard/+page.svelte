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

<div class="dashboard-container">
  <img class="dashboard-image" src="/images/dashboard-box-shape.svg" alt="dashboard-shape">
  <div class="dashboard-contents white-text">
    <div class="top-text">
      <div class="day">Day {day}</div>
      <DateTime />
    </div>
    <div class="bottom-text">Dashboard</div>
  </div>
</div>
<div class="progress-container">
  <div class="progress-section">
    <p class="progress-text">Days:</p>
    <div class="progress-bar">
      {#each Array(day) as _, i}
        <div class="progress-pill light"></div>
      {/each}
      {#each Array(21-day) as _, i}
        <div class="progress-pill"></div>
      {/each}
    </div>
    <p class="progress-text">{day}/21</p>
  </div>
  <div class="progress-section">
    <p class="progress-text">Modules:</p>
    <div class="modules-bar">
      {#each Array(module.id) as _, i}
        <div class="modules-pill light"></div>
      {/each}
      {#each Array(3-module.id) as _, i}
        <div class="modules-pill"></div>
      {/each}
    </div>
    <p class="progress-text">{module.id}/3</p>
  </div>
</div>
<div class="triplet-container">
  <div class="module-container">
    <img class="module-shape" src="/images/module-container-shape.svg" alt="module-shape">
    <div class="module">
      <div class="module-pill light">
        <p class="module-pill-text">Module 1</p>
      </div>
      {#each Array(7) as _, i}
        <div class="grid-item">
          <a class={i+1 === day ? 'day-pill light' : i+1 < day ? 'day-pill inactive' : 'day-pill white'} href="/day">
            <p class="day-pill-text">Day {i+1}</p>
          </a>
        </div>
      {/each}
    </div>
  </div>
  <div class="module-container">
    <div class="module">
      <div class="module-pill medium">
        <p class="module-pill-text">Module 2</p>
      </div>
      {#each Array(7) as _, i}
        <div class="grid-item">
          <a class={i+8 === day ? 'day-pill light' : i+8 < day ? 'day-pill inactive' : 'day-pill white'} href="/day">
            <p class="day-pill-text">Day {i+8}</p>
          </a>
        </div>
      {/each}
    </div>
    <img class="module-shape" src="/images/module-container-shape.svg" alt="module-shape">
  </div>
  <div class="module-container">
    <div class="module">
      <div class="module-pill dark">
        <p class="module-pill-text">Module 3</p>
      </div>
      {#each Array(7) as _, i}
          <div class="grid-item">
            <a class={i+15 === day ? 'day-pill light' : i+15 < day ? 'day-pill inactive' : 'day-pill white'} href="/day">
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
  .module-container {
    position: relative;
  }
  .module-container img {
    width: 100%;
    padding: 3%;
  }
  .module {
    padding: 6%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: top;
    justify-items: stretch;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    grid-gap: 0px;
  }
  .module-pill {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 70%;
    max-width: 150px;
    height: 50%;
    max-height: 60px;
    flex-shrink: 0;
    border-radius: 38px;
    border: 1px solid #168ACE;
  }
  .module-pill-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .grid-item {
    position: relative;
    padding: 10%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .day-pill {
    width: 100%;
    max-width: 190px;
    height: 80%;
    max-height: 80px;
    border-radius: 38px;
    border: 1px solid var(--1, #5DB3E5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .inactive {
    cursor: not-allowed;
    /* background-color: white; */
    opacity: 0.5;
  }
  .day-pill-text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
  }


  .dashboard-container {
    position: relative;
    font-weight: 400;
  }
  .dashboard-container img {
    width: 1020px;
    max-width: 100%;
  }
  .dashboard-contents {
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    position:absolute;
    top:0; bottom:0; left:0; right:0;
    padding: 20px 30px 40px 30px;
  }
  .top-text {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: auto;
    font-size: 48px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    .day {
      font-size: 24px;
    }
    .dashboard-container img {
      display: none;
    }
    .dashboard-container {
      background-color:#5DB3E5;
      width: 1056px;
      max-width: 90%;
      border-radius: 20px;
      border: 2px solid #168ACE;
      padding: 10px;
      margin-bottom: 20px;
    }
    .dashboard-contents {
      position: static;
      padding: 0;
    }
    .day-pill {
      width: 100%;
      max-width: 220px;
      height: 80%;
      max-height: 80px;
    }
    .module-pill {

      margin-left: 10%;
      width: 70%;
      max-width: 200px;
      height: 50%;
      max-height: 80px;
    }
  }
  .bottom-text {
    margin-top: auto;
    padding: 10px;
    font-size: 36px;
  }
</style>


