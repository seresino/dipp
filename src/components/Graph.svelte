<script>
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';

	export let points;

	let svg;
	let width = 300;
	let height = 300;


	const padding = { top: 20, right: 20, bottom: 20, left: 20 };

	$: xScale = scaleLinear()
		.domain([-5, 5])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([-5, 5])
		.range([height - padding.bottom, padding.top]);

	$: xTicks = width > 180 ? [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] : [-5, 0, 5];

	$: yTicks = height > 180 ? [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] : [-5, 0, 5];

	onMount(resize);

	function resize() {
    ({ width, height } = document.getElementById('container').getBoundingClientRect());
	}
</script>

<svelte:window on:resize={resize} />

<div id="container" class="svg-container">

	<svg {width} {height}>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x1={padding.left} x2={xScale(5)} />
					<text x={padding.left - 10} y="+4">{tick}</text>
				</g>
			{/each}
		</g>


	<!-- x axis -->
	<g class="axis x-axis">
		{#each xTicks as tick}
			<g class="tick" transform="translate({xScale(tick)},0)">
				<line y1={yScale(-5)} y2={yScale(5)} />
				<text y={height - padding.bottom + 16}>{tick}</text>
			</g>
		{/each}
	</g>

   <!-- Axis labels -->
	<text class="x-axis-label" x={width / 2} y={height - padding.bottom + 30 } dy=".71em" text-anchor="middle">PLEASANTNESS</text>
	<text class="y-axis-label" transform="rotate(-90)" y={padding.left - 40} x={-height / 2} dy=".71em" text-anchor="middle">ENERGY</text>

	<!-- Zero lines -->
	<line x1={xScale(0)} x2={xScale(0)} y1={yScale(-5)} y2={yScale(5)} stroke="white" stroke-width="2"/>
	<line y1={yScale(0)} y2={yScale(0)} x1={xScale(-5)} x2={xScale(5)} stroke="white" stroke-width="2"/>

	<!-- data -->
	{#each points as point}
		<circle cx={xScale(point.x)} cy={yScale(point.y)} r="5" />
	{/each}
	</svg>
</div>

<style>
	.svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 80%;
    vertical-align: top;
    overflow: visible;
	}

	svg {
			display: inline-block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
	}

	circle {
		fill: orange;
		fill-opacity: 0.6;
		stroke: rgba(0, 0, 0, 0.5);
	}

	.tick line {
		stroke: #ddd;
		stroke-dasharray: 1;
	}

	text {
		font-size: 12px;
		fill: white;
	}

	.x-axis text {
		text-anchor: middle;
	}

  .x-axis-label text {
		text-anchor: start;
  }

	.y-axis text {
		text-anchor: end;
	}
</style>
