<script>
  import { Router, Route } from "svelte-routing";
  import Board from "./lib/Board.svelte";
  import Login from "./lib/Login.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Signup from "./lib/Signup.svelte";

  export let url = "";
</script>

<Router {url}>
  <Navbar />
  <Route path="/" component={Board}></Route>
  <Route path="/login" component={Login}></Route>
  <Route path="/signup" component={Signup}></Route>
</Router>

<style>
</style>
