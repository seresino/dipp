<script>
</script>

<svelte:head>
    <title>About</title>
</svelte:head>

<div class="pop-up white">
	<a class="circular-button back" href="/dashboard"
		><img src="/images/cross-circle-button.svg" alt="back button" /></a
	>
	<div class="pop-up-content left">
		<h1 id="welcome-to-your-21-day-psychedelic-preparation-journey">Congratulations on Completing the Preparation Phase of the Trial!</h1>
		<p>You've completed the Digital Intervention for Psychedelic Preparedness (DIPP), it's time for your dosing to begin. </p>
		
		<p>If you have any questions, don't hesitate to email <a href="mailto:rosalind.mcalpine.18@ucl.ac.uk">rosalind.mcalpine.18@ucl.ac.uk</a>.</p>

	</div>
</div>

<style>
	.divider {
		width: 100%;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.1);
	}

	body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen, Ubuntu, Cantarell, sans-serif;
		line-height: 1.5;
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 20px;
		color: rgb(55, 55, 55);
		background-color: rgb(250, 250, 253);
	}

	h1 {
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 24px;
		color: rgb(35, 35, 35);
	}

	h2,
	h3 {
		font-size: 24px;
		font-weight: 600;
		margin-top: 32px;
		margin-bottom: 16px;
		color: rgb(35, 35, 35);
	}

	h3 {
		font-size: 20px;
	}

	p {
		margin-bottom: 16px;
		font-size: 16px;
		line-height: 1.6;
	}

	ol,
	ul {
		margin-bottom: 16px;
		padding-left: 24px;
	}

	li {
		margin-bottom: 8px;
	}

	/* Nested lists */
	ol ol,
	ul ul,
	ol ul,
	ul ol {
		margin-top: 8px;
		margin-bottom: 0;
	}

	/* Text decoration for what appears to be links in the screenshot */
	.underline {
		text-decoration: underline;
		text-decoration-color: rgb(209, 209, 209);
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	/* Bold text styling */
	strong {
		font-weight: 600;
		color: rgb(35, 35, 35);
	}

	/* Specific spacing for sections */
	.section {
		margin-bottom: 32px;
	}

	/* Link styling */
	a {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: rgb(209, 209, 209);
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	a:hover {
		text-decoration-color: rgb(35, 35, 35);
	}

	/* Container */
	.container {
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		padding: 40px;
	}

	/* Citations and references */
	.references {
		margin: 2rem 0;
		padding: 1.5rem;
		border-top: 1px solid #e5e5e5;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			"Helvetica Neue", Arial, sans-serif;
		display: block;
		position: relative;
	}

	.references h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: -3rem 0 1.5rem 0; /* Negative top margin to pull heading above content */
		color: #333;
		background: white; /* Match your background color */
		display: inline-block;
		padding: 0 0.5rem;
		position: absolute;
		top: 0;
		transform: translateY(-50%);
	}

	.references p {
		margin: 0 0 1rem 0;
		padding-left: 2rem;
		text-indent: -2rem;
		line-height: 1.6;
		font-size: 1.3rem;
		color: #2d2d2d;
	}

	.references p:last-child {
		margin-bottom: 0;
	}

	.references em {
		font-style: italic;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.references {
			padding: 1rem;
		}

		.references p {
			padding-left: 1.5rem;
			text-indent: -1.5rem;
			font-size: 1.1rem;
		}
	}
</style>
