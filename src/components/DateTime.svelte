<script>
  export let dateDay; // Declare the date prop
  export let dateMonth;
  let formattedDate = '';
</script>

<div class="date" id="liveDate">
  <span class="day">{dateDay}</span> <!-- Display day -->
  <span class="month">{dateMonth}</span> <!-- Display month -->
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
