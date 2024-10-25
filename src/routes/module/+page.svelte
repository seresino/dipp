<script>
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { truncateWords } from "$lib/utils/helperFunctions.js";

	export let data; // data returned by the load function
	const user = data.user[0];
	const module = data.module;
	const tasks = data.tasks;
	const weeklytasks = data.weeklyTasks;
	const path = "module"; // directory of this route

	let view = $page.url.searchParams.get("view") || "";
	let selectedButton = view.includes("-") ? view.split("-")[0] : view;
	let parameterID = view.includes("-") ? view.split("-")[1] : null;
	let selectedTask = null;
	let completed = false;
	let updateForm;

	// checks whether there is a task in the weeklyTasks table that corresponds to this task and has been completed
	function isTaskComplete(task) {
		return weeklytasks.some(
			(weeklytask) =>
				weeklytask.task_id == task.id && weeklytask.complete_timestamp
		);
	}

	// updates query parameters of current page when toggle buttons are clicked or tasks are expanded
	function updateQueryParameters(view, id = null) {
		const query = new URLSearchParams($page.url.searchParams.toString());
		query.set("view", id ? `${view}-${id}` : view);
		goto(`?${query.toString()}`);
	}

	// sends a request to the server to add new entry to the weeklyTasks table, where start_timestamp will be set
	async function addWeeklyTask(taskID) {
		const formData = new FormData();
		formData.append("taskID", taskID);

		const response = await fetch(`${path}/?/add`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			console.log("Task submitted successfully");
		}
	}

	// function that deals with task being selected from list
	function selectTask(task) {
		selectedTask = task; // assign task to selectedTask variable in order to render html for task info
		updateQueryParameters("tasks", task.id.toString()); // update query parameters
		addWeeklyTask(selectedTask.id); // create new task entry in db
	}

	// function to handle checkbox change and send update request to server, where complete_timestamp will be set
	function handleCheckBox() {
		if (completed) {
			updateForm.submit();
		}
	}

	// listener which assigns selectedTask to whichever task matches the current query parameter ID
	// (ensures selectedTask is not null when expanded task info page is refreshed)
	$: selectedTask = tasks.find((task) => task.id == parameterID);

	// function to redirect to task info page if user goes straight to URL of expanded task without row existing in table
	onMount(() => {
		if (parameterID !== null) {
			const weeklyTasks = weeklytasks.map((entry) => entry.task_id);
			if (!weeklyTasks.includes(Number(parameterID))) {
				window.location.href = "/module?view=tasks";
			}
		}
	});
</script>

