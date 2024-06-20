<script>
  import PasswordInput from "./PasswordInput.svelte";
  import { FetchWrapper } from "./fetch-wrapper";

  let name = "";
  let email = "";
  let password = "";
  let spinner = false;
  let errorMessage = "";
  let rememberMe = false;

  async function handleSignUp() {
    spinner = true;
    const res = await FetchWrapper.post("/signup", {
      name,
      email,
      password,
    });
    spinner = false;

    if (res.status != 201) {
      errorMessage = res.data.message;
      return;
    }

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

<div id="signup-card">
  <form on:submit|preventDefault={handleSignUp}>
    <div>
      <label for="name">Name:</label>
      <input id="name" type="text" bind:value={name} />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" bind:value={email} />
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
          Sign up
        {/if}
      </button>
    </div>
    <div id="error-message">
      <p>{errorMessage}</p>
    </div>
    <div class="signup">
      Already have an account? <a href="/login">Login</a>
    </div>
  </form>
</div>

<style>
  #signup-card {
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
  #signup-card form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  #signup-card input:not([type="checkbox"]) {
    width: calc(100% - 2em);
    padding: 0.5em;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid black;
    color: black;
    font-size: 1em;
  }
  #signup-card input:focus {
    outline: none;
  }
  #signup-card button[type="submit"] {
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
  #signup-card button:disabled {
    cursor: not-allowed;
  }
  #signup-card button[type="submit"]:hover:not([disabled]) {
    background-color: black;
    color: white;
  }
  #signup-card a {
    color: blue;
    text-decoration: underline;
  }
  #error-message p {
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
