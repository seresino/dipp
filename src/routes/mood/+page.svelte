<script>
  import { onMount } from 'svelte';
  import Graph from '../../components/Graph.svelte';
  import { retrieveAnswers } from '$lib/utils/clientHelperFunctions';

  export let data;
  const user = data.user[0];
  const mood = data.mood;

  const path = "mood"; // directory of this route
  export let form;
  let completed = false;

  // checks if the user has completed the questionnaire
  if (mood) {
    completed = Boolean(mood.q9);
  }

  let currentQuestionIndex = 0;
  let answers;
  let questionnaireForm;
  let questionnaire = [
    { type: 'instructions', text: 'Please indicate on a 5-point scale how much you agree with the following statements. ‘1’ means “Not at all” and ‘5’ means “Very much”.'},
    { type: 'scale', statement: 'In the last 15 minutes I paid attention to what I was doing, in the present moment.', answer: null },
    { type: 'scale', statement: 'In the last 15 minutes I noticed physical sensations come and go.', answer: null },
    { type: 'scale', statement: 'In the last 15 minutes I was aware of what was going on in my body.', answer: null },
    { type: 'scale', statement: 'In the last 15 minutes I noticed pleasant and unpleasant thoughts and emotions.', answer: null },
    { type: 'scale', statement: 'In the last 15 minutes I was aware of what was going on in my mind.', answer: null },
    { type: 'scale', statement: 'In the last 15 minutes I could separate myself from my thoughts and feelings.', answer: null },
    { type: 'scale', statement: 'In the last 15 minutes I could actually see that I am not my thoughts.', answer: null },
    // { type: 'graph', statement: "Please take a moment to reflect on your current mood. Where on the graph does your mood fit best?Think about how you're feeling right now. Look at the grid and find the spot that best matches your mood. The grid has two parts: From left to right, it shows how good or bad you feel. From bottom to top, it shows how much energy you have. For instance, if you're happy and full of energy, you'd click near the top right. If you're feeling just okay - not good or bad, not energetic or tired - click the middle of the grid. ", answer: {x: 0, y: 0} },
    { type: 'graph', statement: "Where does your current mood fit on this graph? The horizontal axis shows how pleasant you feel (negative to positive), and the vertical axis shows your energy level (low to high). For example, feeling happy and energetic would be in the top right.", answer: {x: 0, y: 0} },
    // { type: 'scale', statement: 'On a scale of 1 to 5, where 1 means \'not accurate at all\' and 5 means \'extremely accurate,\' how accurately were you able to identify your current mood?', answer: null },
    { type: 'scale', statement: 'How accurately do you think you identified your current emotion? 1 (Not at all accurately) to 5 (Extremely accurately)', answer: null },
    { type: 'final', text: 'Thank you for completing the mood questionnaire. Please submit below.' },
  ];

  // Retrieve the answers from the questionnaire
  $: {
    answers = retrieveAnswers(questionnaire);
  }

  // Function to handle final radio change and consequent automatic form submission
  function handleRadioChange() {
    questionnaireForm.submit();
  }

  // function to redirect on mount
  onMount(() => {
    // redirects to day page if questionnaire completed
    if (completed) {
      setTimeout(() => {
        window.location.href = "/day";
    }, 2000); // Redirects after 2 seconds
    }
  });
</script>

