<script>
  import TreeCard from "../components/TreeCard.svelte";
  import EmojiSelector from "svelte-emoji-selector";
  import NavBar from "../components/NavBar.svelte";
  import Footer from "../components/Footer.svelte";
  import { push } from "svelte-spa-router";
  const userID = localStorage.getItem("userID");
  let isModalOpen = false;
  let data = {
    name: "Danny Boiiii",
    subname: "Ultra cool twitch streamer",
    coverURL:
      "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1",
    pfp: "http://daisyui.com/tailwind-css-component-profile-1@94w.png",
    trees: [
      {
        treeID: "treeid1",
        url: "https://something.com",
        title: "Github",
        emoji: "⭐",
      },
      {
        treeID: "treeid2",
        url: "https://something.com",
        title: "Pronhub",
        emoji: "🍆",
      },
    ],
  };
  let editTree = {};

  function chooseTreeToEdit(treeID) {
    editTree = data.trees.find((x) => x.treeID === treeID);
    isModalOpen = true;
  }
  function onEmoji(event) {
    editTree.emoji = event.detail;
  }
</script>

<input
  bind:checked={isModalOpen}
  type="checkbox"
  id="editTreeModal"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box">
    <form class="flex flex-col gap-5">
      <div class="flex gap-5">
        <p class="text-2xl">{editTree.emoji}</p>
        <div class="p-2 rounded-xl border">
          <EmojiSelector on:emoji={onEmoji} />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Display Title of the link</label>
        <input
          type="text"
          class="p-3 bg-gray-200 rounded-xl"
          placeholder="What's the new title?"
          bind:value={editTree.title}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Display Title of the link</label>
        <input
          type="text"
          class="p-3 monofont bg-gray-200 rounded-xl"
          placeholder="What's the new url?"
          bind:value={editTree.url}
        />
      </div>
    </form>
    <div class="modal-action">
      <label for="editTreeModal" class="btn btn-primary">Accept</label>
      <label for="editTreeModal" class="btn">Close</label>
    </div>
  </div>
</div>

<section class=" h-screen flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
  <NavBar />

  <div class="relative flex-col flex justify-center items-center mt-10 lg:m-10">
    <div class="w-full max-w-screen-lg  rounded-2xl lg:h-72 h-36  bg-primary">
      <img
        src={data.coverURL}
        alt=""
        class="h-full w-full object-cover rounded-2xl contrast-50 brightness-75"
      />
    </div>
    <div class="avatar absolute m-auto lg:-bottom-24 -bottom-20 ">
      <div class="mb-8 lg:w-32 lg:h-32 h-24 w-24 mask mask-squircle shadow-md">
        <img src={data.pfp} alt="profile pic" />
      </div>
    </div>
  </div>

  <div
    class="m-16 lg:mb-10 lg:mt-10  text-center flex justify-center flex-col items-center"
  >
    <div class="font-black text-4xl">{data.name}</div>
    <div class="italic">{data.subname}</div>
  </div>
  <div class="flex flex-col justify-center items-center gap-4">
    <div
      class="p-5  lg:max-w-screen-lg w-full flex flex-col rounded-2xl border"
    >
      <div class="flex items-center">
        <div class="font-bold text-2xl mb-3 mt-2">{data.name}'s Tree</div>
        <div
          class="ml-auto hover:text-yellow-700 hover:bg-yellow-100 p-2 rounded-xl cursor-pointer mb-2 transition flex gap-3 items-center"
        >
          <div
            on:click={() => {
              push("/trees/" + userID);
            }}
          >
            Preview
          </div>
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        {#each data.trees as tree}
          <TreeCard
            profileView={false}
            emoji={tree.emoji}
            url={tree.url}
            title={tree.title}
            treeID={tree.treeID}
            {chooseTreeToEdit}
          />
        {/each}
      </div>
    </div>

    <div class="divider" />
    <div class="divider" />
    <div
      class="text-2xl font-bold  text-left w-full max-w-screen-lg flex items-center gap-5"
    >
      ⚙️
      {data.name}'s Control Room
    </div>
    <div class="p-5  max-w-screen-lg w-full flex flex-col rounded-2xl border">
      <div class="font-bold text-2xl mb-3 mt-2">Change Password</div>
      <form>
        <input
          type="text"
          class="bg-gray-100 w-full p-3 my-2 rounded-xl"
          placeholder="Password"
        />
        <input
          type="text"
          class="bg-gray-100 w-full p-3 my-2 rounded-xl"
          placeholder="New Password"
        />
        <input
          type="text"
          class="bg-gray-100 w-full p-3  my-2 rounded-xl"
          placeholder="New Password Again"
        />
        <div class="btn mt-4">Change Password</div>
      </form>
    </div>

    <div class="p-5  max-w-screen-lg w-full flex flex-col rounded-2xl border">
      <div class="font-bold text-2xl mb-3 mt-2">Change Other Deets</div>
      <form class="flex flex-col gap-5">
        <div>
          <label for="">Display Name</label>
          <input
            type="text"
            class="bg-gray-100 w-full p-3 my-2 rounded-xl"
            placeholder="Password"
          />
        </div>
        <div>
          <label for="">Display Subname</label>
          <input
            type="text"
            class="bg-gray-100 w-full p-3 my-2 rounded-xl"
            placeholder="New Password"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="">Profile Picture</label>
          <input type="file" id="pfp" hidden />
          <div class="flex gap-10 items-center">
            <div class="avatar">
              <div class=" w-24 h-24 mask mask-squircle">
                <img
                  src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                />
              </div>
            </div>
            <label
              for="pfp"
              class="border flex-1 p-5 rounded-2xl text-center font-bold hover:bg-yellow-100  hover:text-yellow-700 hover:border-yellow-100 transition-all"
              >Choose your next Awesome PFP</label
            >
          </div>
        </div>
        <div class="btn w-fit mt-4">💾 Save</div>
      </form>
    </div>

    <div class="divider" />
    <div class="max-w-screen-lg w-full">
      <Footer />
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
  .monofont {
    font-family: "Roboto Mono", monospace;
  }
  .h-fit {
    height: fit-content;
  }
  .w-fit {
    width: fit-content;
  }
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
  .linkfont {
    font-family: "Inter", sans-serif;
  }
</style>
