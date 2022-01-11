<script>
  import CountDown from "../components/CountDown.svelte";

  import ImageCard from "../components/ImageCard.svelte";
  import NavBar from "../components/NavBar.svelte";
  import { location } from "svelte-spa-router";
  const userID = $location.split("/")[1];
  const bucketID = $location.split("/")[2];
  //console.log(userID, bucketID);
  let data = {
    bucketID: bucketID,
    userID: userID,
    bucketName: "Bucket #1",
    userName: "Danny Boi",
    imageCardDetails: [
      {
        imgURL: "https://picsum.photos/400",
      },
      {
        imgURL: "https://picsum.photos/400",
      },
      {
        imgURL: "https://picsum.photos/400",
      },
    ],
  };
</script>

<section class=" h-screen flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
  <NavBar />
  <div class="mx-auto">
    <div class="flex justify-between lg:items-center lg:flex-row flex-col ">
      <div>
        <div class="text-4xl mt-10 font-bold">{data.bucketName}</div>
        <div class="flex items-center gap-5 mt-3 ">
          <div class="avatar">
            <div class=" w-10 h-10 mask mask-squircle">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
              />
            </div>
          </div>
          <div class="opacity-70 newfont text-xl">by {data.userName}</div>
        </div>
      </div>
      <div class="mt-5 flex gap-7">
        <div class="flex gap-3 ">
          <CountDown targetDate={new Date()} />
        </div>
      </div>
    </div>
    <div class="grid mt-10 lg:grid-cols-3 gap-10 ">
      {#each data.imageCardDetails as ImageCardDetail}
        <ImageCard imgURL={ImageCardDetail.imgURL} />
      {/each}
    </div>
  </div>
</section>

<style>
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
</style>
