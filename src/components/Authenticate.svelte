<script>
  import { authHandlers } from "../store/store";

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
</script>

<div class="authContainer">
  <form>
    <h1>{register ? 'Register': 'Login'}</h1>
    {#if error}
      <p class="error">The information you have entered is not correct</p>
    {/if}

    <label>
      <p class={email ? ' above' : ' center'}>Email</p>

      <input bind:value={email} type="text" placeholder="email" />
    </label>

    <label>
      <p class={password ? ' above' : ' center'}>Password</p>
      <input bind:value={password} type="password" placeholder="Password" />
    </label>

    {#if register}
    <label>
      <p class={confirmPass ? ' above' : ' center'}>Confirm Password</p>
      <input bind:value={confirmPass} type="password" placeholder="Confirm Password" />
    </label>
    {/if}


    <button on:click={handleAuthenticate} type="button">
      {#if authenticating}
      loading...
      {:else}
      Submit
      {/if}
    </button>
  </form>

  <div class="options">
    <p>or</p>
    {#if register}
      <div>
        <p>Already have an account?</p>
        <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
      </div>
    {:else}
      <div>
        <p>Don't have an account?</p>
        <!-- Button to change authentification page to "register" instead of "login". Not needed for now -->
        <!-- <p on:click={handleRegister} on:keydown={() => {}}>Register</p> -->
      </div>
    {/if}
  </div>
</div>

<style>
  /* flex 1 makes it take up full page */
  .authContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

    /* makes input fields wide */
  form input {
    width: 100%;
    border: none;
    background: transparent;
    color: white;
    padding: 14px 14px;
  }

  form label {
    position: relative;
    border: solid white;
    border-radius: 5px;
  }

  form button {
    width: 100%;
    border-radius: 5px;
    border: none;
    background: green;
    color: white;
    padding: 14px 14px;
    cursor: pointer;
    font-size: 1rem;
  }

  form button:hover {
    background: lime;
  }

  form label:focus-within{
    border: solid lime;
  }

  form input:focus {
    border: none;
    outline: none;
  }

  h1 {
    text-align: center;
  }

  form,
  .options {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }

  .above,
  .center {
    position: absolute;
    transform: translateY(-50%);
    pointer-events: none;
    color: white;
    border-radius: 4px;
    padding: 0 6px;
    font-size: 0.8rem;
  }

  .above {
    top: 0;
    left: 24px;
    background: green;
    border: solid lime;
    font-size: 0.7rem;
  }

  .center {
    top: 50%;
    left: 6px;
    border: 1px solid transparent;
    opacity: 0;
  }

  .error {
    color: coral;
    text-align: center;
  }

  .options {
    padding: 14px 0;
    overflow: hidden;
  }

  .options > p {
    position: relative;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    padding: 0 8px;
  }

  .options > p::after,
  .options > p::before {
    content:'';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100vw;
    height: 1.5px;
    background: white;
  }

  .options > p::after {
    right:100%;
  }

  .options > p::before {
    left:100%;
  }

  .options div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .options div p:last-child{
    color: lime;
    cursor: pointer;
  }
</style>
