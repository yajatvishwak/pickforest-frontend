<script>
    import { push } from "svelte-spa-router";

    export let imageList = [];
    export let bucketID = "";
    export let userID = localStorage.getItem("userID");
    export let noOfVotes = 0;
    export let bucketName = "";
</script>

<div
    on:click={() => {
        push("/deets/" + userID + "/" + bucketID);
    }}
    class="hover:scale-95 transition-all "
>
    <div class="carousel rounded-box  ">
        {#each imageList as image}
            <div class="carousel-item h-56 relative ">
                <div
                    class="w-full absolute bg-yellow-700 opacity-25 h-full  opacity-"
                />
                <img src={image} alt="demoimage" />
            </div>
        {/each}
    </div>
    <div class="text-2xl font-bold mt-2 flex items-center justify-between">
        <div class=" flex items-center max-w-md">
            <div>{bucketName}</div>
        </div>
        <div class="text-sm flex items-center gap-1 ">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            <div>{noOfVotes}</div>
        </div>
    </div>
</div>
