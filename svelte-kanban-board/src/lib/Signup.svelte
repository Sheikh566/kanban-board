<script>
  import PasswordInput from "./PasswordInput.svelte";

  let name = "";
  let email = "";
  let password = "";
  let spinner = false;
  let error = "";

  async function handlesignup() {
    spinner = true;
    const signupUrl = "https://dummyjson.com/users/add";
    const userData = await fetch(signupUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: name,
        email: email,
        password: password,
      }),
    }).then((res) => res.json());
    spinner = false;

    if (!userData) {
      console.log("No data received");
      return;
    }

    console.log(userData);
    return;
  }

  function handlePasswordInput(event) {
    password = event.target.value;
  }
</script>

<div class="container">
  <div id="signup-card">
    <form on:submit|preventDefault={handlesignup}>
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
        <button type="submit" disabled={spinner}>
          {#if spinner}
            <i class="fa-solid fa-circle-notch"></i>
          {:else}
            Sign up
          {/if}
        </button>
      </div>
      <div id="error-message">
        <p>{error}</p>
      </div>
      <div class="signup">
        Already have an account? <a href="/login">Login</a>
      </div>
    </form>
  </div>
  <div id="continue-as-guest">
    <a href="/">Continue as guest</a>
  </div>
</div>

<style>
  #continue-as-guest {
    text-align: center;
    margin-top: 3em;
  }
  #continue-as-guest a {
    color: white;
    text-decoration: none;
  }
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
  #signup-card input {
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
    position: relative;
    text-align: center;
    top: 4em;
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
