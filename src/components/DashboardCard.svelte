<script>
    import NavBar from "../components/NavBar.svelte";
    import greetingTime from "greeting-time";
    const emojis = ["🚀", "⚡", "✨"];
</script>

<div class="hover:scale-95 transition-all">
    <div class="carousel rounded-box ">
        <div class="carousel-item">
            <img src="https://picsum.photos/id/500/256/144" />
        </div>
        <div class="carousel-item">
            <img src="https://picsum.photos/id/501/256/144" />
        </div>
        <div class="carousel-item">
            <img src="https://picsum.photos/id/502/256/144" />
        </div>
        <div class="carousel-item">
            <img src="https://picsum.photos/id/503/256/144" />
        </div>
        <div class="carousel-item">
            <img src="https://picsum.photos/id/504/256/144" />
        </div>
        <div class="carousel-item">
            <img src="https://picsum.photos/id/505/256/144" />
        </div>
        <div class="carousel-item">
            <img src="https://picsum.photos/id/506/256/144" />
        </div>
    </div>
    <div class="text-2xl font-bold mt-2 flex items-center justify-between">
        <div class=" flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mx-2 text-secondary"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path
                    fill-rule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                />
            </svg>

            <div>Bucket 1</div>
        </div>
        <div class="text-sm flex items-center mr-2 ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mt-0.5"
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
            <div>100</div>
        </div>
    </div>
</div>
