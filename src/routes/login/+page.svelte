<script>
  import { authHandlers } from "../../store/store";

  let email = "";
  let password = "";
  let confirmPass = "";
  let error = false;
  let register = false;
  let authenticating = false;

  async function handleAuthenticate() {
    if (authenticating) {return;}

    if (!email || !password || (register && !confirmPass)) {
      error = true
      return
    }

    authenticating = true;

    try {
      if (!register) {
        await authHandlers.login(email, password);
      } else {
        await authHandlers.signup(email, password);
      }
    } catch(err) {
      console.log('There was an auth error', err);
      error = true;
      authenticating = false;
    }

  }

  function handleRegister () {
    register = !register
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    handleAuthenticate(); // Call your authentication function
  }
</script>

<form on:submit={handleSubmit}>
  {#if error}
    <p class="error">The information you have entered is not correct</p>
  {/if}
  <div class="input-div">
    <div class="labels">Username</div>
    <input class="input-box" bind:value={email} type="text" />
  </div>
  <div class="input-div">
    <div class="labels">Password</div>
    <input class="input-box" bind:value={password} type="password" />
  </div>
  {#if register}
    <div class="input-div">
      <div class="labels">Confirm Password</div>
      <input class="input-box" bind:value={confirmPass} type="password" />
    </div>
  {/if}
  <div class="options-div">
    <button class="options" type="submit">
      {#if authenticating}
        Loading...
      {:else}
        {#if register}
          Register
        {:else}
          Login
        {/if}
      {/if}
    </button>
  </div>
  <!-- <div class="options-div">
    <div class="options" on:click={handleRegister}>
      {#if register}
        Already have an account? Login
      {:else}
        Don't have an account? Register
      {/if}
    </div>
  </div> -->
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
