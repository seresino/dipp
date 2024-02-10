<script>
	import DateTime from "../../components/DateTime.svelte";

	export let data; // data returned by the load function
	const user = data.user[0];
	const module = data.module;
	const day = data.day;
	const daysCompleted = data.daysCompleted;
</script>

{#if user}
	<div class="dashboard-container dashboard-colour">
		<img
			class="dashboard-image"
			src="/images/dashboard-box-shape.svg"
			alt="dashboard-shape"
		/>
		<div class="dashboard-contents white-text">
			<div class="top-text">
				<div class="day">Day {day}</div>
				<DateTime />
			</div>
			<div class="bottom-text">Dashboard</div>
		</div>
	</div>

	<div class="progress-container">
		<div class="progress-section">
			<p class="progress-text">Days:</p>
			<div class="progress-bar">
				{#each Array(day) as _, i}
					<div class="progress-pill light"></div>
				{/each}
				{#each Array(21 - day) as _, i}
					<div class="progress-pill"></div>
				{/each}
			</div>
			<p class="progress-text">{day}/21</p>
		</div>
		<div class="progress-section">
			<p class="progress-text">Modules:</p>
			<div class="modules-bar">
				{#each Array(module.id) as _, i}
					<div class="modules-pill light"></div>
				{/each}
				{#each Array(3 - module.id) as _, i}
					<div class="modules-pill"></div>
				{/each}
			</div>
			<p class="progress-text">{module.id}/3</p>
		</div>
	</div>

	<div class="triplet-container">
		{#each Array(3) as _, module}
			<div class="module-container">
				<img
					class="module-shape"
					src="/images/module-container-shape.svg"
					alt="module-shape"
				/>
				<div class="module">
					<div
						class="module-pill {module === 0
							? 'light'
							: module === 1
								? 'medium'
								: 'dark'}"
					>
						<p class="module-pill-text">Module {module + 1}</p>
					</div>
					{#each Array(7) as _, i}
						<div class="grid-item">
							{#if module * 7 + i + 1 === day}
								<a class="day-pill light" href="/day">
									<p class="day-pill-text">
										Day {module * 7 + i + 1}
									</p>
								</a>
							{:else}
								<div
									class="day-pill {module * 7 + i + 1 < day &&
									daysCompleted.includes(module * 7 + i + 1)
										? 'light inactive'
										: module * 7 + i + 1 < day
											? 'inactive'
											: 'white'}"
								>
									<p class="day-pill-text">
										Day {module * 7 + i + 1}
									</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.module-container {
		position: relative;
	}
	.module-container img {
		width: 100%;
		padding: 3%;
	}
	.module {
		padding: 6%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: top;
		justify-items: stretch;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		grid-gap: 0px;
	}
	.module-pill {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
		width: 70%;
		max-width: 150px;
		height: 50%;
		max-height: 60px;
		flex-shrink: 0;
		border-radius: 38px;
		border: solid #168ace;
	}
	.module-pill-text {
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.grid-item {
		position: relative;
		padding: 10%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.day-pill {
		width: 100%;
		max-width: 190px;
		height: 80%;
		max-height: 80px;
		border-radius: 38px;
		border: solid #5db3e5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.inactive {
		cursor: not-allowed;
		/* background-color: white; */
		opacity: 0.5;
	}
	.day-pill-text {
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
	}
</style>
