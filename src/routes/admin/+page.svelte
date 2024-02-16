<script lang="ts">
    export let form;
    export let data; // data returned by the load function
    let path = "admin" // directory of this route
</script>

<h1>Admin</h1>

<h4>Add new participant</h4>
{#if form?.message}
    <p>{form.message}</p>
{/if}

<form action="{path}/?/add" method="post" class="flex">
    <input type="text" name="username" placeholder="Enter username..." />
    <input type="text" name="password" placeholder="Enter password..." />
    <input type="date" name="startDate" placeholder="Enter start date..." />
    <label for="meditation">Meditation?</label>
    <input type="checkbox" id="meditation" name="meditation" />
    <input type="submit" value="Add" />
</form>

<h4>Download Data</h4>
<form action="{path}/?/download" method="post">
    <input type="submit" value="Download CSV" />
</form>
