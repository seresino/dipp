<script>
  import AudioPlayer from '../../components/AudioPlayer.svelte';
  // need set up dynamic imports to avoid hard coding these. will use URLs once files received so leaving for now
  import moduleOneAudio from '../../assets/meditationone.mp3'
  import moduleTwoAudio from '../../assets/meditationtwo.mp3'
  import moduleThreeAudio from '../../assets/meditationthree.mp3'
  
  export let data;
  const user = data.user[0];

  let audioFile;
  const module = data.module;

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
</script>

{#if user}
  <div class="pop-up dark">

    <a class="circular-button back" href="/day"><img src="/images/return-circle-button.svg" alt="back button" /></a>
    <a class="circular-button home" href="/dashboard"><img src="/images/home-circle-button.svg" alt="home button" /></a>
    <div class="pop-up-content center">
      <AudioPlayer {audioFile}/>
    </div>
  </div>
{/if}
