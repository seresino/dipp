<script lang="ts">
	export let form;
	export let data; // data returned by the load function
	let path = "test"; // directory of this route
</script>

<h1>Add User</h1>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<!-- Don't want test to be hardcoded in, should be replaced by directory name -->
<form action="{path}/?/add" method="post" class="flex">
	<input type="text" name="username" placeholder="Enter username..." />
	<input type="submit" value="Submit" />
</form>

<!-- <form action="{path}/?/update" method="post" class="flex">
    <input type="text" name="id" placeholder="User ID..." />
    <input type="text" name="username" placeholder="New username..." />
    <input type="submit" value="Submit" />
</form> -->

<br />

<!-- {#if data?.users}
    {#each data.users as user}
        <div class="flex">
            <h3>{user.username}</h3>
        </div>
    {/each}
{/if} -->

<form action="{path}/?/seed" method="post">
	<input type="submit" value="seed" />
</form>

{#if data?.users}
	{#each data.users as user}
		<div class="flex">
			<form action="{path}/?/update" method="post">
				<input type="hidden" name="id" value={user.id} />
				<input type="text" name="username" value={user.username} />
				<input
					type="checkbox"
					name="meditation"
					checked={user.meditation}
				/>
				<input
					type="checkbox"
					name="high_dosage"
					checked={user.high_dosage}
				/>
				<input type="submit" value="Update" />
			</form>

			<form action="{path}/?/delete" method="post">
				<input type="hidden" name="id" value={user.id} />
				<input type="submit" value="Delete" />
			</form>

			<!-- <p>
                {user.createdAt?.toLocaleString()}
            </p> -->
		</div>
	{/each}
{/if}

<style>
	.flex *,
	.flex {
		display: flex;
		align-items: center;
	}
</style>
