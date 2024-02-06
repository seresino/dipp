<script>
  import { enhance } from '$app/forms'
  export let form
</script>


<form action="?/login" method="POST" use:enhance>
	<div class="input-div">
		<label class="labels" for="username">Username</label>
		<input class="input-box" id="username" name="username" type="text" required />
	</div>

	<div class="input-div">
		<label class="labels" for="password">Password</label>
		<input class="input-box" id="password" name="password" type="password" required />
	</div>

	{#if form?.invalid}
		<p class="error">Username and password is required.</p>
	{/if}

	{#if form?.credentials}
		<p class="error">You have entered the wrong credentials.</p>
	{/if}
  <div class="options-div">
    <button class="options" type="submit" data-sveltekit-reload>Log in</button>
  </div>

</form>

<style>
  form {
    max-width: 90%;
    justify-content: space-between;
    align-items: center;
    background : white;
    border-radius : 40px;
    border: solid #168ACE;
    padding: 40px 0 20px 0;
  }
  .input-div {
    width: 80%;
    justify-content: space-evenly;
    align-items : center;
    gap: 10px;
    padding: 5px 20px 5px 20px;
   }
  .input-box {
    width : 280px;
    max-width: 40vw;
    height : 49px;
    background : white;
    border-radius : 38px;
    border : 1px #168ACE solid;
    padding: 0 20px 0 20px;
  }
  .labels {
    font-size: px;
  }
  .options-div {
    width: 75%;
    justify-content : right;
    align-items : center;
    padding: 12px 20px 0px 20px;

  }
  .options {
    color : #B5B5B5;
    font-size : 16px;
    margin: 0px 0px 0px 10px;
  }
</style>
