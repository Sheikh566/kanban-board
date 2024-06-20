<script>
  import { current_user } from "./stores";
  $: userName = $current_user ? $current_user.name : null;

  function handleLogout() {
    localStorage.removeItem('RememberMeToken');
    sessionStorage.removeItem('token');
    window.location.href = "/login";
    current_user.update(() => null);
  }
</script>

<nav>
  <h2>Kanban Board</h2>
  <ul>
    {#if userName}
      <li>{userName}</li>
      <li> | </li>
      <li><a href="#" on:click={handleLogout}>Logout</a></li>
    {/if}
  </ul>
</nav>

<style>
  nav {
    font-size: 1em;
    display: flex; /* 1 */
    justify-content: space-between; /* 2 */
    padding: 1rem 2rem; /* 3 */
  }

  nav h2 {
    margin-top: 0.3em;
  }

  nav ul {
    display: flex; /* 5 */
    list-style: none; /* 6 */
  }

  nav li {
    padding-left: 1rem; /* 7! */
  }

  nav a {
    text-decoration: none; /* 8 */
    color: white;
  }

  nav a:hover {
    text-decoration: underline; /* 9 */
  }
</style>