<script>
    import DashboardCard from "../components/DashboardCard.svelte";

    import NavBar from "../components/NavBar.svelte";
    import greetingTime from "greeting-time";
    const emojis = ["🚀", "⚡", "✨"];
</script>

<section class=" h-screen flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
    <NavBar />
    <div class="text-4xl mt-10">
        {greetingTime(new Date())} <span class="font-bold">Danny Boi</span>
        {emojis[parseInt(Math.random() * emojis.length)]}
    </div>

    <div class="mt-10  flex-col flex lg:flex-row justify-between">
        <div class="flex flex-wrap justify-center lg:justify-start">
            <div class="p-5 lg:m-5 bg-yellow-2000 rounded-2xl">
                <div class="newfont text-8xl font-bold text-yellow-500">
                    500
                </div>
                <div class="newfont text-center lg:text-left"># of buckets</div>
            </div>
            <div class="p-5 lg:m-5 bg-yello-200 rounded-2xl">
                <div class="newfont text-8xl font-bold text-yellow-500">
                    500
                </div>
                <div class="newfont text-center lg:text-left"># of likes</div>
            </div>
            <div class="p-5 lg:m-5 bg-yello-200 rounded-2xl">
                <div class="newfont text-8xl font-bold text-yellow-500">
                    500
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

    <div class="mt-10 mb-4 text-2xl font-bold ">Your Buckets</div>
    <div class="grid lg:grid-cols-3 gap-4">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
    </div>
</section>

<style>
    .newfont {
        font-family: "Harmattan", sans-serif;
    }
</style>
