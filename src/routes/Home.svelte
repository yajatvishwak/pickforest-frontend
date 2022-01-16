<script>
    import DashboardCard from "../components/DashboardCard.svelte";

    import NavBar from "../components/NavBar.svelte";
    import greetingTime from "greeting-time";
    const emojis = ["🚀", "⚡", "✨"];
    const data = {
        noOfBuckets: 12,
        noOfVotes: 123,
        maxVotes: 55,
        bucketDetails: [
            {
                bucketID: "Thisisbro",
                bucketName: "Super Awesome Bucket of yajat vishwakarma",
                imageList: ["asset/1.png", "asset/2.png", "asset/3.png"],
                votesOnBucket: 23,
            },
        ],
    };
</script>

<section class=" h-screen flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
    <NavBar />

    <div class="text-4xl  mt-10">
        {greetingTime(new Date())}
        <span class="font-bold">Danny Boi</span>
        {emojis[parseInt(Math.random() * emojis.length)]}
    </div>
    <div class="mt-10 flex-col flex lg:flex-row justify-between">
        <div class="flex flex-wrap justify-center lg:justify-start ">
            <div class="p-5 lg:m-5 bg-yellow-2000 rounded-2xl">
                <div class="newfont text-8xl font-bold text-yellow-500">
                    {data.noOfBuckets}
                </div>
                <div class="newfont text-center lg:text-left"># of buckets</div>
            </div>
            <div class="p-5 lg:m-5 bg-yello-200 rounded-2xl">
                <div class="newfont text-8xl font-bold text-yellow-500">
                    {data.noOfVotes}
                </div>
                <div class="newfont text-center lg:text-left"># of likes</div>
            </div>
            <div class="p-5 lg:m-5 bg-yello-200 rounded-2xl">
                <div class="newfont text-8xl font-bold text-yellow-500">
                    {data.maxVotes}
                </div>
                <div class="newfont text-center lg:text-left">Most likes</div>
            </div>
        </div>
        <div class="p-5 bg-yellow-200 rounded-2xl  lg:w-1/3">
            <div class="text-2xl mb-3 font-bold">
                Hmmm... what's pickforest bro?
            </div>
            <div class="opacity-50 mb-5 newfont">
                Have you been in a situation where you are tryna post something
                on your social account but you are in distress as to which of
                the 178 pictures to post? (Trust me, been there)
            </div>
            <div class="btn">Broooooooooo show bro</div>
        </div>
    </div>

    <div class="mt-10 mb-4 text-2xl  max-w-screen-lgfont-bold ">
        Your Buckets
    </div>
    <div class="grid lg:grid-cols-3  gap-4 ">
        {#each data.bucketDetails as bucket}
            <DashboardCard
                bucketID={bucket.bucketID}
                imageList={bucket.imageList}
                noOfVotes={bucket.votesOnBucket}
                bucketName={bucket.bucketName}
            />
        {/each}
        <label
            for="my-modal-2"
            class="w-full modal-button hover:scale-95 transition-all rounded-box font-bold bg-gray-100 h-56 flex flex-col justify-center items-center"
        >
            <lord-icon
                src="https://cdn.lordicon.com/mecwbjnp.json"
                trigger="hover"
                colors="primary:#121331,secondary:#000000"
                style="width:100px;height:100px"
            />
            <div>Add Bucket</div>
        </label>
        <div
            class="w-full hover:scale-95 transition-all rounded-box font-bold bg-gray-100 h-56 flex flex-col justify-center items-center"
        >
            <lord-icon
                src="https://cdn.lordicon.com/dxjqoygy.json"
                trigger="hover"
                colors="primary:#121331,secondary:#000000"
                style="width:100px;height:100px"
            />
            <div>New here?</div>
        </div>
        {#if data.bucketDetails.length < 1}
            <div
                class="w-full hover:scale-95 transition-all rounded-box font-bold bg-gray-100 h-56 flex flex-col justify-center items-center"
            />
        {/if}
    </div>
</section>

<style>
    .newfont {
        font-family: "Harmattan", sans-serif;
    }
</style>
