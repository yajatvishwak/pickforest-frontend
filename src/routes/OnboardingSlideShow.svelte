<script>
    import { fade } from "svelte/transition";
    
    let slides = [
        {
            emoji: "🥳",
            title: "Welcome aboard!",
            message:
                "We are so glad to have you! Let's get you to speed with the app.",
        },
        {
            emoji: "🤨",
            title: "Whaaaat?",
            message:
                "Before we start, let us get on the same page as to what PickForest is...",
        },
        {
            emoji: "🤔",
            title: "Have you ever?",
            message:
                "Been in situation where you have 7 nice pictures for your next Instagram post and you are indecisive",
        },
        {
            emoji: "🤓",
            title: "With PickForest",
            message:
                "PickForest helps you make an album of these pictures which you can share with your close ones, who can then vote and react on the best pictures",
        },
        {
            emoji: "🪣",
            title: "Buckets",
            message:
                "Buckets are albums of pictures you can share. Anyone with the link to a bucket will be able to view and vote on the pictures",
        },
        {
            emoji: "⌛",
            title: "Time Bound",
            message:
                "Voting on bucket will have a time limit after which the results will be declared",
        },
        {
            emoji: "🎉",
            title: "That's about it!",
            message:
                "We are sure you can figure out your way through the app. Knock yourself out! Thank you for using PickForestd",
        },
    ];
    let currentSlide = 0;
    function next() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        }
    }
    function prev() {
        if (currentSlide > 0) {
            currentSlide = currentSlide - 1;
        }
    }
</script>

<div class="">
    <div
        on:click={next}
        class=" absolute right-2 top-1/3 p-1 md:p-3 hover:bg-slate-500 transition-all rounded-full bg-slate-900"
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
                d="M9 5l7 7-7 7"
            />
        </svg>
    </div>
    <div
        on:click={prev}
        class=" absolute left-2 top-1/3 hover:bg-slate-500 transition-all  p-1 md:p-3 rounded-full bg-slate-900"
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
                d="M15 19l-7-7 7-7"
            />
        </svg>
    </div>
    <div
        class="bg-slate-800 min-w-full   flex-none rounded-lg p-5 h-full flex flex-col justify-center items-center text-center"
    >
        {#key currentSlide}
            <div in:fade class="md:text-6xl text-5xl">
                {slides[currentSlide].emoji}
            </div>
            <div in:fade class="mt-5 md:text-3xl   font-bold">
                {slides[currentSlide].title}
            </div>
            <div in:fade class="max-w-xs text-sm">
                {slides[currentSlide].message}
            </div>
        {/key}
    </div>
    <div class="flex gap-2 justify-center mt-4">
        {#each slides as slide, index}
            {#if index === currentSlide}
                <div class="w-3 h-3 rounded-full bg-slate-400" />
            {:else}
                <div class="w-3 h-3 rounded-full bg-slate-900" />
            {/if}
        {/each}
    </div>
</div>
