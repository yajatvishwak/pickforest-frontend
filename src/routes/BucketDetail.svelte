<script>
  import CountDown from "../components/CountDown.svelte";

  import ImageCard from "../components/ImageCard.svelte";
  import NavBar from "../components/NavBar.svelte";

  import { location } from "svelte-spa-router";

  const userID = $location.split("/")[1];
  const bucketID = $location.split("/")[2];
  //console.log(userID, bucketID);
  let data = {};
  fillData();
  //
  function fillData() {
    // servercall
    const freshdatafromserver = {
      bucketID: "bucketID",
      userID: "userID",
      bucketName: "Bucket #1",
      userName: "Danny Boi",
      targetDate: "Jan 12, 2022",
      winnerImage: 1, // imageID
      imageCardDetails: [
        {
          imageID: "imag1",
          imgURL: "https://picsum.photos/400",
          votes: {
            upvotes: 20,
            downvotes: 30,
          },
          reactions: {
            confetti: 34,
            wow: 12,
            heart: 12,
            dislike: 314,
          },
          voted: "notvoted",
        },
        {
          imageID: "imag2",
          imgURL: "https://picsum.photos/400",
          votes: {
            upvotes: 20,
            downvotes: 30,
          },
          reactions: {
            confetti: 34,
            wow: 12,
            heart: 12,
            dislike: 314,
          },
          voted: "notvoted",
        },
        {
          imageID: "imag3",
          imgURL: "https://picsum.photos/400",
          votes: {
            upvotes: 20,
            downvotes: 30,
          },
          reactions: {
            confetti: 34,
            wow: 12,
            heart: 12,
            dislike: 314,
          },
          voted: "notvoted",
        },
      ],
    };
    data = freshdatafromserver;
  }
  function upvote(imageID) {
    //console.log(imageID);
    let item = data.imageCardDetails.find((x) => x.imageID === imageID);

    if (item.voted === "notvoted") {
      item.votes.upvotes += 1;
      item.voted = "upvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      // update on server
    } else if (item.voted === "downvoted") {
      item.votes.upvotes += 1;
      item.votes.downvotes -= 1;
      item.voted = "upvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      // update on server
    } else {
      alert("Already voted, stop pressing random buttons you moron");
    }

    console.log(data.imageCardDetails);
  }
  function downvote(imageID) {
    //console.log(imageID);
    let item = data.imageCardDetails.find((x) => x.imageID === imageID);

    if (item.voted === "notvoted") {
      item.votes.downvotes += 1;
      item.voted = "downvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      // update on server
    } else if (item.voted === "upvoted") {
      item.votes.upvotes -= 1;
      item.votes.downvotes += 1;
      item.voted = "downvoted";
      data.imageCardDetails = [...data.imageCardDetails];
      // update on server
    } else {
      alert("Already voted, stop pressing random buttons you moron");
    }
  }
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
          <CountDown targetDate={new Date(data.targetDate)} />
        </div>
      </div>
    </div>
    <div class="grid mt-10 lg:grid-cols-3 gap-10">
      {#each data.imageCardDetails as ImageCardDetail}
        <ImageCard
          isWinner={data.winnerImage === ImageCardDetail.imageID}
          imgURL={ImageCardDetail.imgURL}
          reaction={ImageCardDetail.reactions}
          votes={ImageCardDetail.votes}
          imageID={ImageCardDetail.imageID}
          voted={ImageCardDetail.voted}
          {upvote}
          {downvote}
        />
      {/each}
    </div>
  </div>
</section>

<style>
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
</style>
