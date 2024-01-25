<script>
  let currentQuestionIndex = 0;
  import Graph from '../../components/Graph.svelte';
  let 	a = [
		{ x: null, y: null }
	]

  let questionnaire = [
    { type: 'instructions', text: 'For the following items, please indicate on a 5-point scale how much you agree with the statements below. ‘1’ means “Not at all” and ‘5’ means “Very much”. Please feel free to use any number in the range from 1 to 5.' },
    { type: 'scale', statement: '... I paid attention to what I was doing, in the present moment.', answer: null },
    { type: 'scale', statement: '... I noticed physical sensations come and go.', answer: null },
    { type: 'scale', statement: '... I was aware of what was going on in my body.', answer: null },
    { type: 'scale', statement: '... I noticed pleasant and unpleasant thoughts and emotions.', answer: null },
    { type: 'scale', statement: '... I was aware of what was going on in my mind.', answer: null },
    { type: 'scale', statement: '... I could separate myself from my thoughts and feelings.', answer: null },
    { type: 'scale', statement: '... I could actually see that I am not my thoughts.', answer: null },
    { type: 'instructions', text: 'Click on the appropriate box in the grid to indicate how pleasant/unpleasant (horizontal axis) and how energetic/calm (vertical axis) you feel. For example, a happy and energized mood would go towards the top right corner. A completely neutral mood would be right in the middle where the axes cross.' },
    { type: 'graph', statement: 'Please take a moment to reflect on your current mood. Where on the graph does your mood fit best?', answer: {x: null, y: null} },
    { type: 'scale', statement: 'On a scale of 1 to 5, where 1 means \'not accurate at all\' and 5 means \'extremely accurate,\' how accurately were you able to identify your current mood?', answer: null },
    { type: 'final', text: 'Thank you for completing the mood questionnaire.' },

  ];
  $: {
    questionnaire.forEach((question, index) => {
        if (question.type === 'graph') {
          console.log(`Question ${index}: ${question.answer.x}, ${question.answer.y}`);
        }
        else if (question.type !== 'instructions') {
          console.log(`Question ${index}: ${question.answer}`);
        }
    });
  }

 </script>

<div class="pop-up-shape">
  <img class="blue-background" src="/images/mood-page.svg" alt="pop-up-shape" />
  <div class="pop-up-text">
     {#each questionnaire as question, index (index)}
       {#if index === currentQuestionIndex}
         {#if question.type === 'instructions'}
           <div class="instructions-text">
             <p>{question.text}</p>
             <button on:click={() => currentQuestionIndex++}>Next</button>
           </div>
         {:else if question.type === 'scale'}
            <div class="questionnaire-text">
              <p>{question.statement}</p>
            </div>
            <div class="radio-buttons">
              <span class="number">1</span>
              {#each Array(5).fill(undefined) as _, i (i)}
                <input type="radio" bind:group={question.answer} value={i + 1} on:change={() => currentQuestionIndex++}>
              {/each}
              <span class="number">5</span>
            </div>
         {:else if question.type === 'graph'}
            <div class="chart">
              <Graph points={[question.answer]}/>
            </div>
            <div class="radio-buttons">
              {#each Array(11).fill(undefined) as _, i (i)}
              <label>
                <input type="radio" bind:group={question.answer.x} value={i - 5}>
              </label>
              {/each}
            </div>
            <div class="radio-buttons">
              {#each Array(11).fill(undefined) as _, i (i)}
                <input type="radio" bind:group={question.answer.y} value={i - 5}>
              {/each}
            </div>
            <button on:click={() => currentQuestionIndex++}>Next</button>
         {:else if question.type === 'final'}
          <p>{question.text}</p>
          <a href="/day">Submit</a>
         {/if}
       {/if}
     {/each}
     <div class="button-container">
      <!-- {#if currentQuestionIndex === 0}
        <button on:click={() => currentQuestionIndex++}>Next</button>
      {:else if 0 < currentQuestionIndex && currentQuestionIndex < questionnaire.length - 1}
        <button on:click={goBack}>Back</button>
        <button on:click={() => currentQuestionIndex++}>Next</button>
      {:else if currentQuestionIndex === questionnaire.length - 1}
        <button on:click={goBack}>Back</button>
        <button on:click={handleSubmit}>Finish</button>
      {/if} -->
     </div>
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
		width: 100%;
		max-width: 640px;
		height: calc(100% - 4em);
		min-height: 280px;
		max-height: 480px;
		margin: 0 auto;
	}
</style>
