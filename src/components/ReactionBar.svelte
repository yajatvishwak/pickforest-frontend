<script>
  export let reactionElements = [
    {
      src: "https://cdn.lordicon.com/lupuorrc.json",
      selected: false,
      id: "confetti",
    },
    {
      src: "https://cdn.lordicon.com/dzllstvg.json",
      selected: false,
      id: "wow",
    },
    {
      src: "https://cdn.lordicon.com/rjzlnunf.json",
      selected: false,
      id: "like",
    },
    {
      src: "https://cdn.lordicon.com/hrqwmuhr.json",
      selected: false,
      id: "dislike",
    },
  ];
</script>

<div class="btn-group pt-5 flex">
  {#each reactionElements as reaction}
    <button
      on:click={() => {
        reactionElements = reactionElements.map((item) => {
          if (item.id === reaction.id)
            return { ...item, selected: !item.selected };
          return { ...item, selected: false };
        });
      }}
      class={`btn hover:bg-yellow-200 btn-outline flex-1   ${
        reaction.selected ? `btn-active` : ``
      }`}
      ><lord-icon
        src={reaction.src}
        trigger="hover"
        class={reaction.id === "like" ? "flip-horizontal" : ""}
        colors="primary:#121331,secondary:#121331"
        style="width:45px;height:45px;"
      /></button
    >
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
