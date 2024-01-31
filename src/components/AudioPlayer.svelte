<script>
  export let audioFile;

  let audioPlayer;
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

  // since no input tag needs to be rendered on page, using js to submit form
  async function submitForm() {
    const formData = new FormData();
    formData.append('meditated', 'true');

    const response = await fetch(`${path}/?/update`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        console.log('Task submitted successfully');
    }
  }

 // function to submit the form data to the server once track has ended
 function handleEnded() {
    restartTrack();
    submitForm();
 }

 // reactive statement that will run whenever any variables / values that function depends on change
 $: {
    updatePlaybackStatus();
  }
</script>

<audio bind:this={audioPlayer} on:loadedmetadata={updatePlaybackStatus} on:timeupdate={updatePlaybackStatus} on:ended={handleEnded}>
  <source src={audioFile} type="audio/mp3">
  Your browser does not support the audio element.
</audio>

<h1 class="title">Click Play to Begin Meditation</h1>
<button class="play-button" on:click={togglePlayback}>
  <h1>{isPlaying ? 'Pause' : 'Play'}</h1>
</button>
<div class="timer-content">
  <button class="restart-button" on:click={restartTrack}><p class="restart">Restart</p></button>
  <div class="timer-text">
    <span class="white-text">{formatTime(currentTime)}</span><span class="restart">/{formatTime(duration)}</span>
  </div>
</div>


<style>
  .title {
    padding: 0 0 50px 0;
  }
  h1 {
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 32px;
    font-style: normal;
    font-weight: 300;
  }
  .play-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid #FFF;
    padding: 50px 0 50px 0;
  }
  .timer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 50px 0 50px 0;
  }
  .restart-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: 1px solid #FFF;
    padding: 5px 20px 5px 20px;
    background-color: transparent;
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
