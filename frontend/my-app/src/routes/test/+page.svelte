<script lang="ts">
    export let form;
    export let data; // data returned by the load function
</script>

<h1>Add User</h1>

{#if form?.message}
    <p>{form.message}</p>
{/if}

<!-- Don't want test to be hardcoded in, should be replaced by directory name -->
<form action="test/?/add" method="post" class="flex">
    <input type="text" name="content" placeholder="Enter username..." />
    <input type="submit" value="Submit" />
</form>

<form action="test/?/update" method="post" class="flex">
    <input type="text" name="content" placeholder="User ID..." />
    <input type="text" name="content" placeholder="New username..." />
    <input type="submit" value="Submit" />
</form>

<br>

{#if data?.users}
    {#each data.users as user}
        <div class="flex">
            <h3>{user.password}</h3>
        </div>
    {/each}
{/if}

<!-- {#if data?.users}
    {#each data.users as user}
        <div class="flex">
            <form action="/?/update" method="post">
                <input type="hidden" name="id" value={user.id} />
                <input type="text" name="username" value={user.username} />
                <input type="text" name="password" value={user.password} />
                <input type="checkbox" name="meditation" checked={user.meditation} />
                <input type="submit" value="Update" />
            </form>

            <form action="/?/delete" method="post">
                <input type="hidden" name="id" value={user.id} />
                <input type="submit" value="Delete" />
            </form>

            <p>
                {user.createdAt?.toLocaleString()}
            </p> -->
        <!-- </div>
    {/each}
{/if} -->

<style>
    .flex *,
    .flex {
        display: flex;
        align-items: center;
    }
</style>