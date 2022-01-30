<script>
  import JSConfetti from "js-confetti";
  const jsConfetti = new JSConfetti();
  export let reactionElements = [
    {
      src: "https://cdn.lordicon.com/lupuorrc.json",
      selected: false,
      id: "confetti",
      emoji: ["🎉"],
    },
    {
      src: "https://cdn.lordicon.com/dzllstvg.json",
      selected: false,
      id: "wow",
      emoji: ["😍"],
    },
    {
      src: "https://cdn.lordicon.com/rjzlnunf.json",
      selected: false,
      id: "heart",
      emoji: ["❤️"],
    },
    {
      src: "https://cdn.lordicon.com/hrqwmuhr.json",
      selected: false,
      id: "dislike",
      emoji: ["👎"],
    },
  ];
  export let updateSelectedReaction = () => {};
  export let clearSelectedReaction = () => {};
  export let imageID;
</script>

<div class="btn-group lg:pt-2.5 pt-5 flex  ">
  {#each reactionElements as reaction}
    <button
      on:click={() => {
        reactionElements = reactionElements.map((item) => {
          if (item.id === reaction.id) {
            if (!item.selected === false) {
              clearSelectedReaction(imageID);
            } else {
              jsConfetti.addConfetti({
                emojis: reaction.emoji,
              });
              updateSelectedReaction(imageID, reaction.id);
            }
            return { ...item, selected: !item.selected };
          }

          return { ...item, selected: false };
        });
      }}
      class={`btn hover:bg-yellow-200 dark:hover:bg-slate-700 btn-outline dark:border-white flex-1   ${
        reaction.selected ? `btn-active dark:bg-slate-700` : ``
      }`}
    >
      <div class="dark:block hidden">
        <lord-icon
          src={reaction.src}
          trigger="hover"
          colors="primary:#FCD34D,secondary:#ffffff"
          style="width:45px;height:45px;"
        />
      </div>
      <div class="dark:hidden">
        <lord-icon
          src={reaction.src}
          trigger="hover"
          colors="primary:#121331,secondary:#121331"
          style="width:45px;height:45px;"
        />
      </div>
    </button>
  {/each}
</div>

<style>
  .newfont {
    font-family: "Harmattan", sans-serif;
  }

  .flip-horizontal {
    --transform-scale-x: -1;
  }
</style>
