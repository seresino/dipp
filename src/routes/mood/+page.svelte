<script>
  import { authStore } from "$lib/utils/helperFunctions";

  export let data;
  const user = data.user[0];
</script>

{#if user}
  <div class="pop-up-shape">
    <img class="blue-background" src="/images/mood-page.svg" alt="pop-up-shape" />
    <div class="pop-up-text">
      <h1>Rate your mood from 1 to 10</h1>
    </div>
    <a href="/dashboard"><img class="home-button" src="/images/home-button.svg" alt="home button"></a>
    <a class="back-button" href="/day"><img src="/images/back-button.svg" alt="back button" /></a>
  </div>
{/if}

<style>
  .pop-up-shape {
    position: relative;
  }
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .blue-background {

  }
  .home-button {
    position: absolute;
    top: 40px;
    right: 50px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .pop-up-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  h1 {
    color: #FFF;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: normal;
    font-weight: 300;
  }
</style>