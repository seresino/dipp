<script>
  export let checked = true;
  export const color = "#2196F3";
</script>

<label class="switch">
  <input type="checkbox" bind:checked />
  <span class="slider" />
</label>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 210px;
    height: 50px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F3F3F3;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    box-shadow: 0 0 1px #000000;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 35px;
    width: 100px;
    left: 4px;
    bottom: 4px;
    background-color:#000000;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 20px;
    background-image: url('images/instructions-toggle.svg');
    background-size: fit; /* Adjust as needed */
    background-repeat: no-repeat; /* Adjust as needed */
  }

  input:checked + .slider {
    background-color: #F3F3F3;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #000000;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(50px);
    -ms-transform: translateX(50px);
    transform: translateX(50px);
    background-image: url('images/tasks-toggle.svg');
    background-size: fit; /* Adjust as needed */
    background-repeat: no-repeat; /* Adjust as needed */
  }
</style>


