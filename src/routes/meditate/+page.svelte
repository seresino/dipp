<script>
	import AudioPlayer from "../../components/AudioPlayer.svelte";
	export let data;
	const user = data.user[0];
	const file = data.file;

	// dynamically import the audio file based on day

	// This path only works for imports
	// const audioPath = "../../assets/" + file;

	const audioPath = "src/assets/" + file;
	const audioFile = audioPath;
</script>

{#if user}
	<div class="pop-up dark">
		<a class="circular-button back" href="/day"
			><img src="/images/return-circle-button.svg" alt="back button" /></a
		>
		<a class="circular-button home" href="/dashboard"
			><img src="/images/home-circle-button.svg" alt="home button" /></a
		>
		<div class="pop-up-content center">
			<AudioPlayer {audioFile} />
		</div>
	</div>
{/if}