{#if user}
<div class="pop-up medium">
  <a class="circular-button home" href="/dashboard"><img src="/images/home-circle-button.svg" alt="home button"></a>
  <a class="circular-button back" href="/day"><img src="/images/return-circle-button.svg" alt="back button" /></a>
  <div class="pop-up-content center">
    <div class=container>
      {#if completed}
        <div class="instructions-text">
          <p>Mood questionnaire completed for today.</p>
        </div>
      {:else}

        <!-- loop through each question in questionnaire -->
        {#each questionnaire as question, index (index)}

        <!-- only display current question -->
          {#if index === currentQuestionIndex}

            <!-- check question type and display accordingly -->
            {#if question.type === 'instructions'}

              <div class="instructions-text">
                <p>{question.text}</p>
              </div>
              <!-- next button after instructions -->
              <button class="form-button" on:click={() => currentQuestionIndex++}>Next</button>

            {:else if currentQuestionIndex === questionnaire.length - 2}

              <div class="questionnaire-text">
                <p>{question.statement}</p>
              </div>

              <!-- radio buttons for scale questions -->
              <div class="radio-buttons">
                <span class="number">1</span>
                {#each Array(5).fill(undefined) as _, i (i)}
                  <input type="radio" name="answer" bind:group={question.answer} value={i + 1} on:change={handleRadioChange}>
                {/each}
                <span class="number">5</span>
              </div>

              <form bind:this={questionnaireForm} action="{path}/?/update" method="post">
                <input type="hidden" name="answers[]" value={answers}>
                <!-- <input type="submit" value="Submit" /> -->
              </form>

            {:else if question.type === 'scale'}

            <div class="questionnaire-text">
              <p>{question.statement}</p>
            </div>

            <!-- radio buttons for scale questions -->
              <div class="radio-buttons">
                <span class="number">1</span>
                {#each Array(5).fill(undefined) as _, i (i)}
                  <input type="radio" name="answer" bind:group={question.answer} value={i + 1} on:change={() => currentQuestionIndex++}>
                {/each}
                <span class="number">5</span>
              </div>

            {:else if question.type === 'graph'}

            <div class="questionnaire-text">
              <p>{question.statement}</p>
            </div>

              <!-- graph -->
              <div class="chart">
                <Graph points={[question.answer]}/>
                <div class="axis-labels">
                  <span class="x-label">Pleasantness</span>
                  <span class="y-label">Energy</span>
                </div>
              </div>

              <div class="answer-input">
                <p class="graph-text">Pleasantness</p>
                <div class="slider-container">
                  <span class="number">Negative</span>
                  <input type="range" min="-5" max="5" step="1" bind:value={question.answer.x} class="slider" id="pleasantnessSlider">
                  <span class="number">Positive</span>
                </div>
                <p class="graph-text">Energy</p>
                <div class="slider-container">
                  <span class="number">Low</span>
                  <input type="range" min="-5" max="5" step="1" bind:value={question.answer.y} class="slider" id="energySlider">
                  <span class="number">High</span>
                </div>
              </div>

              <!-- next button after entering co-ordinates -->
              <button class="form-button" on:click={() => currentQuestionIndex++}>Next</button>

            {/if}
          {/if}
        {/each}
        <!-- <div class="button-container">
          {#if currentQuestionIndex === 0}
            <button on:click={() => currentQuestionIndex++}>Next</button>
          {:else if 0 < currentQuestionIndex && currentQuestionIndex < questionnaire.length - 1}
            <button on:click={goBack}>Back</button>
            <button on:click={() => currentQuestionIndex++}>Next</button>
          {:else if currentQuestionIndex === questionnaire.length - 1}
            <button on:click={goBack}>Back</button>
            <button on:click={handleSubmit}>Finish</button>
          {/if}
        </div> -->
      {/if}
    </div>
  </div>
</div>
{/if}

<style>
  .container {
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 100%;
     min-height: 40svh;
     gap: 2vh;
  }
  .instructions-text p {
    color: #FFF;
    text-align: center;
    font-size: 22px;
    font-weight: 300;
  }
  .questionnaire-text p {
    color: #FFF;
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 300;
  }
  /* Style the radio button when checked */
  input[type="radio"]{
    appearance: none;
    width: 20px;
    height: 20px;
    max-width: 5vw;
    max-height: 5vw;
    border: solid 1px white;
    border-radius: 50%;
    background-color: white;
    margin: 10px;
    cursor: pointer;
  }
  input[type="radio"]:checked{
    background-color: #5DB3E5;
  }
  input[type="radio"]:hover{
    background-color: #5DB3E5;
  }
  .radio-buttons {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .number {
    font-size: 12px;
    color: white;
    margin: 0 10px;
  }
  .chart {
    width: 100%;
    max-width: 400px;
    position: relative;
  }

  .axis-labels {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .x-label {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 14px;
  }

  .y-label {
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-50%) rotate(-90deg);
    color: white;
    font-size: 14px;
  }

  .graph-text {
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 100;
    margin: 20px 0 10px 0;
  }

  .answer-input {
    width:  100%;
    margin-bottom: 20px;
    flex-direction: column;
  }
  .slider-container {
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px;
  }

  .slider {
    -webkit-appearance: none; /* Override default appearance */
    width:  50%; /* Full-width */
    height:  10px; /* Specified height */
    background:white; /* Grey background */
    border-radius: 20px;
    outline: none;
    -webkit-transition: .2s; /*  0.2 seconds transition on hover */
    transition: opacity .2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default appearance */
    appearance: none;
    width:  20px; /* Set a specific slider handle width */
    height:  20px; /* Slider handle height */
    background:#5DB3E5; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius:  50%; /* Round slider handle */
    border: white solid;
  }

  .slider::-moz-range-thumb {
    width:  25px; /* Set a specific slider handle width */
    height:  25px; /* Slider handle height */
    background: #5DB3E5; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius:  50%; /* Round slider handle */
  }
</style>
