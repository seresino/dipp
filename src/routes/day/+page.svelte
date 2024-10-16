<!-- Day.svelte -->
<script>
	export let data; // data returned by the load function
	const user = data.user[0];
	const module = data.module;
	const userTasks = data.userTasks;
	const day = data.day;

	let taskCompletion;
	let tasks;
	let progressBar;
	let activityButtons;

	if (user.meditation) {
		taskCompletion = [
			!!userTasks.meditation,
			!!userTasks.mood_id,
			!!userTasks.journal,
		];
		tasks = { meditate: 0, mood: 1, journal: 2 };

		progressBar = {
			meditation: "activity-pill",
			mood_id: "activity-pill",
			journal: "activity-pill",
		};
		activityButtons = {
			meditate: "activity dark",
			mood: "activity medium",
			journal: "activity light",
		};

		Object.keys(progressBar).forEach((key) => {
			if (userTasks[key]) {
				progressBar[key] = "activity-pill light";
			}
		});

		if (!userTasks.meditation) {
			activityButtons.mood += " inactive";
			activityButtons.journal += " inactive";
		} else if (!userTasks.mood_id) {
			activityButtons.journal += " inactive";
			activityButtons.meditate += " complete";
		} else if (!userTasks.journal) {
			activityButtons.meditate += " complete";
			activityButtons.mood += " complete";
		} else {
			activityButtons.meditate += " complete";
			activityButtons.mood += " complete";
			activityButtons.journal += " complete";
		}
	} else {
		taskCompletion = [!!userTasks.mood_id];
		tasks = { mood: 0 };

		progressBar = { mood_id: "activity-pill" };
		activityButtons = {
			mood: "activity medium",
		};

		Object.keys(progressBar).forEach((key) => {
			if (userTasks[key]) {
				progressBar[key] = "activity-pill light";
			}
		});

		if (userTasks.mood_id) {
			activityButtons.mood += " complete";
		}
	}
</script>

{#if user}
	<div class="dashboard-container module-colour">
		<img
			class="dashboard-image"
			src="/images/module-dashboard-shape.svg"
			alt="dashboard-shape"
		/>
		<div class="dashboard-contents">
			<a class="home-button" href="/dashboard"
				><img
					src="/images/home-circle-button.svg"
					alt="home button"
				/></a
			>
			<div class="module-top-button">
				<div class="module-info-pill">
					<a
						class="module-info-button"
						href="/module?view=instructions"
					>
						<img
							class="module-icon"
							src="/images/meditation-icon.svg"
							alt="meditation-icon"
						/>
						<p class="module-info-text">Instructions</p>
					</a>
					<a class="module-info-button" href="/module?view=tasks">
						<img
							class="module-icon"
							src="/images/tasks-icon.svg"
							alt="tasks-icon"
						/>
						<p class="module-info-text">Tasks</p>
					</a>
				</div>
			</div>
			<div class="bottom-text">Module {module.id} - {module.name}</div>
		</div>
	</div>

	<div class="progress-container">
		<div class="progress-section" style="width: 100%">
			<p class="progress-text">Day {day}</p>
			<div class="activity-bar">
				{#each Object.entries(progressBar) as [task, completion]}
					<div class={completion}></div>
				{/each}
			</div>
			<p class="progress-text">
				{taskCompletion.filter((value) => value === true)
					.length}/{taskCompletion.length}
			</p>
		</div>
	</div>

	{#if user.meditation}
		<div class="triplet-container padding">
			<div class={activityButtons.meditate}>
				<h1>Meditate</h1>
				<a href="/meditate">
					<div class="activity-contents">
						<img
							class="enter-button"
							src="/images/enter-button-1.svg"
							alt="enter-button"
						/>
					</div>
				</a>
			</div>
			<div class={activityButtons.mood}>
				<h1>Mood</h1>
				{#if userTasks.meditation}
					<a href="/mood">
						<div class="activity-contents">
							<img
								class="enter-button"
								src="/images/enter-button-2.svg"
								alt="enter-button"
							/>
						</div>
					</a>
				{:else}
					<div class="activity-contents">
						<img
							class="enter-button"
							src="/images/enter-button-2.svg"
							alt="enter-button"
						/>
					</div>
				{/if}
			</div>
			<div class={activityButtons.journal}>
				<h1>Journal</h1>
				{#if userTasks.mood_id}
					<a href="/journal">
						<div class="activity-contents">
							<img
								class="enter-button"
								src="/images/enter-button-3.svg"
								alt="enter-button"
							/>
						</div>
					</a>
				{:else}
					<div class="activity-contents">
						<img
							class="enter-button"
							src="/images/enter-button-3.svg"
							alt="enter-button"
						/>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="triplet-container padding">
			<div class={activityButtons.mood}>
				<h1>Mood</h1>
				<a href="/mood">
					<div class="activity-contents">
						<img
							class="enter-button"
							src="/images/enter-button-1.svg"
							alt="enter-button"
						/>
					</div>
				</a>
			</div>
		</div>
	{/if}
{/if}

<style>
	.activity {
		margin: 5%;
		position: relative;
		height: 394px;
		max-height: 100%;
		border-style: solid;
		border-color: #168ace;
		border-radius: 20px;
	}
	.activity-contents {
		padding: 15px 20px 10px 20px;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		position: absolute;
		bottom: 20px;
		left: 0;
		right: 0;
	}
	.activity-contents img {
		max-width: 100%;
		width: 240px;
	}
	@media (max-width: 768px) {
		.activity {
			margin: 4% 3%;
		}
	}

	.inactive {
		cursor: not-allowed;
		opacity: 0.5;
	}
	.complete {
		background-color: #08d85e;
		opacity: 0.5;
	}
	h1 {
		font-size: 36px;
		font-weight: 400;
		line-height: normal;
		padding: 20px;
	}
	.module-top-button {
		flex-direction: column;
		align-items: center;
		margin-bottom: auto;
		padding: 10px;
	}
	.module-info-pill {
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: solid black;
		border-radius: 50px;
		padding: 20px 20px 20px 40px;
		font-size: 14px;
	}
	.module-info-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}
	.module-info-text {
		padding: 0 20px 0 10px;
	}
	.module-icon {
		width: 20px;
	}
	.home-button {
		position: absolute;
		top: 16px;
		right: 20px;
		z-index: 1000;
	}
	.home-button img {
		object-fit: cover;
		width: 80px;
	}
</style>
