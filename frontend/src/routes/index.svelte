<script lang="ts">
	import { onMount } from 'svelte'
	import { account } from '@/contracts/Provider'
	import { waves, total, contract } from '@/contracts/WeWaves'

	let message = 'hello'

	async function connect() {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
	}

	async function wave() {
		if (!$contract) return
		await $contract.wave(message)
	}
</script>

{#if $account}
	<div class="messages">
		<div class="from-them message">
			<p>Hello I'm Mohamed I'm playing with Web3</p>
		</div>
		{#each $waves as wave}
			<div class="from-me message">
				<p>{wave.message}</p>
			</div>
		{/each}
	</div>

	<p class="font-bold mb-4 text-5xl">{$total}</p>
	<button on:click={wave}>Wave at Me</button>
{:else}
	<button on:click={connect}>Connect To Wallet</button>
{/if}

<style lang="postcss">
	button {
		@apply border border-transparent rounded-full font-medium bg-indigo-600 shadow-sm text-base text-white py-2 px-5 inline-flex items-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
	}

	.messages {
		width: 450px;
		max-height: 500px;
		overflow-y: scroll;
		margin: 50px auto;
		display: flex;
		flex-direction: column;
		padding: 0 24px;

		* {
			overflow-anchor: none;
		}

		&::after {
			content: '';
			height: 1px;
			display: block;
			overflow-anchor: auto;
		}
	}

	.message {
		@apply max-w-sm mb-6 leading-6 break-words;
		@apply rounded-3xl py-2 px-4 relative;

		&::before,
		&::after {
			@apply h-6 bottom-0 w-6 z-0 content-[''] absolute;
		}
		&::after {
			@apply bg-white z-1;
		}
	}

	.from-them {
		@apply bg-gray-200 text-black;
		&:before {
			@apply bg-gray-200 -left-3;
			border-bottom-right-radius: 16px 14px;
		}

		&:after {
			@apply -left-6;
			border-bottom-right-radius: 10px;
		}
	}

	.from-me {
		@apply bg-blue-400 text-white self-end;

		&:before {
			@apply bg-blue-400 -right-3;
			border-bottom-left-radius: 16px 14px;
		}

		&:after {
			@apply -right-6;
			border-bottom-left-radius: 10px;
		}
	}
</style>
