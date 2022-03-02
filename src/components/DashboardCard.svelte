<script>
  import { push } from "svelte-spa-router";
  import { getValue } from "../store";
  export let imageList = [];
  export let bucketID = "";
  export let noOfVotes = 0;
  export let bucketName = "";
</script>

<div
  on:click={() => {
    push("/deets/" + getValue("USERNAME") + "/" + bucketID);
  }}
  class="hover:scale-95 transition-all "
>
  <div class="carousel rounded-box  ">
    {#each imageList as image}
      <div class="carousel-item h-56 relative ">
        <div
          class="w-full absolute bg-yellow-700 opacity-25 h-full  opacity-"
        />
        <img rel="preload" src={image} alt="demoimage" />
      </div>
    {/each}
  </div>
  <div class="text-2xl font-bold mt-2  gap-5 flex items-center justify-between">
    <div class=" flex items-center max-w-md">
      <div>{bucketName}</div>
    </div>
    <div class="text-sm flex items-center gap-1 ">
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
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <div>{noOfVotes}</div>
    </div>
  </div>
</div>
