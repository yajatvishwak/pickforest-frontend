<script>
  import { onMount } from "svelte";
  import { darkmode } from "../darkmode";
  export let params = {};
  import CountDown from "../components/CountDown.svelte";
  import ImageCard from "../components/ImageCard.svelte";
  import NavBar from "../components/NavBar.svelte";
  import superagent from "superagent";
  import { getValue } from "../store";
  import { fade } from "svelte/transition";
  import Toastify from "toastify-js";

  let baseurl = __api.env.SVELTE_APP_BASE_URL;
  let sharableopen = false;
  const bucketID = params.bucketid;
  //console.log(userID, bucketID);
  let data = {};
  let loading = true;
  onMount(async () => {
    await fillData();
    console.log(data);
    loading = false;
  });

  async function fillData() {
    const res = await superagent
      .post(baseurl + "bucket/get")
      .send({ token: getValue("JWT"), bucketID: bucketID });
    console.log(res.body);
    const freshdatafromserver = {
      bucketID: res.body.bucketID,
      userID: res.body.userID,
      adminPFP: res.body.adminPFP,
      isAdmin: res.body.isAdmin,
      bucketName: res.body.bucketName,
      userName: res.body.name,
      targetDate: res.body.expiryAt,
      winnerImage: res.body.winnerImage, // imageID
      imageCardDetails: res.body.imageCardDetails,
      // imageCardDetails: [
      //   {
      //     imageID: "imag1",
      //     imgURL: "https://picsum.photos/400",
      //     votes: {
      //       upvotes: 50,
      //       downvotes: 30,
      //     },
      //     reactions: {
      //       confetti: 0,
      //       wow: 0,
      //       heart: 0,
      //       dislike: 0,
      //     },
      //     voted: "notvoted",
      //     reacted: "notreacted",
      //   },
      //   {
      //     imageID: "imag2",
      //     imgURL: "https://picsum.photos/400",
      //     votes: {
      //       upvotes: 20,
      //       downvotes: 30,
      //     },
      //     reactions: {
      //       confetti: 0,
      //       wow: 0,
      //       heart: 0,
      //       dislike: 0,
      //     },
      //     voted: "notvoted",
      //     reacted: "notreacted",
      //   },
      //   {
      //     imageID: "imag3",
      //     imgURL: "https://picsum.photos/400",
      //     votes: {
      //       upvotes: 20,
      //       downvotes: 30,
      //     },
      //     reactions: {
      //       confetti: 0,
      //       wow: 0,
      //       heart: 0,
      //       dislike: 0,
      //     },
      //     voted: "notvoted",
      //     reacted: "notreacted",
      //   },
      // ],
    };
    data = freshdatafromserver;
    console.log(data.imageCardDetails);
  }
  function upvote(imageID) {
    //console.log(imageID);
    let item = data.imageCardDetails.find((x) => x.imageID === imageID);

    if (item.voted === "notvoted") {
      item.votes.upvotes += 1;
      item.voted = "upvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      // update on server
      superagent
        .post(baseurl + "bucket/select-upvote")
        .send({ imageID, bucketID })
        .then((res) => {
          console.log(res.body);
        });
      //select upvote
    } else if (item.voted === "downvoted") {
      item.votes.upvotes += 1;
      item.votes.downvotes -= 1;
      item.voted = "upvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      //select upvote
      //unselectdownvote
      superagent
        .post(baseurl + "bucket/usdown-sup")
        .send({ imageID, bucketID })
        .then((res) => {
          console.log(res.body);
        });
      // update on server
    } else {
      item.votes.upvotes -= 1;
      item.voted = "notvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      //unselect
      superagent
        .post(baseurl + "bucket/unselect-upvote")
        .send({ imageID, bucketID })
        .then((res) => {
          console.log(res.body);
        });
      //alert("Already voted, stop pressing random buttons you moron");
    }
    console.log(data.imageCardDetails);
  }
  function downvote(imageID) {
    //console.log(imageID);
    let item = data.imageCardDetails.find((x) => x.imageID === imageID);
    if (item.voted === "notvoted") {
      item.votes.downvotes += 1;
      item.voted = "downvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      //select downvote
      superagent
        .post(baseurl + "bucket/select-downvote")
        .send({ imageID, bucketID })
        .then((res) => {
          console.log(res.body);
        });
      // update on server
    } else if (item.voted === "upvoted") {
      item.votes.upvotes -= 1;
      item.votes.downvotes += 1;
      item.voted = "downvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      // update on server
      superagent
        .post(baseurl + "bucket/usup-sdown")
        .send({ imageID, bucketID })
        .then((res) => {
          console.log(res.body);
        });
    } else {
      item.votes.downvotes -= 1;
      item.voted = "notvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      //unselect downvote
      superagent
        .post(baseurl + "bucket/unselect-downvote")
        .send({ imageID, bucketID })
        .then((res) => {
          console.log(res.body);
        });
      //alert("Already voted, stop pressing random buttons you moron");
    }
  }
  async function updateSelectedReaction(imageID, reaction) {
    let item = data.imageCardDetails.find((x) => x.imageID === imageID);
    if (item.reacted === "notreacted") {
      item.reactions[reaction]++;
      item.reacted = reaction;
      data.imageCardDetails = [...data.imageCardDetails];
      //send to server
      await superagent
        .post(baseurl + "bucket/select-reaction")
        .send({ imageID, bucketID, reaction });
    } else {
      await superagent
        .post(baseurl + "bucket/both-reaction")
        .send({ imageID, bucketID, reaction, unreaction: item.reacted });
      item.reactions[item.reacted]--;
      item.reactions[reaction]++;
      item.reacted = reaction;
      data.imageCardDetails = [...data.imageCardDetails];
      // send to server
    }
    console.log("updating", data.imageCardDetails);
  }
  async function clearSelectedReaction(imageID) {
    let item = data.imageCardDetails.find((x) => x.imageID === imageID);
    item.reactions[item.reacted]--;
    item.reacted = "notreacted";
    data.imageCardDetails = [...data.imageCardDetails];
    // send to server
    await superagent
      .post(baseurl + "bucket/unselect-reaction")
      .send({ imageID, bucketID, reaction: item.reacted });

    console.log("clearing", data.imageCardDetails);
  }
