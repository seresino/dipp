<script>
	import AudioPlayer from "../../components/AudioPlayer.svelte";
	export let data;

	console.log("Data received:", data);

	const user = data.user[0];
	const file = data.file;
	const meditated = data.meditated;
	const medGroup = user.meditation;

	console.log("User data:", user);
	console.log("File data:", file);

	// dynamically import the audio file based on day
	const audioPath =
		"https://gidvzbginnkwrxhc.public.blob.vercel-storage.com/" + file;

	console.log("Audio path:", audioPath);

	const audioFile = audioPath;

	console.log("Final audio file path:", audioFile);
</script>

{#if user}
	<div class="pop-up dark">
		<a class="circular-button back" href="/day">
			<img src="/images/return-circle-button.svg" alt="back button" />
		</a>
		<a class="circular-button home" href="/dashboard">
			<img src="/images/home-circle-button.svg" alt="home button" />
		</a>
		<div class="pop-up-content center">
			<AudioPlayer {audioFile} {meditated} {medGroup}/>
		</div>
	</div>
{/if}
