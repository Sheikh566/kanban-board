<script>
  export let handlePasswordInput;
  let showPassword = false;
</script>

<div> 
  <label for="password">Password:</label>
  <input id="password" type={showPassword ? 'text' : 'password' } on:input={handlePasswordInput}/>
  <button type="button" class="password-toggle-icon" on:click={() => showPassword = !showPassword }>
    <i class="fa-solid {showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
  </button>
</div>

<style>
  input[type="password"],
  input[type="text"] {
    width: calc(100% - 2em);
    padding: 0.5em;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid black;
    color: black;
    font-size: 1em;
  }
  .password-toggle-icon {
    background-color: transparent;
    border: none;
    color: black;
    margin-left: -2.5em;
    position: relative;
  }
  input:focus {
    outline: none;
  }
</style>