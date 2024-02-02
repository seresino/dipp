<script>
  import { enhance } from '$app/forms'

  export let form
</script>

<form action="?/login" method="POST" use:enhance>
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>

	{#if form?.invalid}
		<p class="error">Username and password is required.</p>
	{/if}

	{#if form?.credentials}
		<p class="error">You have entered the wrong credentials.</p>
	{/if}

	<button type="submit" data-sveltekit-reload>Log in</button>
</form>

<style>
  form {
    width : 626px;
    height : 227px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background : white;
    border-radius : 38px;
    border: 2px #168ACE solid;
  }
  .input-div {
    width: 75%;
    display : flex;
    justify-content: space-between;
    align-items : center;
    padding: 5px 10px 5px 10px;
   }
  .InputBox {
    width : 280px;
    height : 49px;
    background : white;
    border-radius : 38px;
    border : 1px #168ACE solid;
    padding: 0 20px 0 20px;
  }
  .Labels {
    color : black;
    font-size : 20px;
    font-family : Helvetica Neue;
    font-weight : 500;
    word-wrap : break-word;
  }
  .options-div {
    width: 75%;
    display : flex;
    justify-content : right;
    align-items : center;
    padding: 12px 40px 0px 20px;

  }
  .Options {
    color : #B5B5B5;
    font-size : 16px;
    font-family : Helvetica Neue;
    font-weight : 500;
    word-wrap : break-word;
    margin: 0px 0px 0px 10px;
    cursor: pointer;
  }
  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
</style>
