<script>
  import Graph from '../../components/Graph.svelte';
  import { retrieveAnswers } from '$lib/utils/helperFunctions';

  let currentQuestionIndex = 0;
  let 	a = [
		{ x: null, y: null }
	];
  let questionnaire = [
    { type: 'instructions', text: 'Please indicate on a 5-point scale how much you agree with the following statements. ‘1’ means “Not at all” and ‘5’ means “Very much”.'},
    { type: 'scale', statement: 'I paid attention to what I was doing, in the present moment', answer: null },
    { type: 'scale', statement: 'I noticed physical sensations come and go', answer: null },
    { type: 'scale', statement: 'I was aware of what was going on in my body', answer: null },
    { type: 'scale', statement: 'I noticed pleasant and unpleasant thoughts and emotions', answer: null },
    { type: 'scale', statement: 'I was aware of what was going on in my mind', answer: null },
    { type: 'scale', statement: 'I could separate myself from my thoughts and feelings', answer: null },
    { type: 'scale', statement: 'I could actually see that I am not my thoughts', answer: null },
    { type: 'graph', statement: 'Please take a moment to reflect on your current mood. Where on the graph does your mood fit best?', answer: {x: null, y: null} },
    { type: 'scale', statement: 'On a scale of 1 to 5, where 1 means \'not accurate at all\' and 5 means \'extremely accurate,\' how accurately were you able to identify your current mood?', answer: null },
    { type: 'final', text: 'Thank you for completing the mood questionnaire. Please submit below.' },
  ];
  let path = "mood"; // directory of this route
  let answers;

  $: {
    questionnaire.forEach((question, index) => {
      if (question.type === 'graph') {
        console.log(`Question ${index}: ${question.answer.x}, ${question.answer.y}`);
      }
      else if (question.type == 'scale') {
        console.log(`Question ${index}: ${question.answer}`);
      }
    });
  }
  $: {
    answers = retrieveAnswers(questionnaire);
    console.log(answers);
 }

 </script>

<div class="pop-up-shape">
  <img class="blue-background" src="/images/mood-page.svg" alt="pop-up-shape" />

  <!-- main content -->
  <div class="pop-up-text">

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
          <button on:click={() => currentQuestionIndex++}>Next</button>

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
            <Graph points={a}/>
          </div>

          <!-- radio buttons for graph co-ordinates -->
          <p class="graph-text">Pleasantness</p>
          <div class="radio-buttons">
            <span class="number">-5</span>
            {#each Array(11).fill(undefined) as _, i (i)}
              <input type="radio" bind:group={a[0].x} value={i - 5}>
            {/each}
            <span class="number">5</span>
          </div>
          <p class="graph-text">Energy</p>
          <div class="radio-buttons">
            <span class="number">-5</span>
            {#each Array(11).fill(undefined) as _, i (i)}
              <input type="radio" bind:group={a[0].y} value={i - 5}>
            {/each}
            <span class="number">5</span>
          </div>

          <!-- next button after entering co-ordinates -->
          <button on:click={() => currentQuestionIndex++}>Next</button>

        <!-- end of questionnaire text -->
        {:else if question.type === 'final'}
          <p class="questionnaire-text">{question.text}</p>
          <!-- button to submit information from questionnaire -->
          <form action="{path}/?/update" method="post">
              <input type="hidden" name="answers[]" value={answers}>
            <input type="submit" value="Submit" />
          </form>
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
  </div>
  <a href="/dashboard"><img class="home-button" src="/images/home-button.svg" alt="home button"></a>
  <a class="back-button" href="/day"><img src="/images/back-button.svg" alt="back button" /></a>
</div>




<style>
  .pop-up-shape {
    position: relative;
  }
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .blue-background {

  }
  .home-button {
    position: absolute;
    top: 40px;
    right: 50px;
    width: 40px;
    height: 40px;
    z-index: 1000;
  }
  .pop-up-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .instructions-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    color: #FFF;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 28px;
    font-style: normal;
    font-weight: 300;
    margin: 50px;
  }
  .questionnaire-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    color: #FFF;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    margin: 50px;
  }
  /* Style the radio button when checked */
  input[type="radio"]{
    appearance: none;
    width: 20px;
    height: 20px;
    border: 0.1px #888888 solid;
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
  /* Display the radio buttons in a horizontal line */
  .radio-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .number {
    font-size: 20px;
    color: white;
    margin: 0 10px;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    display: none;
  }
  .chart {
		display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
		height: 100%;
    min-height: 500px;
		max-height: 500px;
    max-width: 500px;
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
