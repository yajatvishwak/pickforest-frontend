<script>
    import TreeCard from "../components/TreeCard.svelte";
    import Footer from "../components/Footer.svelte";

    let data = {
        name: "Danny Boiiii",
        subname: "Ultra cool twitch streamer",
        coverURL:
            "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1",
        pfp: "http://daisyui.com/tailwind-css-component-profile-1@94w.png",
        trees: [
            {
                treeID: "treeid1",
                url: "https://something.com",
                title: "Github",
                emoji: "⭐",
            },
            {
                treeID: "treeid2",
                url: "https://something.com",
                title: "Google",
                emoji: "🍆",
            },
        ],
    };
</script>

<section class=" h-full  flex  flex-col  p-5 pt-2.5 lg:p-10 lg:pt-5 ">
    <div class=" px-1  mx-auto flex items-center">
        <div class="mx-2">
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
                    ><path d="M0,172v-172h172v172z" fill="none" /><g
                        fill="#f1c40f"
                        ><path
                            d="M99.4375,16.125c-15.58503,0 -28.19291,11.34326 -31.14246,26.10339c-1.69404,0.54221 -3.32751,1.2195 -4.89209,2.01038l-9.65295,-22.73877l-5.375,-2.6875c0,0 -8.0625,16.125 -18.8125,32.25l10.75,2.6875l-18.8125,24.1875l13.4375,2.6875l-18.8125,24.1875l13.4375,2.6875l-21.5,24.1875c0,0 18.8125,2.6875 37.625,2.6875v21.5h13.4375v-21.5h29.62549c1.14251,0.07963 2.27592,0.08242 3.4696,0.06299l-0.84509,21.43701h16.125l-2.698,-68.33704l26.48657,-21.66797l-2.6875,-5.375l-24.25574,15.43738l-0.87659,-22.18237h-8.0625l-1.50647,38.16565l-19.21668,-10.4823l-2.80823,5.09155l21.55774,17.24304l-0.78735,19.9043c-1.66973,-0.00437 -3.7276,-0.05144 -3.42236,-0.02099c-12.25046,-1.22505 -18.44964,-5.62541 -22.27161,-11.33789c-3.82197,-5.71238 -5.13879,-13.36492 -5.13879,-20.93836c0,-0.63168 0.04361,-1.32773 0.11023,-2.10486l0.17847,-2.06811l-1.25977,-1.6482c-2.76516,-3.62924 -4.40393,-8.08694 -4.40393,-12.99133c0,-10.4874 7.43719,-19.1234 17.28504,-21.08008l3.98401,-0.7926l0.32544,-4.05224c0.88567,-11.08918 10.05653,-19.76257 21.40552,-19.76257c9.04174,0 16.69457,5.54158 19.89905,13.37451l1.10229,2.698l2.86597,0.5459c12.41808,2.36364 21.82019,13.21177 21.82019,26.38159c0,2.23182 -1.5558,6.51577 -3.37512,9.85242c-1.81933,3.33664 -3.61133,5.73718 -3.61133,5.73718l-1.34375,1.78992l0.32544,2.21509c1.09484,7.44655 -0.3334,14.00088 -3.7478,18.5343c-3.4144,4.53342 -8.83144,7.55859 -17.80994,7.55859v10.75c11.61045,0 20.89193,-4.53208 26.39734,-11.8418c5.0242,-6.6708 6.5362,-15.28535 5.74243,-24.08777c0.67673,-0.94248 1.75341,-2.33509 3.48535,-5.51147c2.21193,-4.05667 4.68738,-9.17653 4.68738,-14.99646c0,-17.31045 -11.93058,-31.5976 -27.9248,-35.94006c-5.33257,-10.48343 -15.99697,-17.80994 -28.5127,-17.80994z"
                        /></g
                    ></g
                ></svg
            >
        </div>
        <span class=" font-bold text-2xl "> PickForest </span>
    </div>
    <div
        class="relative flex-col flex justify-center items-center mt-10 lg:m-10"
    >
        <div
            class="w-full max-w-screen-lg  rounded-2xl lg:h-72 h-36  bg-primary"
        >
            <img
                src={data.coverURL}
                alt=""
                class="h-full w-full object-cover rounded-2xl contrast-50 brightness-75"
            />
        </div>
        <div class="avatar absolute m-auto lg:-bottom-24 -bottom-20  ">
            <div
                class="mb-8 lg:w-32 lg:h-32 h-24 w-24 mask mask-squircle shadow-xl"
            >
                <img src={data.pfp} alt="profilepic" />
            </div>
        </div>
    </div>

    <div
        class="m-16 mb-10 lg:mb-10 lg:mt-10  text-center flex justify-center flex-col items-center"
    >
        <div class="font-black text-4xl">{data.name}</div>
        <div class="italic">{data.subname}</div>
    </div>
    <div class="flex flex-col justify-center items-center gap-4">
        <div class="p-5  lg:max-w-screen-lg w-full flex flex-col rounded-2xl ">
            <div class="font-bold text-2xl mb-3 ">{data.name}'s Tree</div>
            <div class="flex flex-col gap-4">
                {#each data.trees as tree}
                    <TreeCard
                        profileView={true}
                        emoji={tree.emoji}
                        url={tree.url}
                        title={tree.title}
                        treeID={tree.treeID}
                    />
                {/each}
            </div>
        </div>
        <div class="divider" />
        <div
            class="flex rounded-3xl p-5 mb-10  py-7 lg:max-w-screen-lg w-full shadow-xl bg-yellow-200"
        >
            <div class="p-5 bg-yellow-200 rounded-2xl mx-auto  max-w-prose">
                <div class="text-2xl mb-3 font-bold text-black">
                    Hmmm... what's pickforest bro?
                </div>
                <div class="opacity-50 mb-5 newfont text-black">
                    Have you been in a situation where you are tryna post
                    something on your social account but you are in distress as
                    to which of the 178 pictures to post? (Trust me, been there)
                </div>
                <div class="btn">Broooooooooo show bro</div>
            </div>
        </div>
        <div class="w-full max-w-screen-lg">
            <Footer />
        </div>
    </div>
</section>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
    .monofont {
        font-family: "Roboto Mono", monospace;
    }
    .h-fit {
        height: fit-content;
    }
    .newfont {
        font-family: "Harmattan", sans-serif;
    }
    .linkfont {
        font-family: "Inter", sans-serif;
    }
</style>
