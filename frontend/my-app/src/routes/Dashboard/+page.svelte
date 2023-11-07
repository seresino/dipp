<script>

    import { authHandlers, authStore } from "../../store/store";

</script>

{#if !$authStore.loading}

<div class="mainContainer">
  <div class="headerContainer">
    <h1>DIPP</h1>
    <button on:click={authHandlers.logout}>Log Out</button>
  </div>
  <a href="../Day">Day</a>
</div>

{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
