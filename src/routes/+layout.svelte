<script>
	import { page } from "$app/stores";
	import { enhance } from "$app/forms";

	export let data; // data returned by the load function
	let user;

	// Reactive statement to update `user` based on `data.user`
	$: user = data?.user ? data.user[0] : null;
</script>

<div class="main-container">
	<nav class="navbar">
		<div class="header-logo">
			<a href="/dashboard" sveltekit:prefetch>
				<img
					class="dipp-svg"
					src="/images/header-logo.svg"
					alt="logo"
				/>
			</a>
			<p class="logo-text">
				Digital Intervention for Psychedelic Preparedness
			</p>
		</div>
		<div class="container">
			<div
				class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1"
			>
				<ul class="nav navbar-nav">
					<li>
						<a
							class="about-pill"
							href="/about"
							data-sveltekit-reload><p class="about">About</p></a
						>
					</li>
					{#if user}
						<li>
							<div class="logout-pill">
								<form
									class="logout"
									action="/logout"
									method="POST"
									use:enhance
									data-sveltekit-reload
								>
									<button type="submit">Log out</button>
								</form>
							</div>
						</li>
					{/if}
				</ul>
			</div>

			<!-- Responsive -->
			<button
				type="button"
				class="navbar-toggle collapsed"
				data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1"
			>
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
	</nav>

	<div class="slot-container">
		<slot />
	</div>
</div>

<!-- Displays page data at bottom of page - ONLY FOR DEBUGGING-->
<pre>
  {JSON.stringify($page, null, 2)}
</pre>

<style>
	/* boostrap adjustments for hamburger menu */
	.navbar {
		display: flex;
		padding: 20px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		position: relative;
		min-height: 150px;
		margin-bottom: 0px;
		border: 1px solid transparent;
	}
	.logo-text {
		width: 480px;
	}
	.icon-bar {
		background-color: black;
	}
	.container {
		display: flex;
		flex-direction: row;
		justify-content: right;
		padding: 0;
		margin: 0 0 0 auto;
	}
	.nav > li > a {
		position: relative;
		display: flex;
		margin: 3px;
	}
	.navbar-nav {
		margin: 0px;
	}
	.navbar-toggle {
		position: relative;
		float: left;
		margin: 0 8px;
		background-color: transparent;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
	}
	.navbar-collapse {
		padding: 0 10px;
		border-top: none;
	}
	.nav > li > a:focus,
	.nav > li > a:hover {
		text-decoration: none;
		background-color: inherit;
	}

	.main-container {
		display: block;
		min-height: 100svh;
		width: 100svw;
	}
	.slot-container {
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 178px);
		max-width: 100%;
		padding: 0 20px 20px 20px;
	}
	.header-logo {
		flex-direction: row;
		justify-content: left;
		align-items: center;
		gap: 20px;
		margin-right: auto;
	}
	.dipp-svg {
		padding: 10px;
	}
	.logo-text {
		color: black;
		font-size: 20px;
		font-weight: 500;
	}
	@media (max-width: 1000px) {
		.logo-text {
			display: none;
		}
	}
	.about-pill {
		width: 101.8px;
		height: 43px;
		border-radius: 38px;
		border-style: solid;
		border-color: black;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.logout-pill {
		width: 101.8px;
		height: 43px;
		border-radius: 38px;
		border-style: solid;
		border-color: black;
		background-color: black;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.about {
		color: black;
		font-size: 16px;
		font-weight: 500;
	}
	.logout {
		color: white;
		font-size: 16px;
		font-weight: 500;
	}
</style>
