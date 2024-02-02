<script>
  import { onMount } from 'svelte';
  import Graph from '../../components/Graph.svelte';
  import { retrieveAnswers } from '$lib/utils/helperFunctions';
  export let data;
  export let form;

  const path = "mood"; // directory of this route
  const usertasks = data.userTasks;
  const mood = data.mood;
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
    { type: 'graph', statement: 'Please take a moment to reflect on your current mood. Where on the graph does your mood fit best?', answer: {x: null, y: null} },
    { type: 'scale', statement: 'On a scale of 1 to 5, where 1 means \'not accurate at all\' and 5 means \'extremely accurate,\' how accurately were you able to identify your current mood?', answer: null },
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
    // redirects to day page if user tries to access /meditate without current daily task entry in table
    if (usertasks.length === 0) {
      window.location.href = "/day";
    }
    // redirects to day page if questionnaire completed
    if (completed) {
      setTimeout(() => {
        window.location.href = "/day";
    }, 2000); // Redirects after 2 seconds
    }
  });
 </script>

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

              <!-- graph -->
              <div class="chart">
                <Graph points={[question.answer]}/>
              </div>

              <!-- radio buttons for graph co-ordinates -->
              <p class="graph-text">Pleasantness</p>
              <div class="radio-buttons">
                <span class="number">-5</span>
                {#each Array(11).fill(undefined) as _, i (i)}
                  <input type="radio" bind:group={question.answer.x} value={i - 5}>
                {/each}
                <span class="number">5</span>
              </div>
              <p class="graph-text">Energy</p>
              <div class="radio-buttons">
                <span class="number">-5</span>
                {#each Array(11).fill(undefined) as _, i (i)}
                  <input type="radio" bind:group={question.answer.y} value={i - 5}>
                {/each}
                <span class="number">5</span>
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
    font-family: Helvetica Neue;
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
    border: solid #888888;
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
    font-size: 20px;
    color: white;
    margin: 0 10px;
  }
  .chart {
    width: 100%;
    max-width: 400px;
	}
  .graph-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #FFF;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 18px;
    font-style: normal;
    font-weight: 100;
    margin-bottom: 10px;
  }
</style>
