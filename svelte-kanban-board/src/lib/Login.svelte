<script>
  import PasswordInput from "./PasswordInput.svelte";
  import { FetchWrapper } from "./fetch-wrapper";

  let email = "";
  let password = "";
  let rememberMe = false;
  let errorMessage = "";
  let spinner = false;

  async function handleLogin() {
    spinner = true;
    const res = await FetchWrapper.post("/login", {
      email,
      password,
    });
    spinner = false;

    if (!res) {
      console.log("No data received");
      return;
    }

    if (res.status != 200) {
      errorMessage = res.data.message;
      return;
    }
    errorMessage = "";

    if (rememberMe) {
      localStorage.setItem("RememberMeToken", res.data.token);
    }

    sessionStorage.setItem("token", res.data.token);
    window.location.href = "/";

    return;
  }

  function handlePasswordInput(event) {
    password = event.target.value;
  }
</script>

<div id="login-card">
  <form on:submit|preventDefault={handleLogin}>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" on:input={({ target }) => { email = target["value"] }} />
    </div>
    <PasswordInput {handlePasswordInput} />
    <div>
      <input id="remember-me" type="checkbox" bind:checked={rememberMe} />
      <label for="remember-me">Remember Me</label>
    </div>
    <div>
      <button type="submit" disabled={spinner}>
        {#if spinner}
          <i class="fa-solid fa-circle-notch"></i>
        {:else}
          Login
        {/if}
      </button>
    </div>
    <div id="incorrect-creds">
      <p style="opacity: {+!!errorMessage}">{errorMessage}</p>
    </div>
    <div class="signup">
      Don't have an account? <a href="/signup">Sign up</a>
    </div>
  </form>
</div>

<style>
  #login-card {
    margin-left: calc(50vw - 15em);
    padding: 0;
    text-decoration: none;
    color: #000;
    background: #ffc;
    display: block;
    min-height: 25em;
    width: 25em;
    padding: 2em;
    box-shadow: 1em 1em 1em rgba(0, 0, 0, 0.7);
  }
  #login-card form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  #login-card input[type="email"] {
    width: calc(100% - 2em);
    padding: 0.5em;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid black;
    color: black;
    font-size: 1em;
  }
  #login-card input:focus {
    outline: none;
  }
  #login-card button[type="submit"] {
    padding: 0.5em;
    cursor: pointer;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 2em;
    color: black;
    width: 5em;
    font-size: 1em;
    margin-left: 40%;
  }
  #login-card button:disabled {
    cursor: not-allowed;
  }
  #login-card button[type="submit"]:hover:not([disabled]) {
    background-color: black;
    color: white;
  }
  #login-card a {
    color: blue;
    text-decoration: underline;
  }
  #incorrect-creds p {
    color: red;
    text-align: center;
  }
  .signup {
    margin-left: 5em;
  }
  .fa-circle-notch {
    font-size: 1em;
  }
  @keyframes fa-circle-notch {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .fa-circle-notch {
    animation: fa-circle-notch 1s linear infinite;
  }
</style>
