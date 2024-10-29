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

<h1>Admin</h1>

<h4>Add new participant</h4>
{#if form?.message}
	<p>{form.message}</p>
{/if}

<form action="?/add" method="POST" class="flex">
	<input type="text" name="username" placeholder="Enter username..." />
	<input type="text" name="password" placeholder="Enter password..." />
	<input type="date" name="startDate" placeholder="Enter start date..." />
	<label for="meditation">Meditation?</label>
	<input type="checkbox" id="meditation" name="meditation" />
	<input type="submit" value="Add" />
</form>

<h4>Download Data</h4>
<!-- <form action="?/download" method="post">
	<input type="submit" value="Download CSV" />
</form> -->

<!-- Button to trigger the export -->
<button on:click={exportTables} class="styled-button">Export Tables</button>

<style>
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
	}
	.styled-button:hover {
		background-color: #0056b3;
	}
	.styled-button:active {
		background-color: #004085;
	}
</style>
