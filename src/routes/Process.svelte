<script>
  import { onMount } from "svelte";
  import { getValue, setValue } from "../store";
  import superagent from "superagent";
  import { supabase } from "../supabaseClient";
  const baseurl = __api.env.SVELTE_APP_BASE_URL;
  let username = "";
  let files = null;
  onMount(() => {
    prereq();
  });

  let loading = true;
  async function prereq() {
    const user = supabase.auth.user();
    console.log(user);
    if (user === null) return (window.location.href = "/#/login");
    const userid = user.id;
    const email = user.email;
    // axios call to danny boi to upsert will send uid
    const res = await superagent.post(baseurl + "auth/authtype", {
      email: email,
      userid: userid,
    });
    let response = res.body.authtype;
    let tempjwt = res.body.jwt;
    console.log(tempjwt);
    console.log("broooooo", response);
    if (response === "signin") {
      //set jwt
      // login
      setValue("AUTH", true);
      setValue("JWT", tempjwt);
      setValue("ONBOARDING", false);
      window.location.href = "/#/";
    } else {
      setValue("JWT", tempjwt);
      loading = false;
    }
  }
  async function onboard(e) {
    const formdata = new FormData();
    formdata.append("pfp", files[0]);
    formdata.append("username", username);
    formdata.append("token", getValue("JWT"));
    const res = await superagent
      .post(baseurl + "auth/onboard")
      .set("token", getValue("JWT"))
      .send(formdata);

    console.log(res.body);
    setValue("AUTH", true);
    setValue("ONBOARDING", true);
    window.location.href = "/#/";
  }
</script>

<div>
  {#if loading}
    loading
  {:else}
    <form on:submit|preventDefault={onboard} class="">
      <input
        class="text-black"
        bind:value={username}
        type="text"
        placeholder="username"
        name=""
        id=""
      />
      <label for="pfp">your dp here pls</label>
      <input bind:files type="file" name="" id="pfp" />
      <button type="submit">submit</button>
    </form>
  {/if}
</div>
