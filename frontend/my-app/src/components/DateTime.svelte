<script>
  import { onMount } from 'svelte';

  let currentDate = new Date();
  let formattedDate = '';

  function updateDate() {
    currentDate = new Date();
    formattedDate = currentDate.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short', // Display month in "Jan/Feb/Mar" format
      year: 'numeric',
    });
  }

  // Call the updateDate function immediately
  updateDate();

  onMount(() => {
    // Update the date once per day (86400000 milliseconds = 24 hours)
    const intervalId = setInterval(updateDate, 86400000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  });
</script>

<div id="liveDate">
  <span class="day">{formattedDate.split(' ')[0]}</span> <!-- Display day -->
  <span class="month">{formattedDate.split(' ')[1]}</span> <!-- Display month -->
</div>

<style>
  .day {
    display: inline;
    font-size: 128px;
    color: white;
    font-family: Helvetica Neue;
    font-weight: 400;
    margin-right: 20px;
  }

  .month {
    display: inline;
    font-size: 24px;
    color: white;
    font-family: Helvetica Neue;
    font-weight: 400;
    text-transform: uppercase; /* Convert month to uppercase */
  }
</style>
