<script>
  import superagent from "superagent";
  import ReactionBar from "./ReactionBar.svelte";
  import Skeleton from "./Skeleton.svelte";
  export let isAdmin = true; // server verifies
  let isReactionDrawerOpen = false;
  export let isWinner = false;
  export let imgURL = "https://picsum.photos/400";
  export let reaction = {};
  export let imageID = "";
  export let reactionID = "";
  export let votes = { upvotes: 0, downvotes: 0 };
  export let upvote = () => {};
  export let downvote = () => {};
  export let voted = "";
  export let updateSelectedReaction = () => {};
  export let clearSelectedReaction = () => {};
  let loading = true;
  let baseurl = __api.env.SVELTE_APP_BASE_URL;
  $: imgURL = baseurl + "photos/getimg/" + imgURL;
  console.log("logging from image card", reactionID);

  let reactionElements = [
    "https://cdn.lordicon.com/lupuorrc.json",

    "https://cdn.lordicon.com/dzllstvg.json",

    "https://cdn.lordicon.com/rjzlnunf.json",

    "https://cdn.lordicon.com/hrqwmuhr.json",
  ];
  let reactionback = [
    "bg-indigo-100",
    "bg-yellow-100",
    "bg-red-100",
    "bg-gray-100",
  ];
</script>

{#if loading}
  <div
    class="h-96 w-96 max-h-72 max-w-72 rounded-2xl gap-3 dark:bg-slate-700 flex items-center justify-center"
  >
    <Skeleton />
    <div class="mt-3">loading, have some tea</div>
    <img
      rel="preload"
      class="hidden"
      on:load={() => {
        loading = false;
      }}
      src={imgURL}
      alt=""
      srcset=""
    />
  </div>
{:else if isAdmin}
  <div class="relative ">
    <div class="max-w-lg">
      <div
        on:click={() => {
          window.location.href = imgURL;
        }}
        class="absolute right-4 top-4 p-1 bg-gray-800  hover:bg-black text-white hover:text-primary transition-all   rounded-xl "
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
      {#if isWinner}
        <div data-tip="Winner Image!" class="tooltip left-16">
          <div
            class="absolute top-4 bg-gray-800 backdrop-opacity-30 -left-12 p-2  rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="yellow"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        </div>
      {/if}
      <div class="overflow-x-auto shadow-2xl flex rounded-xl snap">
        <div class="flex-none  w-full min-w-0 snapChild">
          <img
            rel="preload"
            class={`h-96 w-full object-cover  `}
            src={imgURL}
            alt="dff"
          />
        </div>
        {#each Object.keys(reaction) as r, index}
          <div
            class={`flex-none flex w-full ${reactionback[index]}  snapChild`}
          >
            <div class="flex items-center justify-center flex-col  w-full ">
              <lord-icon
                src={reactionElements[index]}
                trigger="hover"
                colors="primary:#121331,secondary:#121331"
                class=" w-14 h-14 lg:w-20 lg:h-20"
              />
              <div class="text-black">{reaction[r]} reactions</div>
            </div>
          </div>
        {/each}
      </div>

      <div class="flex gap-3 mt-2 mb-4">
        <div
          class={`flex items-center hover:text-green-500 ${
            voted === "upvoted" ? "text-green-500" : ""
          }  transition-all `}
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
          <div>{votes.upvotes}</div>
        </div>

        <div
          class={`flex items-center hover:text-red-500 ${
            voted === "downvoted" ? "text-red-500" : ""
          }  transition-all `}
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
          <div>{votes.downvotes}</div>
        </div>
        <div
          class={votes.upvotes - votes.downvotes >= 0
            ? "ml-auto text-green-400 font-bold flex items-center gap-3"
            : "ml-auto text-red-400 font-bold flex items-center gap-3"}
        >
          {#if votes.upvotes - votes.downvotes < 0}
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
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          {:else}
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          {/if}
          {votes.upvotes - votes.downvotes}
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
        {#if isWinner}
          <div data-tip="Winner Image!" class="tooltip left-16">
            <div
              class="absolute top-4 bg-gray-800 backdrop-opacity-30 -left-12 p-2  rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="yellow"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>
        {/if}
        <img
          rel="preload"
          class={`rounded-xl h-96 shadow-lg w-full object-cover`}
          src={imgURL}
          alt="dff"
        />
      </div>
    </div>

    <div class="flex gap-3 mt-2 mb-4">
      <div
        on:click={() => upvote(imageID)}
        class={`flex items-center hover:text-green-500 ${
          voted === "upvoted" ? "text-green-500" : ""
        }  transition-all cursor-pointer`}
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
        <div>{votes.upvotes}</div>
      </div>

      <div
        on:click={() => downvote(imageID)}
        class={`flex items-center hover:text-red-500 ${
          voted === "downvoted" ? "text-red-500" : ""
        }  transition-all cursor-pointer`}
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
        <div>{votes.downvotes}</div>
      </div>
      <div
        on:click={() => (isReactionDrawerOpen = !isReactionDrawerOpen)}
        class={`ml-auto hover:text-primary ${
          isReactionDrawerOpen ? "text-primary" : ""
        } transition-all`}
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
      <ReactionBar
        {updateSelectedReaction}
        {imageID}
        {reactionID}
        {clearSelectedReaction}
      />
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
  .loader {
    border: 16px solid #b1a500; /* Light grey */
    border-top: 16px solid #ffde21; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1.5s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
