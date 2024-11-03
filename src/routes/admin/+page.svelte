<script lang="ts">
	export let form;
	export let data; // data returned by the load function

	// Function to fetch and download Excel file
	async function exportTables() {
		const response = await fetch("/api/export-tables");

		if (response.ok) {
			// Create a blob for the Excel file
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			// Create a temporary anchor element to trigger download
			const a = document.createElement("a");
			a.href = url;
			a.download = "tables.xlsx";
			a.click();
		} else {
			console.error("Failed to export tables.");
		}
	}
</script>


<h4>Add New Participant:</h4>
{#if form?.message}
	<p>{form.message}</p>
{/if}

<form action="?/add" method="POST" class="flex">
	<input type="text" name="username" placeholder="Enter username..." />
	<input type="text" name="password" placeholder="Enter password..." />
	<input type="date" name="startDate" placeholder="Enter start date..." />
	<div class="checkbox-container">
		<label for="meditation">Meditation Group</label>
		<input type="checkbox" id="meditation" name="meditation" />
	</div>
	<input type="submit" value="Add Participant" />
</form>

<h4>Download Data</h4>
<!-- <form action="?/download" method="post">
	<input type="submit" value="Download CSV" />
</form> -->

<!-- Button to trigger the export -->
<button on:click={exportTables} class="styled-button">Export Tables</button>

<style>
	/* General page styles */
	h1 {
		font-size: 2em;
		margin-bottom: 0.5em;
		color: #333;
	}

	h4 {
		font-size: 1.5em;
		margin-top: 1.5em;
		color: #555;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-top: 1em;
	}

	input[type="text"],
	input[type="date"],
	input[type="submit"] {
		padding: 0.5em;
		font-size: 1em;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	input[type="submit"] {
		background-color: #28a745;
		color: white;
		cursor: pointer;
		width: 100%;
	}

	input[type="submit"]:hover {
		background-color: #218838;
	}

	input[type="submit"]:active {
		background-color: #1e7e34;
	}

	.checkbox-container {
		display: flex;
		gap: 0.5em;
	}

	input[type="checkbox"] {
		transform: scale(1.5);
	}

	/* Styles for the buttons */
	.styled-button {
		padding: 0.5em 1em;
		font-size: 1em;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 4px;
		margin-top: 1em;
		width: 185px;
	}

	.styled-button:hover {
		background-color: #0056b3;
	}

	.styled-button:active {
		background-color: #004085;
	}
</style>