</script>

<section class=" h-full  w-full flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
  {#if getValue("JWT") === undefined || getValue("JWT") === null}
    <div
      class="flex items-center gap-3 mt-4  py-4 justify-between rounded-2  xl"
    >
      <div class="flex items-center gap-3">
        <img src="asset/logo.svg" class="" alt="" srcset="" />
        <div
          on:click={() =>
            (window.location.href = "https://pickforest-landing.vercel.app")}
          class="text-xl font-bold"
        >
          PickForest
        </div>
      </div>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="flex  gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <div>
          <input type="checkbox" class="toggle" bind:checked={$darkmode} />
        </div>
      </a>
    </div>
  {:else}
    <NavBar />
  {/if}

  <div class="mx-auto">
    <div class="flex  justify-between md:items-center lg:flex-row flex-col ">
      <div>
        <div class="text-4xl mt-10 font-bold">{data.bucketName}</div>
        <div class="flex items-center gap-5 mt-3 ">
          <div class="avatar">
            <div class=" w-10 h-10 mask mask-squircle">
              <img alt="pp" src={baseurl + "photos/getpfp/" + data.adminPFP} />
            </div>
          </div>
          <div class="opacity-70 newfont text-xl">by {data.userName}</div>
        </div>
      </div>
      <div class="mt-6 flex flex-col gap-3 ">
        <div class="flex gap-3  ">
          <CountDown targetDate={new Date(data.targetDate)} />
        </div>
      </div>
    </div>
    {#if getValue("JWT") === null || getValue("JWT") === undefined}
      <div />
    {:else}
      <div class="flex">
        <div
          on:click={() => (sharableopen = !sharableopen)}
          class="my-5 p-4 w-full max-w-xl  flex flex-col bg-amber-100 dark:bg-slate-800 rounded-box"
        >
          <div class="flex items-center justify-between">
            <div class="font-bold">Shareable link</div>
            <div class="font-bold">
              {#if sharableopen}
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
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              {:else}
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              {/if}
            </div>
          </div>
          {#if sharableopen}
            <div class="flex items-center  ">
              <div in:fade class="mt-3 p-3 mono">
                {window.location.href}
              </div>
              <div
                on:click={() => {
                  Toastify({
                    text: "Copied to clipboard",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                  }).showToast();
                  navigator.clipboard.writeText(window.location.href);
                }}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}

    <div class="grid mt-10 lg:grid-cols-3 gap-10">
      {#if loading === true}
        loading...
      {:else}
        {#each data.imageCardDetails as ImageCardDetail}
          <ImageCard
            isWinner={data.winnerImage === ImageCardDetail.imageID}
            imgURL={ImageCardDetail.imgURL}
            reaction={ImageCardDetail.reactions}
            votes={ImageCardDetail.votes}
            imageID={ImageCardDetail.imageID}
            isAdmin={data.isAdmin}
            voted={ImageCardDetail.voted}
            bind:reactionID={ImageCardDetail.reacted}
            {upvote}
            {downvote}
            {updateSelectedReaction}
            {clearSelectedReaction}
          />
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
  .mono {
    font-family: "Space Mono", monospace;
    word-break: break-all;
  }

  .newfont {
    font-family: "Harmattan", sans-serif;
  }
</style>
