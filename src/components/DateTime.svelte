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

<div class="date" id="liveDate">
  <span class="day">{formattedDate.split(' ')[0]}</span> <!-- Display day -->
  <span class="month">{formattedDate.split(' ')[1]}</span> <!-- Display month -->
</div>

<style>
  .day {
    font-size: 98px;
    line-height: 98px;
    margin-right: 1vw;
  }
  .month {
    font-size: 24px;
    text-transform: uppercase;
  }
  .date {
    flex-direction: row;
    align-items:baseline;
    padding: 0 10px 0 0;
  }
  @media (max-width: 768px) {
    .day {
      font-size: 24px;
      line-height:normal;
      margin-right: 2vw;
    }
    .date {
      align-items:center;
      padding: 0;
    }
  }
</style>
