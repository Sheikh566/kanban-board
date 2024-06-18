<script>
  import { Router, Route } from "svelte-routing";
  import Board from "./lib/Board.svelte";
  import Login from "./lib/Login.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Signup from "./lib/Signup.svelte";
  import { current_user } from "./lib/stores.js";
  import { onMount } from "svelte";

  export let url = '';
  // check local storage for token
  onMount(async () => {
    const token = localStorage.getItem("RememberMeToken");
    if (token) {
      const me = await fetch('http://dummyjson.com/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
        }, 
      })
      .then(res => res.json());

      console.log({ me });

      if (me) {
        current_user.update(() => {
          return {
            name: 'Sheikh Abdullah',
            email: me.email,
          }
        });
      }
    }
  });
</script>

<Router {url}>
  <Navbar />
  <Route path="/" component={Board}></Route>
  <Route path="/login" component={Login}></Route>
  <Route path="/signup" component={Signup}></Route>
</Router>

<style>
</style>
