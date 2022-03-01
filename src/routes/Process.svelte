<script>
  import { onMount } from "svelte";
  import { setValue } from "../store";

  import { supabase } from "../supabaseClient";
  onMount(() => {
    prereq();
  });

  let loading = true;
  async function prereq() {
    const user = supabase.auth.user();
    if (user === null) return (window.location.href = "/#/login");
    // axios call to danny boi to upsert will send uid
    // if present in mongo ==> send back sign in else send sign up and add to mongo
    // send JWT back
    let response = "signin";
    if (response === "signin") {
      //set jwt
      setValue("AUTH", true);
      window.location.href = "/#/";
    } else {
      loading = false;
    }
  }
  function onboard() {
    //axios call to dannybois server, send back username and pfp
    // oncomplete
    window.location.href = "/#/";
  }
</script>

<div>
  {#if loading}
    loading
  {:else}
    <form on:submit|preventDefault={onboard}>
      <input type="text" placeholder="username" name="" id="" />
      <label for="pfp">your dp here pls</label>
      <input type="file" name="" id="pfp" />
    </form>
  {/if}
</div>
