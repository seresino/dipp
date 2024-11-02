<!-- Import the necessary components -->
<script>
</script>

<svelte:head>
    <title>DIPP Trial</title>
</svelte:head>

<div class="landing-content">
    <div class="landing-logo">
      <img src="/images/landing-logo.svg" alt="logo" />
    </div>
    <a href="/login">
        <div class="pill">
          <p>Enter</p>
        </div>
    </a>
</div>

<style>
  .landing-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
  }
  .landing-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .landing-logo img {
    object-fit: contain;
    max-width: 100%;
    width: 451px;
  }
</style>
