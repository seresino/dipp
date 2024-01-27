<script>
  export let audioFile;

  let audioPlayer;
  let meditationForm;
  let path = "meditate";
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;

  function togglePlayback() {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    isPlaying = !isPlaying;
  }

  function restartTrack() {
    audioPlayer.pause();
    isPlaying = false;
    audioPlayer.currentTime = 0;
  }

  $: {
    updatePlaybackStatus();
  }

  function updatePlaybackStatus() {
    if (!audioPlayer) return; // Exit the function if audioPlayer is undefined
      isPlaying = !audioPlayer.paused;
      currentTime = audioPlayer.currentTime;
      duration = audioPlayer.duration;
  }

 function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
 }

 function handleEnded() {
    restartTrack();
    meditationForm.submit();
 }
</script>

<audio bind:this={audioPlayer} on:loadedmetadata={updatePlaybackStatus} on:timeupdate={updatePlaybackStatus} on:ended={handleEnded}>
  <source src={audioFile} type="audio/mp3">
  Your browser does not support the audio element.
</audio>
<form bind:this={meditationForm} action="{path}/?/update" method="post">
  <input type="hidden" name="meditated" value="true">
</form>

<h1>Click to Begin Meditation</h1>
<button class="play-button" on:click={togglePlayback}>
  <div class="circle">
    <h1>{isPlaying ? 'Pause' : 'Play'}</h1>
  </div>
</button>
<div class="timer-content">
  <button class="restart-button" on:click={restartTrack}><p class="restart">Restart</p></button>
  <div class="timer-text">
    <span class="white-text">{formatTime(currentTime)}</span><span class="restart">/{formatTime(duration)}</span>
  </div>
</div>


<style>
  h1 {
    color: black;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: normal;
    font-weight: 300;
    padding: 50px;
  }
  .play-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid #FFF;
    padding: 5px 20px 5px 20px;
    background-color: transparent;
    cursor: pointer;
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
