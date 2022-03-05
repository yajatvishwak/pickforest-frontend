<script>
  import TreeCard from "../components/TreeCard.svelte";
  import EmojiSelector from "svelte-emoji-selector";
  import NavBar from "../components/NavBar.svelte";
  import Footer from "../components/Footer.svelte";
  import superagent from "superagent";
  import { push } from "svelte-spa-router";
  import { darkmode } from "../darkmode";
  import Toastify from "toastify-js";
  import { getValue, setValue } from "../store";
  import { onMount } from "svelte";

  const userID = localStorage.getItem("userID");
  let isModalOpen = false;
  let isAddModalOpen = false;
  let baseurl = __api.env.SVELTE_APP_BASE_URL;
  let loading = true;
  let data = {
    name: "",
    subname: "",
    coverURL:
      "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1",
    pfp: "http://daisyui.com/tailwind-css-component-profile-1@94w.png",
    trees: [],
  };

  let cover = null;
  let pfp = null;

  onMount(async () => {
    await fill();
    loading = false;
  });
  async function fill() {
    loading = true;
    const res = await superagent
      .get(baseurl + "user/get/" + getValue("USERID"))
      .set("token", getValue("JWT"));
    //console.log(res.body);
    data = {
      name: res.body.name,
      subname: res.body.subname || "",
      coverURL: baseurl + "photos/getpfp/" + res.body.coverURL,
      pfp: baseurl + "photos/getpfp/" + res.body.pfp,
      trees: res.body.trees,
    };
    loading = false;
  }

  let editTree = {
    url: "",
    emoji: "",
    title: "",
    treeID: "",
  };
  let addTree = {
    treeEmoji: "",
    treeName: "",
    treeLink: "",
  };
  async function save() {
    let fd = new FormData();

    if (cover !== null) fd.append("cover", cover[0]);
    if (pfp !== null) fd.append("pfp", pfp[0]);
    if (data.name === null || data.name.length === 0)
      return Toastify({
        text: "Something went wrong. Oops",
        duration: 3000,
      }).showToast();
    fd.append("username", data.name);

    const res = await superagent
      .post(baseurl + "user/update-deets")
      .set({ token: getValue("JWT") })
      .send(fd);

    if (res.body.status === "success") {
      setValue("PFP_LINK", res.body.message.pfp);
      Toastify({
        text: "Updated Successfully 🔥",
        duration: 3000,
      }).showToast();
    }
  }

  function chooseTreeToEdit(treeID) {
    editTree = data.trees.find((x) => x.treeID === treeID);
    isModalOpen = true;
  }
  async function deleteTree(treeID) {
    //
    const res = await superagent
      .post(baseurl + "user/delete-tree")
      .send({ treeID, token: getValue("JWT") });
    Toastify({
      text: "Tree deleted 🗑️",
      duration: 3000,
    }).showToast();
    await fill();
  }
  function onEmoji(event) {
    editTree.emoji = event.detail;
  }
  function onAddEmoji(event) {
    addTree.treeEmoji = event.detail;
  }
  function handleBanner(e) {
    let image = e.target.files[0];
    ////console.log(image);
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      data = { ...data, coverURL: e.target.result };
      ////console.log(previewImage);
    };
  }
  function handleProfile(e) {
    let image = e.target.files[0];
    ////console.log(image);
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      data = { ...data, pfp: e.target.result };
      ////console.log(previewImage);
    };
  }
  async function createTree() {
    //add validation
    if (
      addTree.treeEmoji === "" ||
      addTree.treeLink === "" ||
      addTree.treeName === ""
    )
      return Toastify({
        text: "Fill in All the details please (Emoji, Name, Link)",
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

    const res = await superagent.post(baseurl + "user/create-tree").send({
      url: addTree.treeLink,
      title: addTree.treeName,
      emoji: addTree.treeEmoji,
      token: getValue("JWT"),
    });
    ////console.log(res.body);
    if (res.body.status === "success") {
      addTree = {
        treeEmoji: "",
        treeName: "",
        treeLink: "",
      };
      isAddModalOpen = false;
      await fill();
      Toastify({
        text: "Tree Created! 🔥",
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
    }
  }
  async function editTreeOnServer() {
    //add validation
    if (editTree.emoji === "" || editTree.title === "" || editTree.url === "")
      return Toastify({
        text: "Fill in All the details please (Emoji, Name, Link)",
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

    const res = await superagent.post(baseurl + "user/update-tree").send({
      emoji: editTree.emoji,
      title: editTree.title,
      url: editTree.url,
      treeID: editTree.treeID,
      token: getValue("JWT"),
    });
    //console.log(res.body);
    if (res.body.status === "success") {
      editTree = {
        url: "",
        emoji: "",
        title: "",
      };
      isModalOpen = false;
      await fill();
      Toastify({
        text: "Tree Edited! 🔥",
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
    }
  }
</script>

<!-- ADD MODAL -->
<input
  type="checkbox"
  bind:checked={isAddModalOpen}
  id="addTreeModal"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box dark:bg-slate-700">
    <div class="text-2xl font-bold">🌳 Add Tree</div>
    <form class="flex flex-col gap-5 mt-4">
      <div class="flex gap-5 items-center justify-between">
        <div class="flex items-center gap-3">
          <label for="">Choose emoji</label>
          <div class="p-2 rounded-xl border">
            <EmojiSelector on:emoji={onAddEmoji} />
          </div>
        </div>
        {#if addTree.treeEmoji === ""}
          <div>No emoji selected</div>
        {/if}
        <p class="text-2xl">{addTree.treeEmoji}</p>
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Display Title of the link</label>
        <input
          type="text"
          class="p-3 bg-gray-200 dark:bg-slate-600 rounded-xl"
          placeholder="What's the title?"
          bind:value={addTree.treeName}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Display Title of the link</label>
        <input
          type="text"
          class="p-3 monofont bg-gray-200 dark:bg-slate-600 rounded-xl"
          placeholder="What's the url?"
          bind:value={addTree.treeLink}
        />
      </div>
    </form>

    <div class="modal-action">
      <label on:click={createTree} for="addTreeModal" class="btn btn-primary"
        >Accept</label
      >
      <label for="addTreeModal" class="btn">Close</label>
    </div>
  </div>
</div>

<!-- EDIT MODAL -->
<input
  bind:checked={isModalOpen}
  type="checkbox"
  id="editTreeModal"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box dark:bg-slate-700">
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
          class="p-3 bg-gray-200 dark:bg-slate-600 rounded-xl"
          placeholder="What's the new title?"
          bind:value={editTree.title}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Display Title of the link</label>
        <input
          type="text"
          class="p-3 monofont bg-gray-200 dark:bg-slate-600 rounded-xl"
          placeholder="What's the new url?"
          bind:value={editTree.url}
        />
      </div>
    </form>
    <div class="modal-action">
      <label
        for="editTreeModal"
        on:click={editTreeOnServer}
        class="btn btn-primary">Accept</label
      >
      <label for="editTreeModal" class="btn">Close</label>
    </div>
  </div>
</div>

<!-- SECTION -->

<section class=" h-full flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
  <NavBar />

  {#if loading}
    loading...
  {:else}
    <div
      class="relative flex-col flex justify-center items-center mt-10 lg:m-10"
    >
      <div class="w-full max-w-screen-lg  rounded-2xl lg:h-72 h-36  bg-primary">
        <img
          src={data.coverURL}
          alt=""
          class="h-full w-full object-cover rounded-2xl contrast-50 brightness-75"
        />
      </div>
      <div class="avatar absolute m-auto lg:-bottom-24 -bottom-20 ">
        <div
          class="mb-8 lg:w-32 lg:h-32 h-24 w-24 mask mask-squircle shadow-md"
        >
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
        class="p-5  lg:max-w-screen-lg w-full flex flex-col rounded-2xl border dark:border-slate-500 "
      >
        <div class="flex items-center">
          <div class="font-bold text-2xl mb-3 mt-2">{data.name}'s Tree</div>
          <div
            on:click={() => {
              push("/trees/" + getValue("SUBNAME"));
            }}
            class="ml-auto hover:text-yellow-700 hover:bg-yellow-100 p-2 rounded-xl cursor-pointer mb-2 transition flex gap-3 items-center"
          >
            <div>Preview</div>
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
              {deleteTree}
            />
          {/each}
          <div
            on:click={() => (isAddModalOpen = true)}
            class="bg-yellow-100 cursor-pointer hover:bg-yellow-100 dark:hover:bg-slate-800 transition-all dark:bg-slate-700 p-6 rounded-xl"
          >
            <div class="text-center font-bold">Add Tree</div>
          </div>
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
      <div
        class="p-5  max-w-screen-lg w-full flex flex-col rounded-2xl border dark:border-slate-500"
      >
        <div class="font-bold text-2xl mb-3 mt-2">
          {$darkmode
            ? "Dark Mode - activated - xtreme eye protecc 😎"
            : "Dark Mode - protecc eyes 👀 "}
        </div>
        <input type="checkbox" class="toggle" bind:checked={$darkmode} />
      </div>

      <!-- <div
    class="p-5  max-w-screen-lg w-full flex flex-col rounded-2xl border dark:border-slate-500"
  >
    <div class="font-bold text-2xl mb-3 mt-2">Change Password</div>
    <form>
      <div>
        <label for="">Current Password</label>
        <input
          type="text"
          class="bg-gray-100 dark:bg-slate-800 w-full p-3 my-2 rounded-xl"
          placeholder="ultrasafepassword"
        />
      </div>
      <div>
        <label for="">New Password</label>
        <input
          type="text"
          class="bg-gray-100 dark:bg-slate-800 w-full p-3 my-2 rounded-xl"
          placeholder="ultrasafepasswordagain"
        />
      </div>
      <div class="btn mt-4 dark:bg-yellow-200 dark:text-black">
        Change Password
      </div>
    </form>
  </div> -->

      <div
        class="p-5  max-w-screen-lg w-full flex flex-col rounded-2xl border dark:border-slate-500"
      >
        <div class="font-bold text-2xl mb-3 mt-2">Change Other Deets</div>
        <form class="flex flex-col gap-5">
          <div>
            <label for="">Display Name</label>
            <input
              type="text"
              bind:value={data.name}
              class="bg-gray-100 dark:bg-slate-800 w-full  p-3 my-2 rounded-xl"
              placeholder={data.name}
            />
          </div>
          <!-- <div>
            <label for="">Display Subname</label>
            <input
              type="text"
              bind:value={newUser}
              class="bg-gray-100 dark:bg-slate-800 w-full p-3 my-2 rounded-xl"
              placeholder={data.subname}
            />
          </div> -->
          <div class="flex flex-col gap-2">
            <label for="">Profile Picture</label>
            <input
              bind:files={pfp}
              on:change={handleProfile}
              accept="image/*"
              type="file"
              id="pfp"
              hidden
            />
            <div class="flex gap-10 items-center">
              <div class="avatar">
                <div class=" w-24 h-24 mask mask-squircle">
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <img src={data.pfp} />
                </div>
              </div>
              <label
                for="pfp"
                class="border flex-1 p-5 rounded-2xl text-center font-bold hover:bg-yellow-100  hover:text-yellow-700 hover:border-yellow-100 transition-all"
                >Choose your next Awesome PFP</label
              >
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="">Banner Picture</label>
            <input
              on:change={handleBanner}
              bind:files={cover}
              accept="image/*"
              type="file"
              id="banner"
              hidden
            />
            <div class="flex gap-5 items-center flex-col">
              <div
                class="w-full max-w-screen-lg  rounded-2xl lg:h-72 h-36  bg-primary"
              >
                <img
                  src={data.coverURL}
                  alt=""
                  class="h-full w-full object-cover rounded-2xl contrast-50 brightness-75"
                />
              </div>
              <label
                for="banner"
                class="border flex-1 p-5 w-full rounded-2xl text-center font-bold hover:bg-yellow-100  hover:text-yellow-700 hover:border-yellow-100 transition-all"
                >Choose Engaging Backdrop</label
              >
            </div>
          </div>
          <div
            on:click={save}
            class="btn w-fit mt-4 dark:bg-yellow-200 dark:text-black"
          >
            💾 Save
          </div>
        </form>
      </div>

      <div class="divider" />
      <div class="max-w-screen-lg w-full">
        <Footer />
      </div>
    </div>
  {/if}
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
