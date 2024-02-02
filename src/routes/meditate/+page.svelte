<script>
  import AudioPlayer from '../../components/AudioPlayer.svelte';
  import { authStore } from "$lib/utils/helperFunctions";

  export let data; // data returned by the load function
  const user = data.user[0];
</script>

{#if user}
  <div class="pop-up-shape">
    <img class="blue-background" src="/images/meditation-page.svg" alt="pop-up-shape" />
    <div class="pop-up-text">
      <AudioPlayer />
      <h1>Click to Begin Meditation</h1>
      <div class="timer-content">
        <div class="restart-button">
          <p class="restart">Restart</p>
        </div>
        <div class="timer-text">
          <span class="white-text">10:26</span><span class="restart">/12:00</span>
        </div>
      </div>
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
  .timer-content {
    display: flex;
    width: 400px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
  }
  .restart-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: 1px solid #FFF;
    padding: 5px 20px 5px 20px;
    background-color: transparent;
    cursor: pointer;
  }
  .restart {
    color: #000;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .white-text {
    color: white;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
