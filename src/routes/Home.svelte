<script>
  import DashboardCard from "../components/DashboardCard.svelte";
  import NavBar from "../components/NavBar.svelte";
  import greetingTime from "greeting-time";
  import OnboardingSlideShow from "./OnboardingSlideShow.svelte";
  import JSConfetti from "js-confetti";
  import { getValue, setValue } from "../store";
  import { onMount } from "svelte";
  import superagent from "superagent";
  const jsConfetti = new JSConfetti();
  let onboarding = JSON.parse(getValue("ONBOARDING"));
  let baseurl = __api.env.SVELTE_APP_BASE_URL;

  const emojis = ["🚀", "⚡", "✨"];
  let loading = false;
  let data = { bucketDetails: [] };
  onMount(async () => {
    const res = await superagent
      .get(baseurl + "bucket/home")
      .set("token", getValue("JWT"));
    //console.log("thios is home", res.body);
    data = {
      bucketDetails: res.body,
      // bucketDetails: [
      //   {
      //     bucketID: "goXeZYfeTxgR2yJPvJUjt",
      //     bucketName: "Super Awesome Bucket of yajat vishwakarma",
      //     imageList: [
      //       "asset/1.png",
      //       "asset/2.png",
      //       "asset/3.png",
      //       "asset/3.png",
      //       "asset/3.png",
      //     ],
      //     votesOnBucket: 23,
      //   },
      // ],
    };
  });
  // let data = {
  //   bucketDetails: [
  //     {
  //       bucketID: "goXeZYfeTxgR2yJPvJUjt",
  //       bucketName: "Super Awesome Bucket of yajat vishwakarma",
  //       imageList: [
  //         "asset/1.png",
  //         "asset/2.png",
  //         "asset/3.png",
  //         "asset/3.png",
  //         "asset/3.png",
  //       ],
  //       votesOnBucket: 23,
  //     },
  //   ],
  // };
</script>

<input
  type="checkbox"
  checked={onboarding}
  id="my-modal3"
  class="modal-toggle"
/>
<div class="modal ">
  <div class="modal-box dark:bg-slate-700  ">
    <div class="h-1/2 md:h-1/3 rounded">
      <OnboardingSlideShow />
    </div>
    <div class="modal-action ">
      <label
        on:click={() => {
          setValue("ONBOARDING", false);
          jsConfetti.addConfetti();
        }}
        for="my-modal3"
        class="btn mt-5">Yay! Got it!</label
      >
    </div>
  </div>
</div>

<section
  class="h-full w-full flex  flex-col p-5 pt-2.5 lg:p-10 lg:pt-5 mx-auto "
>
  <NavBar />
  <div class="mx-auto  w-full max-w-screen-xl">
    <div class="text-4xl mt-10">
      {greetingTime(new Date())}
      <span class="font-bold ">{getValue("USERNAME")}</span>
      {emojis[parseInt(Math.random() * emojis.length)]}
    </div>
    <div class="mt-10 mb-4 text-2xl max-w-screen-lgfont-bold ">
      Your Buckets
    </div>
  </div>
  <div class="flex justify-center items-center">
    <div class="grid lg:grid-cols-2 max-w-screen-xl  flex-1  gap-10 ">
      {#each data.bucketDetails as bucket}
        <DashboardCard
          bucketID={bucket.bucketID}
          imageList={bucket.imageList}
          noOfVotes={bucket.votesOnBucket}
          bucketName={bucket.bucketName}
        />
      {/each}
      <label
        for="my-modal-2"
        class="w-full flex-1  modal-button hover:scale-95 transition-all rounded-box font-bold dark:bg-slate-800 bg-gray-100 h-56 flex  flex-col justify-center items-center"
      >
        <div class="dark:block hidden">
          <lord-icon
            src="https://cdn.lordicon.com/mecwbjnp.json"
            trigger="hover"
            colors="primary:#ffffff,secondary:#ffffff"
            style="width:100px;height:100px"
          />
        </div>
        <div class="dark:hidden">
          <lord-icon
            src="https://cdn.lordicon.com/mecwbjnp.json"
            trigger="hover"
            colors="primary:#121331,secondary:#000000"
            style="width:100px;height:100px"
          />
        </div>
        <div>Add Bucket</div>
      </label>
      <label
        for="my-modal3"
        class="w-full flex-1 hover:scale-95 modal-button transition-all rounded-box font-bold dark:bg-slate-800 bg-gray-100 h-56 flex flex-col justify-center items-center"
      >
        <div class="dark:block hidden">
          <lord-icon
            src="https://cdn.lordicon.com/dxjqoygy.json"
            trigger="hover"
            colors="primary:#ffffff,secondary:#ffffff"
            style="width:100px;height:100px"
          />
        </div>
        <div class="dark:hidden">
          <lord-icon
            src="https://cdn.lordicon.com/dxjqoygy.json"
            trigger="hover"
            colors="primary:#121331,secondary:#000000"
            style="width:100px;height:100px"
          />
        </div>
        <div>New here?</div>
      </label>
    </div>
  </div>
</section>

<style>
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
</style>
