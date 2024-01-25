<script>
  let path = "test" // directory of this route
  
  import { authHandlers } from "$lib/utils/helperFunctions.js";
  // import { actions } from './+page.server';

  let username = "";
  let password = "";
  let error = false;
  let authenticating = false;
  export let data; // data returned by the load function

  async function handleAuthenticate() {
    if (authenticating) {return;}

    if (!username || !password) {
      error = true
      return
    }

    authenticating = true;

    // try {
    //   await actions.login(username, password); // Replace 'username' and 'password' with actual values
    // } catch (error) {
    //   console.log('There was an auth error', error);
    //   error = true;
    //   authenticating = false;
    // }

    try {
      await authHandlers.login(username, password);

    } catch(err) {
      console.log('There was an auth error', err);
      error = true;
      authenticating = false;
    }

  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    handleAuthenticate(); // Call your authentication function
  }
</script>


  <!-- <form action="{path}/?/login" method="post">
    {#if error}
      <p class="error">The information you have entered is not correct</p>
    {/if}
    <div class="input-div">
      <div class="Labels">Username</div>
      <label>
        <input class="InputBox" bind:value={username} type="text" />
      </label>
    </div>
    <div class="input-div">
      <div class="Labels">Password</div>
      <label>
        <input class="InputBox" bind:value={password} type="password" />
      </label>
    </div>
    <div class="options-div">
      <button class="Options" type="submit">
        {#if authenticating}
          Loading...
        {:else}
            Login
        {/if}
      </button>
    </div>
  </form> -->

<form on:submit={handleSubmit}>
  {#if error}
    <p class="error">The information you have entered is not correct</p>
  {/if}
  <div class="input-div">
    <div class="Labels">Username</div>
    <label>
      <input class="InputBox" bind:value={username} type="text" />
    </label>
  </div>
  <div class="input-div">
    <div class="Labels">Password</div>
    <label>
      <input class="InputBox" bind:value={password} type="password" />
    </label>
  </div>
  <div class="options-div">
    <button class="Options" type="submit">
      {#if authenticating}
        Loading...
      {:else}
          Login
      {/if}
    </button>
  </div>
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