<script>
  export let selectedTime = "";
  export let timeid = {};
  export let timeslots = [];
</script>

<div class="flex flex-wrap gap-5 mt-2">
  {#each timeslots as time}
    <div
      on:click={() => (selectedTime = timeid[time])}
      class={`${
        selectedTime === timeid[time] ? "border-yellow-300 border" : ""
      } bg-gray-200 dark:bg-slate-700 text-center p-4 rounded-2xl`}
    >
      {time}
    </div>
  {/each}
</div>
