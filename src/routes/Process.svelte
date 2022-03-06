<script>
  import { onMount } from "svelte";
  import { getValue, setValue } from "../store";
  import superagent from "superagent";
  import { supabase } from "../supabaseClient";
  import Toastify from "toastify-js";
  const baseurl = __api.env.SVELTE_APP_BASE_URL;
  let username = "";
  let subname = "";
  let files = [];
  let cover = [];
  let subnameok = false;
  let pfppreview;
  let coverpreview;

  function encodeImage(file, type) {
    const reader = new FileReader();
    reader.onload = function () {
      if (type === "cover") coverpreview = reader.result;
      if (type === "pfp") pfppreview = reader.result;
      return reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  $: encodeImage(cover[0], "cover");
  $: encodeImage(files[0], "pfp");
  onMount(() => {
    prereq();
  });

  let loading = true;
  async function prereq() {
    const user = supabase.auth.user();
    //console.log(user);
    if (user === null) return (window.location.href = "/#/login");
    const userid = user.id;
    const email = user.email;
    // axios call to danny boi to upsert will send uid
    const res = await superagent.post(baseurl + "auth/authtype", {
      email: email,
      userid: userid,
    });
    console.log(res.body);
    let response = res.body.authtype;
    let tempjwt = res.body.jwt;

    if (response === "signin") {
      //set jwt
      // login
      setValue("AUTH", true);
      setValue("JWT", tempjwt);
      setValue("ONBOARDING", false);
      setValue("USERID", res.body.user_id);
      setValue("SUBNAME", res.body.details.subname);
      setValue("USERNAME", res.body.details.name);
      setValue("PFP_LINK", res.body.details.pfp);
      window.location.href = "/#/";
    } else {
      //console.log(tempjwt);
      setValue("JWT", tempjwt);
      loading = false;
    }
  }
  async function onboard(e) {
    const formdata = new FormData();
    const user = supabase.auth.user();

    if (files.length !== 0) formdata.append("pfp", files[0]);
    if (cover.length !== 0) formdata.append("cover", cover[0]);
    formdata.append("username", username);
    formdata.append("subname", subname);
    formdata.append("token", getValue("JWT"));
    try {
      if (subnameok) {
        const res = await superagent
          .post(baseurl + "auth/onboard")
          .set("token", getValue("JWT"))
          .send(formdata);
        //console.log(res.body);
        if (res.body.status === "success") {
          setValue("AUTH", true);
          setValue("ONBOARDING", true);
          setValue("USERNAME", username);
          setValue("USERID", user.id);
          setValue("SUBNAME", subname);
          setValue("PFP_LINK", res.body.details.pfp);
          window.location.href = "/#/";
        } else {
          Toastify({
            text: "Something went wrong. Oops",
            duration: 3000,
          }).showToast();
        }
      } else {
        Toastify({
          text: "Something went wrong. Oops",
          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: "Something went wrong. Oops",
        duration: 3000,
      }).showToast();
      throw error;
    }
  }
</script>

<div>
  {#if loading}
    loading
  {:else}
    <div class="grid place-items-center h-screen">
      <form
        on:submit|preventDefault={onboard}
        class="flex flex-col gap-4 p-10 "
      >
        <div class="flex gap-2  items-center">
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="60"
              height="60"
              viewBox="0 0 172 172"
              style=" fill:#000000;"
              ><g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
                ><path d="M0,172v-172h172v172z" fill="none" /><g fill="#f1c40f"
                  ><path
                    d="M99.4375,16.125c-15.58503,0 -28.19291,11.34326 -31.14246,26.10339c-1.69404,0.54221 -3.32751,1.2195 -4.89209,2.01038l-9.65295,-22.73877l-5.375,-2.6875c0,0 -8.0625,16.125 -18.8125,32.25l10.75,2.6875l-18.8125,24.1875l13.4375,2.6875l-18.8125,24.1875l13.4375,2.6875l-21.5,24.1875c0,0 18.8125,2.6875 37.625,2.6875v21.5h13.4375v-21.5h29.62549c1.14251,0.07963 2.27592,0.08242 3.4696,0.06299l-0.84509,21.43701h16.125l-2.698,-68.33704l26.48657,-21.66797l-2.6875,-5.375l-24.25574,15.43738l-0.87659,-22.18237h-8.0625l-1.50647,38.16565l-19.21668,-10.4823l-2.80823,5.09155l21.55774,17.24304l-0.78735,19.9043c-1.66973,-0.00437 -3.7276,-0.05144 -3.42236,-0.02099c-12.25046,-1.22505 -18.44964,-5.62541 -22.27161,-11.33789c-3.82197,-5.71238 -5.13879,-13.36492 -5.13879,-20.93836c0,-0.63168 0.04361,-1.32773 0.11023,-2.10486l0.17847,-2.06811l-1.25977,-1.6482c-2.76516,-3.62924 -4.40393,-8.08694 -4.40393,-12.99133c0,-10.4874 7.43719,-19.1234 17.28504,-21.08008l3.98401,-0.7926l0.32544,-4.05224c0.88567,-11.08918 10.05653,-19.76257 21.40552,-19.76257c9.04174,0 16.69457,5.54158 19.89905,13.37451l1.10229,2.698l2.86597,0.5459c12.41808,2.36364 21.82019,13.21177 21.82019,26.38159c0,2.23182 -1.5558,6.51577 -3.37512,9.85242c-1.81933,3.33664 -3.61133,5.73718 -3.61133,5.73718l-1.34375,1.78992l0.32544,2.21509c1.09484,7.44655 -0.3334,14.00088 -3.7478,18.5343c-3.4144,4.53342 -8.83144,7.55859 -17.80994,7.55859v10.75c11.61045,0 20.89193,-4.53208 26.39734,-11.8418c5.0242,-6.6708 6.5362,-15.28535 5.74243,-24.08777c0.67673,-0.94248 1.75341,-2.33509 3.48535,-5.51147c2.21193,-4.05667 4.68738,-9.17653 4.68738,-14.99646c0,-17.31045 -11.93058,-31.5976 -27.9248,-35.94006c-5.33257,-10.48343 -15.99697,-17.80994 -28.5127,-17.80994z"
                  /></g
                ></g
              ></svg
            >
          </div>
          <span class=" font-bold text-primary text-3xl"> PickForest </span>
        </div>
        <input
          class="input-bordered input dark:bg-slate-800"
          bind:value={username}
          type="text"
          required
          placeholder="Name"
          name=""
          id=""
        />
        <input
          class=" input-bordered input dark:bg-slate-800"
          required
          on:input={async () => {
            if (subname.length <= 2) {
              subnameok = false;
              return;
            }
            const res = await superagent
              .post(baseurl + "user/avail-username")
              .send({ subname });
            ////console.log(res.body);
            if (res.body.status === "true" || res.body.status === true) {
              subnameok = true;
            } else {
              subnameok = false;
            }
          }}
          bind:value={subname}
          type="text"
          placeholder="Username"
          name=""
          id=""
        />
        {#if subnameok}
          <div class="text-green-500 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>Username Available</div>
          </div>
        {:else}
          <div class="text-red-500 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>Username Not Available</div>
          </div>
        {/if}

        {#if supabase.auth.user().app_metadata.provider === "google"}
          <div />
        {:else}
          <div class="flex flex-col gap-3">
            <img
              class="w-full rounded-2xl object-cover max-h-36"
              src={pfppreview}
              alt=""
            />

            <label
              class="w-full flex gap-3 items-center px-10 py-5 border-2 rounded-2xl"
              for="pfp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Your super cool profile picture</label
            >
          </div>

          <input
            hidden
            bind:files
            type="file"
            accept="image/*"
            name=""
            id="pfp"
          />
          <div class="flex flex-col gap-3 max-w-sm">
            <div class="rounded-2xl">
              <img
                src={coverpreview}
                alt=""
                class="w-full rounded-2xl object-cover max-h-36"
                srcset=""
              />
            </div>
            <label
              for="cover"
              class="w-full flex gap-3 items-center px-10 py-5 border-2 rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Cover picture goes here</label
            >
          </div>
          <input
            hidden
            bind:files={cover}
            type="file"
            accept="image/*"
            name=""
            id="cover"
          />
        {/if}

        <button
          class="btn dark:bg-amber-400"
          disabled={!subnameok}
          type="submit">submit</button
        >
      </form>
    </div>
  {/if}
</div>
