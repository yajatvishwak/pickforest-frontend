<script>
  let name = "";
  let username = "";
  let email = "";
  let password = "";
  let confirmpassword = "";

  let authenticated = localStorage.getItem("authenticated");

  async function signup() {
    if (!validateInput()) return;
    try {

      // axios call to server

      localStorage.setItem("authenticated", true);
      window.location.href = "/";

      
    } catch (error) {
      switch (error) {
        
      }
    }
  }
  function validateInput() {
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  }
</script>

{#if !authenticated}
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
    >
      <div class="w-full h-100">
        <div class="flex-1 flex items-center">
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
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
          <span class=" font-bold text-4xl mx-2"> PickForest </span>
        </div>

        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
          Register
        </h1>

        <form class="mt-6" on:submit|preventDefault={signup}>
          <div>
            <label for="name" class="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autocomplete
              required
              bind:value={name}
            />
          </div>
          <div class="mt-4">
            <label for="username" class="block text-gray-700">Username</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Username"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autocomplete
              required
              bind:value={username}
            />
          </div>
          <div class="mt-4">
            <label for="email" class="block text-gray-700">Email Address</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email Address"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              required
              bind:value={email}
            />
          </div>

          <div class="mt-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter Password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
              required
              bind:value={password}
            />
          </div>
          <div class="mt-4">
            <label for="confirm" class="block text-gray-700"
              >Confirm Password</label
            >
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                      focus:bg-white focus:outline-none"
              required
              bind:value={confirmpassword}
            />
          </div>

          <button
            type="submit"
            class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6">Sign Up</button
          >
        </form>

        <hr class="my-6 border-gray-300 w-full" />

        <button
          type="button"
          class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        >
          <div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="w-6 h-6"
              viewBox="0 0 48 48"
              ><defs
                ><path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                /></defs
              ><clipPath id="b"
                ><use xlink:href="#a" overflow="visible" /></clipPath
              ><path
                clip-path="url(#b)"
                fill="#FBBC05"
                d="M0 37V11l17 13z"
              /><path
                clip-path="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7-6.1L48 14V0H0z"
              /><path
                clip-path="url(#b)"
                fill="#34A853"
                d="M0 37l30-23 7.9 1L48 0v48H0z"
              /><path
                clip-path="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"
              /></svg
            >
            <span class="ml-4"> Sign Up with Google</span>
          </div>
        </button>

        <p class="mt-8">
          Already have an account? <a
            href="/signup"
            class="text-blue-500 hover:text-blue-700 font-semibold">Login In</a
          >
        </p>
      </div>
    </div>
  </section>
{:else}
  <script>
    window.location.href = "/";
  </script>
{/if}
