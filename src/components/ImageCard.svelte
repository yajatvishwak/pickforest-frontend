<script>
  import ReactionBar from "./ReactionBar.svelte";

  import { location } from "svelte-spa-router";
  const userID = $location.split("/")[1];
  const bucketID = $location.split("/")[2];
  console.log(bucketID, userID);
  const isAdmin = true;
  let isReactionDrawerOpen = false;
  export let imgURL = "";
</script>

{#if isAdmin}
  <div class="relative">
    <div class="max-w-lg">
      <div
        on:click={() => {
          window.location.href = imgURL;
        }}
        class="absolute right-4 top-4 p-1  hover:bg-black opacity-40  hover:text-primary transition-all   rounded-xl "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-auto  transition-all  modal-button"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>

      <div class="overflow-x-auto flex rounded-xl snap">
        <div class="flex-none w-full snapChild">
          <img
            class={`h-96 w-full shadow-lg object-cover  `}
            src={imgURL}
            alt="dff"
          />
        </div>
        <div class="flex-none w-full snapChild bg-indigo-100">
          <div class="flex  flex-col w-full h-full justify-center items-center">
            <div class="">
              <lord-icon
                src="https://cdn.lordicon.com/lupuorrc.json"
                trigger="hover"
                colors="primary:#121331,secondary:#121331"
                class=" w-14 h-14 lg:w-20 lg:h-20"
              />
            </div>
            <div class="text-lg">10 votes</div>
          </div>
        </div>
        <div class="flex-none w-full snapChild bg-yellow-100">
          <div class="flex flex-col w-full h-full justify-center items-center">
            <div class="">
              <lord-icon
                src="https://cdn.lordicon.com/dzllstvg.json"
                trigger="hover"
                colors="primary:#121331,secondary:#121331"
                class=" w-14 h-14 lg:w-20 lg:h-20"
              />
            </div>
            <div class="text-lg">10 votes</div>
          </div>
        </div>
        <div class="flex-none w-full snapChild bg-red-100">
          <div class="flex flex-col w-full h-full justify-center items-center">
            <div class="">
              <lord-icon
                src="https://cdn.lordicon.com/rjzlnunf.json"
                trigger="hover"
                colors="primary:#121331,secondary:#121331"
                class=" w-14 h-14 lg:w-20 lg:h-20"
              />
            </div>
            <div class="text-lg">10 votes</div>
          </div>
        </div>
        <div class="flex-none w-full snapChild bg-gray-100">
          <div class="flex flex-col h-full justify-center items-center">
            <div class="">
              <lord-icon
                src="https://cdn.lordicon.com/hrqwmuhr.json"
                trigger="hover"
                colors="primary:#121331,secondary:#121331"
                class=" w-14 h-14 lg:w-20 lg:h-20"
              />
            </div>

            <div class="text-lg">10 votes</div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="">
    <div class="relative">
      <div class="max-w-lg">
        <div
          on:click={() => {
            window.location.href = imgURL;
          }}
          class="absolute right-4 top-4 p-1  hover:bg-black opacity-40  hover:text-primary transition-all   rounded-xl "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-auto  transition-all  modal-button"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </div>
        <img
          class={`rounded-xl h-96 shadow-lg w-full object-cover`}
          src={imgURL}
          alt="dff"
        />
      </div>
    </div>

    <div class="flex gap-3 mt-2 mb-4">
      <div
        class="flex items-center hover:text-green-500  transition-all cursor-pointer"
      >
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
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
        <div>40</div>
      </div>

      <div
        class="flex items-center hover:text-red-500  transition-all cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 rotate-180 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
        <div>40</div>
      </div>
      <div
        on:click={() => (isReactionDrawerOpen = !isReactionDrawerOpen)}
        class="ml-auto hover:text-primary transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    {#if isReactionDrawerOpen}
      <ReactionBar />
    {/if}
  </div>
{/if}

<style>
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
  .w-400 {
    width: 400px;
  }
  .snap {
    scroll-snap-type: x mandatory;
  }
  .snapChild {
    scroll-snap-align: start;
  }
</style>
