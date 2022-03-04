<script>
  export let url = "";
  export let title = "";
  export let emoji = "";
  export let treeID = "";
  export let profileView;
  export let chooseTreeToEdit = () => {};
  export let deleteTree = () => {};

  //console.log("Tree111");
</script>

<div
  on:click={() => {
    if (profileView) window.location.href = url;
  }}
  class="bg-gray-100 dark:bg-slate-700 hover:bg-yellow-100 transition w-full p-3 rounded-2xl flex items-center cursor-pointer "
>
  <div
    class={`flex justify-center items-center ${
      profileView ? "w-full" : ""
    }   gap-2`}
  >
    <div
      class="text-lg md:text-xl   lg:text-2xl   transition-all cursor-pointer rounded-lg lg:p-3 py-4"
    >
      {emoji}
    </div>
    <div class="md:text-xl text-lg truncate bro linkfont font-medium">
      {title}
    </div>
  </div>

  {#if !profileView}
    <div
      class="hidden md:text-xl md:block lg:text-2xl mx-2 linkfont font-medium"
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
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
    <div
      on:click={() => {
        window.location.href = url;
      }}
      class=" hidden md:block monofont truncate hover:underline cursor-pointer"
    >
      {url}
    </div>
    <div class="dropdown  dropdown-end  ml-auto">
      <div tabindex="0" class="m-1 btn">Edit</div>
      <ul
        tabindex="0"
        class="p-2 shadow menu dropdown-content bg-base-100  dark:bg-slate-800 rounded-box w-52"
      >
        <li class="">
          <a
            href=""
            on:click={(e) => {
              e.preventDefault();
              chooseTreeToEdit(treeID);
            }}
            class="hover:bg-yellow-100  font-bold fontinter hover:text-yellow-500 transition-all flex gap-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <div>Edit</div>
          </a>
        </li>
        <li on:click={() => deleteTree(treeID)} class="">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="hover:bg-red-300 hover:text-red-500 font-bold fontinter transition-all flex gap-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>

            <div>Delete</div></a
          >
        </li>
      </ul>
    </div>
  {/if}
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
  .bro {
    max-width: 10em;
  }
  .monofont {
    font-family: "Roboto Mono", monospace;
  }
  .h-fit {
    height: fit-content;
  }
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
  .linkfont {
    font-family: "Inter", sans-serif;
  }
</style>
