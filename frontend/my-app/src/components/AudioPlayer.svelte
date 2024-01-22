<script>
  let audioPlayer;
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;

  function togglePlayback() {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }

  function updatePlaybackStatus() {
    isPlaying = !audioPlayer.paused;
    currentTime = audioPlayer.currentTime;
    duration = audioPlayer.duration;
  }
</script>

<audio bind:this={audioPlayer} on:timeupdate={updatePlaybackStatus} controls>
  <source src="test-audio.m4a" type="audio/m4a">
  Your browser does not support the audio element.
</audio>

<div class="custom-audio-player">
  <button on:click={togglePlayback}>
    {#if isPlaying}
      Pause
    {:else}
      Play
    {/if}
  </button>
  <div class="playbar">
    <div class="playbar-progress" style="transform: rotate({(currentTime / duration) * 360}deg)"></div>
  </div>
</div>

<style>
  .custom-audio-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  button {
    background-color: #007bff; /* Button background color */
    color: white; /* Button text color */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #0056b3; /* Hover background color */
  }

  .playbar {
    margin-top: 20px;
    width: 120px; /* Adjust the size of the circular playbar */
    height: 120px; /* Adjust the size of the circular playbar */
    border-radius: 50%; /* Make it circular */
    background-color: #eee; /* Playbar background color */
    position: relative;
    transform: rotate(0deg);
  }

  .playbar-progress {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #007bff; /* Playbar progress color */
    position: absolute;
    clip-path: polygon(50% 50%, 100% 0, 100% 100%); /* Create a circular progress path */
    transform-origin: center center;
    transform: rotate(0deg);
    transition: transform 0.2s;
  }
</style>

