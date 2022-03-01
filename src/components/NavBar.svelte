<script>
  import { push } from "svelte-spa-router";
  import { darkmode } from "../darkmode";
  import { setValue } from "../store";
  //import CustomDateSelector from "./CustomDateSelector.svelte";
  import TimeSelector from "./TimeSelector.svelte";
  let dragText = "Drop your awesome pictures here!";
  let timeslots = ["1hr", "2hr", "3hr", "5hr"];
  let selectedTime = "1hr";
  let files = [];
  let customTimeMode = false;
  let fileLoc = [];
  const getImage = async (file) => {
    let image = file;
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      fileLoc.push(e.target.result);
      fileLoc = [...fileLoc];
    };
  };

  function dropHandler(ev) {
    console.log("File(s) dropped");
    dragText = "Cool! Got that! Are there more?";

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          files.push(file);
          getImage(file);
          //console.log("... file[" + i + "].name = " + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        files.push(file);
        getImage(file);
        //console.log(fileLoc);
      }
    }
    console.log(fileLoc);
  }
</script>

<div
  class="navbar mb-2 dark:bg-slate-800  shadow-lg bg-neutral text-neutral-content rounded-box"
>
  <div
    class="flex-1 px-1 mx-1 flex cursor-pointer"
    on:click={() => {
      push("/");
    }}
  >
    <div class="mx-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
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
    <span class=" font-bold text-primary"> PickForest </span>
  </div>

  <div class="flex-none">
    <label
      for="my-modal-2"
      class="btn btn-primary modal-button mx-4 bg-primary hover:bg-primary-focus p-3 rounded-2xl"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 "
        viewBox="0 0 20 20"
        fill=""
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg></label
    >
    <input type="checkbox" id="my-modal-2" class="modal-toggle" />
    <div class="modal text-black bg-gray-900 bg-opacity-70 ">
      <div class="modal-box dark:bg-gray-800 dark:text-white">
        <div class="md:text-2xl lg:text-3xl text-xl font-bold">
          Create a Bucket
        </div>
        <div class="form-control">
          <label class="label">
            <span class="">Bucket Name</span>
          </label>
          <input
            type="text"
            placeholder="Super Aweesome Bucket"
            class="input input-bordered dark:bg-slate-700"
          />
          <label class="label flex justify-between mt-4">
            <div class="">Set Bucket Voting Time</div>
            <!-- <input
              type="checkbox"
              bind:checked={customTimeMode}
              class="toggle"
              id=""
            /> -->
          </label>
          <div class="">
            {#if customTimeMode}
              <!-- <div class="text-black  date">
                <CustomDateSelector />
              </div> -->
              <div />
            {:else}
              <TimeSelector bind:timeslots bind:selectedTime />
              <div class="alert dark:bg-slate-700 mt-4">
                <div class="">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#2196f3"
                      class="w-6 h-6 mx-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <label
                    ><i>Bucket Voting Time </i> is the time for which this bucket
                    will be open for voting to all the people who have this link.
                  </label>
                </div>
              </div>
            {/if}
          </div>
        </div>
        <div
          on:mouseenter={() => (dragText = "Click me to add your pictures")}
          on:mouseleave={() => (dragText = "Drop your awesome pictures here!")}
          class="bg-yellow-100 hidden h-1/4  lg:block dark:bg-slate-900 text-center w-full p-10  rounded-lg my-3"
        >
          <input
            type="file"
            name=""
            id="uploadbroski"
            hidden
            multiple
            on:change={(e) => {
              console.log(e.target.files);
              files = Array.from(e.target.files).map((file) => {
                getImage(file);
                return file;
              });
              files = [...files];
            }}
          />
          <label
            for="uploadbroski"
            class="flex h-full items-center justify-center"
            on:drop={dropHandler}
            on:dragleave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dragText = "Drop your awesome pictures here!";
            }}
            on:dragover={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dragText = "Drop em here pleaseeee";
            }}
          >
            <p class="">{dragText}</p>
          </label>
        </div>
        <div class="my-5 flex gap-4 py-4 overflow-auto">
          {#each fileLoc as file}
            <img
              src={file}
              class="h-52 object-cover shadow-lg rounded-2xl w-full max-w-52"
              alt=""
              srcset=""
            />
          {/each}
        </div>
        <div class="modal-action hidden  md:block">
          <label class="btn btn-secondary">Create Bucket</label>
          <label for="my-modal-2" class="btn">Close</label>
        </div>

        <div class="flex md:hidden">
          <label for="uploadbroski" class="hover:text-yellow-400">
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
                d="M4 16v1a3 3  0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </label>
          <div
            on:click={() => console.log(selectedTime)}
            class="ml-auto mr-5 hover:text-green-400"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <label for="my-modal-2" class=" hover:text-red-400">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>

    <div class="dropdown dropdown-end ">
      <div tabindex="0" class="avatar btn lg:pl-3 p-0 dark:bg-slate-800">
        <div class="mask mask-squircle w-10 h-10 ">
          <img alt="pp" src="https://i.pravatar.cc/500?img=32" />
        </div>
      </div>
      <ul
        tabindex="0"
        class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black mt-3 dark:bg-slate-700 dark:text-white "
      >
        <li>
          <a href="/#/" class="flex items-center gap-5">
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
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Dashboard</span></a
          >
        </li>
        <li>
          <a href="/#/profile" class="flex items-center gap-5">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Profile</span></a
          >
        </li>
        <li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="flex  gap-5">
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
        </li>
        <li
          on:click={() => {
            setValue("AUTH", false);
            window.location.href = "/#/signin";
          }}
        >
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="flex  gap-5">
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <div>Logout</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

<style>
  ::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #6d6d6d;
  }
</style>
