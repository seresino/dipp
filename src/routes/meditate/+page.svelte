<script>
  import { onMount } from 'svelte';
  import AudioPlayer from '../../components/AudioPlayer.svelte';
  // need set up dynamic imports to avoid hard coding these. will use URLs once files received so leaving for now
  import moduleOneAudio from '../../assets/meditationone.mp3'
  import moduleTwoAudio from '../../assets/meditationtwo.mp3'
  import moduleThreeAudio from '../../assets/meditationthree.mp3'
  export let data;

  let audioFile;
  const module = data.module;
  const usertasks = data.userTasks;

  // sets audioFile based on current module
  switch(module.id) {
    case 1:
      audioFile = moduleOneAudio;
      break;
    case 2:
      audioFile = moduleTwoAudio;
      break;
    case 3:
      audioFile = moduleThreeAudio;
      break;
    default:
      console.error("Invalid module number");
 }

   onMount(() => {
    // redirects to day page if user goes straight to /mood without daily task entry in table
    if (usertasks.length === 0) {
      window.location.href = "/day";
    }
  });
</script>

<div class="pop-up-shape">
  <img class="blue-background" src="/images/meditation-page.svg" alt="pop-up-shape" />
  <div class="pop-up-text">
    <AudioPlayer {audioFile}/>
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
