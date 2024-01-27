<script>
  import AudioPlayer from '../../components/AudioPlayer.svelte';
</script>

<div class="pop-up-shape">
  <img class="blue-background" src="/images/meditation-page.svg" alt="pop-up-shape" />
  <div class="pop-up-text">
    <AudioPlayer />
  </div>
  <a href="/dashboard"><img class="home-button" src="/images/home-button.svg" alt="home button"></a>
  <a class="back-button" href="/day"><img src="/images/back-button.svg" alt="back button" /></a>
</div>


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

</style>
