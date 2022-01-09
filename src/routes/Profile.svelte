<script>
  import DashboardCard from "../components/DashboardCard.svelte";
  import NavBar from "../components/NavBar.svelte";
</script>

<section class=" h-screen flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
  <NavBar />
  <div class="relative flex-col flex justify-center items-center mt-10 lg:m-10">
    <div
      class="p-3 absolute z-10 top-2 right-3 rounded-2xl hover:bg-black hover:bg-opacity-50 "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </div>
    <div class="w-full  rounded-2xl lg:h-72 h-36  bg-primary">
      <img
        src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1"
        alt=""
        class="h-full w-full object-cover rounded-2xl contrast-50 brightness-75"
      />
    </div>
    <div class="avatar absolute m-auto lg:-bottom-24 -bottom-20 ">
      <div class="mb-8 lg:w-32 lg:h-32 h-24 w-24 mask mask-squircle shadow-md">
        <img
          src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
        />
      </div>
    </div>
  </div>
  <div
    class="m-16 lg:mb-10 lg:mt-10  text-center flex justify-center flex-col items-center"
  >
    <div class="font-black text-4xl">Yajat Vishwakarma</div>
    <div class="italic">this is bro</div>
    <div class="flex">
      <img
        class="m-3 w-10 h-10 hover:scale-110 transition-all"
        src="https://img.icons8.com/glyph-neue/64/000000/instagram-new.png"
      />
      <img
        class="m-3 w-10 h-10 hover:scale-110 transition-all"
        src="https://img.icons8.com/ios-glyphs/64/000000/twitter.png"
      />
    </div>
  </div>
  <div class="grid lg:grid-cols-2 gap-4">
    <div class="p-3 flex flex-col rounded-2xl border">
      <div class="font-bold text-2xl mb-3 mt-2">Change Password</div>
      <form>
        <input
          type="text"
          class="bg-gray-100 w-full p-3 my-2 rounded-2xl"
          placeholder="Password"
        />
        <input
          type="text"
          class="bg-gray-100 w-full p-3 my-2 rounded-2xl"
          placeholder="New Password"
        />
        <input
          type="text"
          class="bg-gray-100 w-full p-3  my-2 rounded-2xl"
          placeholder="New Password Again"
        />
        <div class="btn mt-4">Change Username</div>
      </form>
    </div>
    <div class="p-3 rounded-2xl border h-fit">
      <div class="font-bold text-2xl mb-3 mt-2">Change Username</div>
      <form>
        <div class="flex flex-wrap items-center my-5">
          <div class="lg:text-xl monofont">https://pickforest.com/</div>
          <input
            type="text"
            class=" lg:w-1/2 border monofont text-xl rounded-md px-2 py-1 lg:ml-2"
          />
          <div
            class="lg:ml-2 mt-2 lg:mt-0 p-2 bg-green-300 rounded-md text-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div class="btn">Change Username</div>
      </form>
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap");
  .monofont {
    font-family: "Roboto Mono", monospace;
  }
  .h-fit {
    height: fit-content;
  }
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
</style>
