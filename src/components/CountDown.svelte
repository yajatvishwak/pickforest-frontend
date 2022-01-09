<script>
  let days = 0;
  let hours = 0;
  let min = 0;
  let sec = 0;
  let expired = false;
  export let targetDate;

  let x = setInterval(() => {
    var now = new Date().getTime();
    var distance = targetDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      expired = true;
    }
  }, 1000);
</script>

{#if expired}
  <div class="font-mono">Bucket Voting Expired</div>
{:else}
  <div
    class="grid grid-flow-col grid-rows-2 md:grid-rows-none gap-5 place-items-end auto-cols-max"
  >
    <div>
      <span class="font-mono text-4xl countdown">
        <span style="--value:15" />
      </span>
      days
    </div>
    <div>
      <span class="font-mono text-4xl countdown">
        <span style="--value:10" />
      </span>
      hours
    </div>
    <div>
      <span class="font-mono text-4xl countdown">
        <span style="--value:24" />
      </span>
      min
    </div>
    <div>
      <span class="font-mono text-4xl countdown">
        <span style="--value:60;" />
      </span>
      sec
    </div>
  </div>
{/if}

<style>
  .newfont {
    font-family: "Harmattan", sans-serif;
  }
</style>