{#if user}
	<div class="pop-up white">
		<a class="circular-button back" href="/day"
			><img src="/images/return-circle-button.svg" alt="back button" /></a
		>
		<a class="circular-button home" href="/dashboard"
			><img src="/images/home-circle-button.svg" alt="home button" /></a
		>
		<div class="pop-up-content">
			<div class="button-container">
				<button
					class="form-button"
					type="button"
					class:black={selectedButton === "instructions"}
					class:grey={selectedButton !== "instructions"}
					data-toggle="modal"
					on:click={() => (selectedButton = "instructions")}
					on:click={() => {
						selectedTask = null;
						updateQueryParameters("instructions");
					}}
				>
					<img
						src="/images/meditation-grey-icon.svg"
						alt="meditation-grey-icon"
					/>
					<p>Instructions</p>
				</button>
				<button
					type="button"
					class="form-button"
					class:black={selectedButton === "tasks"}
					class:grey={selectedButton !== "tasks"}
					data-toggle="modal"
					on:click={() => (selectedButton = "tasks")}
					on:click={() => updateQueryParameters("tasks")}
				>
					<img
						src="/images/task-grey-icon.svg"
						alt="task-grey-icon"
					/>
					<p>Tasks</p>
				</button>
			</div>

			<div class="content">
				{#if selectedButton === "instructions"}
					<h1>Module {module.id}: {module.name}</h1>
					<p>{module.description}</p>
				{:else if selectedButton === "tasks"}
					{#if !selectedTask}
						{#each tasks
							.slice()
							.sort((a, b) => a.id - b.id) as task, index}
							<div
								class="task-item"
								on:click={() => selectTask(task)}
							>
								<div
									class="task-number-box {isTaskComplete(task)
										? 'completed'
										: ''}"
								>
									{index + 1}
								</div>
								<div class="task-item-content">
									<h2>{task.task}</h2>
									<p class="goal">
										{truncateWords(task.goal, 22)}...
									</p>
								</div>
							</div>
						{/each}
					{:else}
						<div class="task-details">
							<h1>
								{selectedTask.task} ({selectedTask.time} minutes)
							</h1>
							<h2>Goal:</h2>
							<p>{selectedTask.goal}</p>

							<h2>Materials Needed:</h2>
							{#each Object.values(selectedTask.materials) as material}
								<li>{material}</li>
							{/each}
							<h2>Instructions:</h2>
							<ol>
								{#each Object.keys(selectedTask.instructions) as instructionKey}
									<li>
										{selectedTask.instructions[
											instructionKey
										]}
									</li>
									<br />
								{/each}
							</ol>
							{#if selectedTask.specifics}
								<h2>Task/Background:</h2>
								<p>{selectedTask.specifics}</p>
							{/if}
						</div>
						{#if isTaskComplete(selectedTask)}
							<p class="complete">Task completed</p>
						{:else}
							<form
								class="block"
								bind:this={updateForm}
								action="{path}/?/update"
								method="post"
							>
								<label for="completed">Completed</label>
								<input
									type="checkbox"
									id="completed"
									name="completed"
									bind:checked={completed}
									on:change={handleCheckBox}
								/>
								<input
									type="hidden"
									name="taskID"
									value={selectedTask.id}
								/>
							</form>
						{/if}
						<button
							class="form-button"
							on:click={() => {
								selectedTask = null;
								updateQueryParameters("tasks");
							}}>Back</button
						>
					{/if}
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: top;
		align-items: left;
		gap: 20px;
		padding: 10% 10%;
		width: 100%;
		height: 100%;
		min-height: 50svh;
	}
	.task-item {
		border-style: solid;
		border-color: #d5d5d5;
		border-radius: 20px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 120px;
		cursor: pointer;
	}
	h2 {
		font-size: 20px;
		font-weight: normal;
	}

	.task-number-box {
		min-width: 60px;
		height: 80%;
		border-style: solid;
		border-color: #168ace;
		border-radius: 20px;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20px;
	}
	.task-item-content {
		flex-direction: column;
		justify-content: top;
		align-items: left;
		margin-right: 10px;
	}
	.goal {
		font-size: 16px;
		color: #d5d5d5;
		margin: 5px 0 5px 0;
	}
	.task-details {
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: top;
		align-items: left;
		gap: 20px;
		height: 300px;
		margin-bottom: 20px;
	}
	.task-details li {
		font-size: 16px;
		margin: 0 20px 0 20px;
	}
	.task-details::-webkit-scrollbar {
		width: 10px;
	}
	.task-details::-webkit-scrollbar-thumb {
		background: #5db3e5; /* Color of the scroll thumb */
		border-radius: 10px;
	}

	.task-details::-webkit-scrollbar-thumb:hover {
		background: #168ace; /* Color of the scroll thumb when hovered */
	}
	.button-container {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 100%;
	}
	.black {
		color: white;
		background-color: black;
	}
	.completed {
		background-color: #5db3e5;
		box-shadow: 0px 4px 13.1px -4px rgba(0, 0, 0, 0.25) inset;
	}
	.complete {
		color: green;
		font-style: italic;
	}
	.block {
		display: block;
		padding: 10px;
	}
	@media (max-width: 1000px) {
		.goal {
			display: none;
		}
	}
</style>
